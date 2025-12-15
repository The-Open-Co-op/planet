import {useState, useEffect, useCallback, useMemo} from 'react';
import {isNextGraphEnabled} from '@/utils/featureFlags';
import {dataService} from '@/services/dataService';
import type {Contact, SortParams} from '@/types/contact';
import {nextgraphDataService} from "@/services/nextgraphDataService";
import {useNextGraphAuth} from "@/lib/nextgraph";
import {NextGraphAuth} from "@/types/nextgraph";
import {resolveFrom} from '@/utils/contactUtils';
import {useSaveContacts} from "@/hooks/contacts/useSaveContacts.ts";

export interface ContactsFilters extends SortParams {
  searchQuery?: string;
  relationshipFilter?: string;
  planetStatusFilter?: string;
  accountFilter?: string;
  groupFilter?: string;
  currentUserGroupIds?: string[];
  cardAssignmentFilter?: string;
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

  // Memoize expensive filtering operations
  const filteredContacts = useMemo(() => {
    if (!contacts.length) return [];
    
    const {
      searchQuery = '',
      relationshipFilter = 'all',
      planetStatusFilter = 'all',
      accountFilter = 'all',
      groupFilter = 'all',
      cardAssignmentFilter = 'all',
      sortBy = 'name',
      currentUserGroupIds = []
    } = filters;

    return contacts.filter(contact => {
      // Quick exit for common cases
      if (searchQuery === '' && relationshipFilter === 'all' && planetStatusFilter === 'all' && 
          accountFilter === 'all' && groupFilter === 'all' && cardAssignmentFilter === 'all' &&
          sortBy !== 'vouchTotal' && sortBy !== 'praiseTotal') {
        return true;
      }

      // Search filter (only if needed)
      if (searchQuery) {
        const name = resolveFrom(contact, 'name');
        const email = resolveFrom(contact, 'email');
        const organization = resolveFrom(contact, 'organization');
        const address = resolveFrom(contact, 'address');

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

      // Other filters (only if not 'all')
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

      // Vouch/praise filters
      if (sortBy === 'vouchTotal') {
        if (((contact.vouchesSent || 0) + (contact.vouchesReceived || 0)) <= 0) return false;
      }

      if (sortBy === 'praiseTotal') {
        if (((contact.praisesSent || 0) + (contact.praisesReceived || 0)) <= 0) return false;
      }

      return true;
    });
  }, [contacts, filters]);

  // Memoize sorted contacts to avoid expensive sorting on every render
  const sortedContacts = useMemo(() => {
    if (!filteredContacts.length) return [];
    
    const {
      sortBy = 'name',
      sortDirection = 'asc'
    } = filters;
    
    // Create a copy to avoid mutating the original array
    const contactsCopy = [...filteredContacts];
    
    // Sort the filtered results
    contactsCopy.sort((a, b) => {
      // Always put the "me" contact first
      if (a.isMe && !b.isMe) return -1;
      if (!a.isMe && b.isMe) return 1;
      
      let compareValue = 0;

      switch (sortBy) {
        case 'name': {
          const aName = resolveFrom(a, 'name')?.value || '';
          const bName = resolveFrom(b, 'name')?.value || '';
          compareValue = aName.localeCompare(bName);
          break;
        }
        case 'organization': {
          const aOrganization = resolveFrom(a, 'organization')?.value || '';
          const bOrganization = resolveFrom(b, 'organization')?.value || '';
          compareValue = aOrganization.localeCompare(bOrganization);
          break;
        }
        case 'planetStatus': {
          const statusOrder = {'member': 0, 'invited': 1, 'not_invited': 2};
          const aStatus = a.planetStatus?.value as keyof typeof statusOrder;
          const bStatus = b.planetStatus?.value as keyof typeof statusOrder;
          compareValue = (statusOrder[aStatus] || 3) - (statusOrder[bStatus] || 3);
          break;
        }
        case 'groupCount': {
          const aGroups = a.internalGroup?.size || 0;
          const bGroups = b.internalGroup?.size || 0;
          compareValue = aGroups - bGroups;
          break;
        }
        case 'lastInteractionAt': {
          const aDate = a.lastInteractionAt?.getTime() || 0;
          const bDate = b.lastInteractionAt?.getTime() || 0;
          compareValue = aDate - bDate;
          break;
        }
        case 'vouchTotal': {
          const aVouches = (a.vouchesSent || 0) + (a.vouchesReceived || 0);
          const bVouches = (b.vouchesSent || 0) + (b.vouchesReceived || 0);
          compareValue = aVouches - bVouches;
          break;
        }
        case 'praiseTotal': {
          const aPraises = (a.praisesSent || 0) + (a.praisesReceived || 0);
          const bPraises = (b.praisesSent || 0) + (b.praisesReceived || 0);
          compareValue = aPraises - bPraises;
          break;
        }
        // Simplified mostActive case - removed expensive calculations
        case 'mostActive': {
          const aActivity = (a.interactionCount || 0) + (a.recentInteractionScore || 0);
          const bActivity = (b.interactionCount || 0) + (b.recentInteractionScore || 0);
          compareValue = bActivity - aActivity;
          break;
        }
        // Simplified sharedTags case
        case 'sharedTags': {
          const aShared = a.sharedTagsCount || 0;
          const bShared = b.sharedTagsCount || 0;
          compareValue = bShared - aShared;
          break;
        }
        default:
          compareValue = 0;
      }

      return sortDirection === 'asc' ? compareValue : -compareValue;
    });
    
    return contactsCopy;
  }, [filteredContacts, filters]);

  const loadMockContacts = useCallback(async (): Promise<string[]> => {
    const allContacts = await dataService.getContacts();
    setContacts(allContacts);
    setTotalCount(sortedContacts.length);
    
    // Return contact IDs from pre-sorted and filtered contacts
    return sortedContacts.map(contact => contact['@id'] || '');

  }, [sortedContacts]);

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