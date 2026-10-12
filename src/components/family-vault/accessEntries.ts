import { ACCESS_LOG, SCHOOL_REQUEST, CLINIC_REQUEST } from './familyVaultData';
import type { AccessEntry } from './familyVaultData';

/**
 * The family's grants: the standing ones, plus anything granted earlier in the
 * demo. Both the home screen's count and the Shared screen read from here, so
 * the number on the tile can't drift from the list behind it.
 */
export const buildAccessEntries = ({
  approval,
  clinicChoice,
  duration,
}: {
  approval: string;
  clinicChoice: string | null;
  duration: string;
}): AccessEntry[] => [
  ...(approval === 'complete'
    ? [
        {
          id: 'acc-school',
          about: 'alice' as const,
          who: SCHOOL_REQUEST.org,
          what: 'Placed Alice using her transcript and learner profile',
          when: 'Today',
          state: 'active' as const,
          until: `Ends ${duration.toLowerCase()}`,
        },
      ]
    : []),
  ...(clinicChoice
    ? [
        {
          id: 'acc-clinic',
          about: 'ethan' as const,
          who: CLINIC_REQUEST.org,
          what:
            clinicChoice === 'answer'
              ? 'Checked that Ethan meets school entry requirements'
              : "Read Ethan's full immunization record",
          when: 'Today',
          state: 'active' as const,
          until: `Ends in ${CLINIC_REQUEST.duration}`,
        },
      ]
    : []),
  ...ACCESS_LOG,
];

/** How many grants are live right now. */
export const countActiveGrants = (entries: AccessEntry[], revokedIds: string[]) =>
  entries.filter((e) => e.state === 'active' && !revokedIds.includes(e.id)).length;
