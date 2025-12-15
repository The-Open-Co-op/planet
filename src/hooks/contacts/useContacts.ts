import {useState, useEffect, useCallback} from 'react';
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

  const loadMockContacts = useCallback(async (): Promise<string[]> => {
    console.log(`🔄 Loading all mock contacts...`);
    const allContacts = await dataService.getContacts();
    console.log(`📊 Total contacts fetched: ${allContacts.length}`);
    console.log(`👤 Me contacts found:`, allContacts.filter(c => c.isMe).length);
    console.log(`🆔 All contact IDs:`, allContacts.map(c => c['@id']));

    const {
      searchQuery = '',
      relationshipFilter = 'all',
      planetStatusFilter = 'all',
      accountFilter = 'all',
      groupFilter = 'all',
      cardAssignmentFilter = 'all',
      sortBy = 'name',
      sortDirection = 'asc',
      currentUserGroupIds = []
    } = filters;

    const filtered = allContacts.filter(contact => {
      // Search filter
      const name = resolveFrom(contact, 'name');
      const email = resolveFrom(contact, 'email');
      const organization = resolveFrom(contact, 'organization');
      const address = resolveFrom(contact, 'address');

      const matchesSearch = searchQuery === '' ||
        name?.value?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email?.value?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        organization?.value?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        organization?.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        address?.region?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        address?.country?.toLowerCase().includes(searchQuery.toLowerCase());

      // Relationship filter
      const matchesRelationship = relationshipFilter === 'all' ||
        (relationshipFilter === 'undefined' && !contact.relationshipCategory) ||
        (relationshipFilter === 'uncategorized' && !contact.relationshipCategory) ||
        contact.relationshipCategory === relationshipFilter;

      // NAO Status filter
      const matchesPlanetStatus = planetStatusFilter === 'all' ||
        (planetStatusFilter === 'undefined' && !contact.planetStatus?.value) ||
        contact.planetStatus?.value === planetStatusFilter;

      // Account filter
      const matchesSource = accountFilter === 'all'
        || contact.account?.some(account => account.protocol === accountFilter);

      // Group filter
      const matchesGroup = groupFilter === 'all' ||
        (groupFilter === 'has_groups' && contact.internalGroup && contact.internalGroup.size > 0) ||
        (groupFilter === 'no_groups' && (!contact.internalGroup || contact.internalGroup.size === 0)) ||
        (groupFilter === 'groups_in_common' && contact.internalGroup && contact.internalGroup.some(groupId => currentUserGroupIds.includes(groupId.value)));

      // Vouch filter - when sortBy is 'vouchTotal', only show contacts with vouches > 0
      const matchesVouches = sortBy !== 'vouchTotal' ||
        ((contact.vouchesSent || 0) + (contact.vouchesReceived || 0)) > 0;

      // Praise filter - when sortBy is 'praiseTotal', only show contacts with praises > 0
      const matchesPraises = sortBy !== 'praiseTotal' ||
        ((contact.praisesSent || 0) + (contact.praisesReceived || 0)) > 0;

      // Card assignment filter - matches contacts assigned to specific Trust Profile types
      const matchesCardAssignment = cardAssignmentFilter === 'all' ||
        (contact.rCardAssignments?.some(assignment => assignment.cardType === cardAssignmentFilter));

      return matchesSearch && matchesRelationship && matchesPlanetStatus && matchesSource && matchesGroup && matchesVouches && matchesPraises && matchesCardAssignment;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
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
        case 'mostActive': {
          // Use a fixed reference time for consistent sorting across page loads
          const now = new Date('2024-07-30T00:00:00Z').getTime(); // Fixed reference date
          const dayInMs = 24 * 60 * 60 * 1000;
          const weekInMs = 7 * dayInMs;
          const monthInMs = 30 * dayInMs;

          const calculateActivityScore = (contact: typeof a) => {
            const lastInteraction = contact.lastInteractionAt?.getTime() || 0;
            const timeSinceInteraction = now - lastInteraction;

            let timeScore = 0;
            if (timeSinceInteraction < dayInMs) {
              timeScore = 1000;
            } else if (timeSinceInteraction < weekInMs) {
              timeScore = 500;
            } else if (timeSinceInteraction < monthInMs) {
              timeScore = 100;
            } else {
              timeScore = Math.max(1, 50 - (timeSinceInteraction / monthInMs));
            }

            const interactionFrequency = (contact.interactionCount || 0) * 10;
            const recentScore = contact.recentInteractionScore || 0;

            return timeScore + interactionFrequency + recentScore;
          };

          const aActivity = calculateActivityScore(a);
          const bActivity = calculateActivityScore(b);
          compareValue = bActivity - aActivity;
          break;
        }
        /* TODO: I don't think we would have this one
           case 'nearMeNow': {
           const aAddress = resolveFrom(a, 'address');
           const bAddress = resolveFrom(b, 'address');
           const aDistance = (aAddress as any)?.distance || Number.MAX_SAFE_INTEGER;
           const bDistance = (bAddress as any)?.distance || Number.MAX_SAFE_INTEGER;
           compareValue = aDistance - bDistance;
           break;
         }*/
        case 'sharedTags': {
          const calculateSharedTagsScore = (contact: typeof a) => {
            const sharedTags = contact.sharedTagsCount || 0;
            const totalTags = contact.tag?.size || 0;
            const tagSimilarity = totalTags > 0 ? (sharedTags / totalTags) * 100 : 0;
            return sharedTags * 10 + tagSimilarity;
          };

          const aSharedScore = calculateSharedTagsScore(a);
          const bSharedScore = calculateSharedTagsScore(b);
          compareValue = bSharedScore - aSharedScore;
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
        default:
          compareValue = 0;
      }

      return sortDirection === 'asc' ? compareValue : -compareValue;
    });

    setContacts(allContacts);
    setTotalCount(filtered.length);
    
    console.log(`📄 Loading all ${filtered.length} contacts (no pagination)`);
    console.log(`🔍 Filtered contact IDs:`, filtered.map(c => c['@id']));
    console.log(`👤 Filtered me contacts:`, filtered.filter(c => c.isMe).length);
    
    // Return ALL filtered contacts, not paginated
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
    console.log(`🚀 Loading all contacts...`);
    try {
      const nuris = !isNextGraph ? await loadMockContacts() : await loadNextGraphContacts();
      console.log(`📥 Loaded ${nuris.length} contacts total`);
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