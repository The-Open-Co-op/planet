import {useState, useEffect, useCallback} from 'react';
import {isNextGraphEnabled} from '@/utils/featureFlags';
import {dataService} from '@/services/dataService';
import type {Contact, SortParams} from '@/types/contact';
import {nextgraphDataService} from "@/services/nextgraphDataService";
import {useNextGraphAuth} from "@/lib/nextgraph";
import {NextGraphAuth} from "@/types/nextgraph";
import {resolveFrom} from '@/utils/contactUtils';
import type {SocialContact} from '@/.ldo/contact.typings';
import {useSaveContacts} from "@/hooks/contacts/useSaveContacts.ts";

export interface ContactsFilters extends SortParams {
  searchQuery?: string;
  relationshipFilter?: string;
  planetStatusFilter?: string;
  accountFilter?: string;
  groupFilter?: string;
  currentUserGroupIds?: string[];
  cardAssignmentFilter?: string;
  excludeMe?: boolean;
}

export type iconFilter = 'relationshipFilter' | 'planetStatusFilter' | 'accountFilter' | 'vouchFilter' | 'praiseFilter' | 'cardAssignmentFilter';

export interface ContactsReturn {
  contacts: Contact[];
  contactNuris: string[]; // NURI list or IDs for mock data
  isLoading: boolean;
  totalCount: number;
  error: Error | null;
  updateContact: (nuri: string, updates: Partial<Contact>) => Promise<void>;
  addFilter: (key: keyof ContactsFilters, value: ContactsFilters[keyof ContactsFilters]) => void;
  setIconFilter: (key: iconFilter, value: string) => void;
  clearFilters: () => void;
  filters: ContactsFilters;
  reloadContacts: () => void;
}


export const useContacts = (): ContactsReturn => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactNuris, setContactNuris] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<ContactsFilters>({
    searchQuery: '',
    relationshipFilter: 'all',
    planetStatusFilter: 'all',
    accountFilter: 'all',
    groupFilter: 'all',
    cardAssignmentFilter: 'all',
    sortBy: 'name',
    sortDirection: 'asc',
    currentUserGroupIds: []
  });

  const {updateContact: editContact} = useSaveContacts();
  const isNextGraph = isNextGraphEnabled();
  const nextGraphAuth = useNextGraphAuth() || {} as NextGraphAuth;
  const {session} = nextGraphAuth;

  const setIconFilter = useCallback((key: iconFilter, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      relationshipFilter: key === 'relationshipFilter' ? value : 'all',
      planetStatusFilter: key === 'planetStatusFilter' ? value : 'all',
      accountFilter: key === 'accountFilter' ? value : 'all',
      cardAssignmentFilter: key === 'cardAssignmentFilter' ? value : 'all',
      groupFilter: 'all',
      // Handle vouch and praise filters with sorting
      ...(key === 'vouchFilter' && value === 'has_vouches' && {
        sortBy: 'vouchTotal',
        sortDirection: 'desc' as const
      }),
      ...(key === 'praiseFilter' && value === 'has_praises' && {
        sortBy: 'praiseTotal',
        sortDirection: 'desc' as const
      }),
    }));
  }, []);



  const loadMockContacts = useCallback(async (): Promise<string[]> => {
    const allContacts = await dataService.getContacts();
    setContacts(allContacts);
    
    // Apply filters and sorting inline since we can't use memoized values during loading
    const {
      searchQuery = '',
      relationshipFilter = 'all',
      planetStatusFilter = 'all',
      accountFilter = 'all',
      groupFilter = 'all',
      cardAssignmentFilter = 'all',
      sortBy = 'name',
      sortDirection = 'asc',
      currentUserGroupIds = [],
      excludeMe = false
    } = filters;

    const filtered = allContacts.filter(contact => {
      // Filter out ME contact if excludeMe is true
      if (excludeMe && contact.isMe) {
        return false;
      }
      
      // Quick exit for common cases
      if (searchQuery === '' && relationshipFilter === 'all' && planetStatusFilter === 'all' && 
          accountFilter === 'all' && groupFilter === 'all' && cardAssignmentFilter === 'all' &&
          sortBy !== 'vouchTotal' && sortBy !== 'praiseTotal' && !excludeMe) {
        return true;
      }

      // Apply filters (same logic as memoized version)
      if (searchQuery) {
        const name = resolveFrom(contact as SocialContact, 'name');
        const email = resolveFrom(contact as SocialContact, 'email');
        const organization = resolveFrom(contact as SocialContact, 'organization');
        const address = resolveFrom(contact as SocialContact, 'address');
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
          name?.value?.toLowerCase().includes(searchLower) ||
          email?.value?.toLowerCase().includes(searchLower) ||
          organization?.value?.toLowerCase().includes(searchLower) ||
          organization?.position?.toLowerCase().includes(searchLower) ||
          address?.region?.toLowerCase().includes(searchLower) ||
          address?.country?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (relationshipFilter !== 'all') {
        const matchesRelationship = 
          (relationshipFilter === 'undefined' && !contact.relationshipCategory) ||
          (relationshipFilter === 'uncategorized' && !contact.relationshipCategory) ||
          contact.relationshipCategory === relationshipFilter;
        if (!matchesRelationship) return false;
      }

      if (planetStatusFilter !== 'all') {
        const matchesPlanetStatus = 
          (planetStatusFilter === 'undefined' && !contact.planetStatus?.value) ||
          contact.planetStatus?.value === planetStatusFilter;
        if (!matchesPlanetStatus) return false;
      }

      if (accountFilter !== 'all') {
        if (!contact.account?.some(account => account.protocol === accountFilter)) return false;
      }

      if (groupFilter !== 'all') {
        const matchesGroup = 
          (groupFilter === 'has_groups' && contact.internalGroup && contact.internalGroup.size > 0) ||
          (groupFilter === 'no_groups' && (!contact.internalGroup || contact.internalGroup.size === 0)) ||
          (groupFilter === 'groups_in_common' && contact.internalGroup && contact.internalGroup.some(groupId => currentUserGroupIds.includes(groupId.value)));
        if (!matchesGroup) return false;
      }

      if (cardAssignmentFilter !== 'all') {
        if (!contact.rCardAssignments?.some(assignment => assignment.cardType === cardAssignmentFilter)) return false;
      }

      if (sortBy === 'vouchTotal') {
        if (((contact.vouchesSent || 0) + (contact.vouchesReceived || 0)) <= 0) return false;
      }

      if (sortBy === 'praiseTotal') {
        if (((contact.praisesSent || 0) + (contact.praisesReceived || 0)) <= 0) return false;
      }

      return true;
    });

    // Apply sorting inline
    filtered.sort((a, b) => {
      if (a.isMe && !b.isMe) return -1;
      if (!a.isMe && b.isMe) return 1;
      
      let compareValue = 0;
      switch (sortBy) {
        case 'name':
          compareValue = (resolveFrom(a as SocialContact, 'name')?.value || '').localeCompare(resolveFrom(b as SocialContact, 'name')?.value || '');
          break;
        case 'organization':
          compareValue = (resolveFrom(a as SocialContact, 'organization')?.value || '').localeCompare(resolveFrom(b as SocialContact, 'organization')?.value || '');
          break;
        default:
          compareValue = 0;
      }
      return sortDirection === 'asc' ? compareValue : -compareValue;
    });
    
    setTotalCount(filtered.length);
    return filtered.map(contact => contact['@id'] || '');

  }, [filters]);

  const loadNextGraphContacts = useCallback(async (): Promise<string[]> => {
    if (!session) {
      return [];
    }

    const {
      sortBy = 'name',
      sortDirection = 'asc',
      accountFilter = 'all',
      searchQuery
    } = filters;

    const filterParams = new Map<string, string>();
    if (accountFilter !== 'all') {
      filterParams.set('account', accountFilter);
    }
    if (searchQuery) {
      filterParams.set('fts', searchQuery);
    }

    // Load all contacts without pagination
    const contactIDsResult = await nextgraphDataService.getContactIDs(session, undefined, undefined,
      undefined, undefined, [{sortBy, sortDirection}], filterParams);
    const contactsCountResult = await nextgraphDataService.getContactsCount(session, filterParams);

    // @ts-expect-error TODO output format of ng sparql query
    setTotalCount(contactsCountResult.results.bindings[0].totalCount.value as number);
    const containerOverlay = session.privateStoreId!.substring(46);
    // @ts-expect-error TODO output format of ng sparql query
    return contactIDsResult.results.bindings.map(
      (binding) => binding.contactUri.value + containerOverlay
    );
  }, [session, filters]);

  const updateContact = async (nuri: string, updates: Partial<Contact>) => {
    await editContact(nuri, updates);
    loadContacts();
  };

  const addFilter = useCallback((key: keyof ContactsFilters, value: ContactsFilters[keyof ContactsFilters]) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      searchQuery: '',
      relationshipFilter: 'all',
      planetStatusFilter: 'all',
      accountFilter: 'all',
      cardAssignmentFilter: 'all',
      groupFilter: 'all',
      sortBy: 'name',
      sortDirection: 'asc'
    }));
  }, []);

  const loadContacts = useCallback(async () => {
    try {
      const nuris = !isNextGraph ? await loadMockContacts() : await loadNextGraphContacts();
      setContactNuris(nuris);
    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error(`Failed to load contacts`);
      setError(errorMessage);
      console.error(`Error loading contacts:`, errorMessage);
    }
  }, [isNextGraph, loadMockContacts, loadNextGraphContacts]);

  // Removed loadMore - no pagination needed

  const reloadContacts = useCallback(() => {
    setIsLoading(true);
    loadContacts().finally(() => setIsLoading(false));
  }, [loadContacts]);

  useEffect(() => {
    reloadContacts();
  }, [reloadContacts]);

  return {
    contacts,
    contactNuris,
    isLoading,
    error,
    addFilter,
    clearFilters,
    filters,
    totalCount,
    updateContact,
    setIconFilter,
    reloadContacts
  };
};