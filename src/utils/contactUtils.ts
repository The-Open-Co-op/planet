import {LdSet} from '@ldo/ldo';
import {SocialContact} from '@/.ldo/contact.typings';
import {Contact, Source} from "@/types/contact";
import {contactContext} from "@/.ldo/contact.context";

export const contactCommonProperties = [
  "@id",
  "@context",
  "type",
  "naoStatus",
  "invitedAt",
  "createdAt",
  "updatedAt",
  "joinedAt",
] as const satisfies readonly (keyof SocialContact)[];

export type ContactLdSetProperties = Omit<
  SocialContact,
  (typeof contactCommonProperties)[number]
>;

type KeysWithSelected<T> = {
  [K in keyof T]-?: NonNullable<T[K]> extends LdSet<infer U>
    ? "selected" extends keyof U
      ? K
      : never
    : never
}[keyof T];

type KeysWithHidden<T> = {
  [K in keyof T]-?: NonNullable<T[K]> extends LdSet<infer U>
    ? "hidden" extends keyof U
      ? K
      : never
    : never
}[keyof T];

type KeysWithType<T> = {
  [K in keyof T]-?: NonNullable<T[K]> extends LdSet<infer U>
    ? "type2" extends keyof U
      ? K
      : never
    : never
}[keyof T];

export type ContactKeysWithSelected = KeysWithSelected<ContactLdSetProperties>
export type ContactKeysWithHidden = KeysWithHidden<ContactLdSetProperties>
export type ContactKeysWithType = KeysWithType<ContactLdSetProperties>

export type ResolvableKey = keyof ContactLdSetProperties;

export type ItemOf<K extends ResolvableKey> =
  NonNullable<ContactLdSetProperties[K]> extends LdSet<infer T> ? T : never;

type WithSource = { source?: string };
type WithSelected = { selected?: boolean };
type WithHidden = { hidden?: boolean };

export function hasSource(item: any): item is WithSource {
  return item && typeof item === 'object' && item["source"];
}

export function hasType(item: any): item is { type2?: any } {
  return item && typeof item === 'object' && item["type2"];
}

function hasSelected(item: any): item is WithSelected {
  return item && typeof item === 'object' && item["selected"] && item["@id"];
}

function hasHidden(item: any): item is WithHidden {
  return item && typeof item === 'object' && item["hidden"];
}

function hasProperty(item: any, property: string): item is { [property]?: any } {
  return item && typeof item === 'object' && item[property] && item[property];
}

const defaultPolicy: Source[] = ["user", "GreenCheck", "linkedin", "Android Phone", "iPhone", "Gmail", "vcard"];

export function resolveFrom<K extends ResolvableKey>(
  socialContact: SocialContact | undefined,
  key: K,
  policy = defaultPolicy,
): ItemOf<K> | undefined {
  if (!socialContact) return;

  const set = socialContact[key];
  if (!set) return;

  const items = set.toArray() as ItemOf<K>[];

  const selectedItem = items.find(item => hasSelected(item) && item.selected || hasProperty(item, "preferred") && item.preferred);
  if (selectedItem) return selectedItem;

  const firstBySrc = new Map<string, ItemOf<K>>();
  let fallback: ItemOf<K> | undefined;

  for (const item of items) {
    const src = hasSource(item) ? item.source : undefined;
    if (hasHidden(item) && item.hidden) {
      continue;
    }
    if (src && !firstBySrc.has(src)) firstBySrc.set(src, item);
    if (!fallback) fallback = item;
  }

  for (const s of policy) {
    const hit = firstBySrc.get(s);
    if (hit) return hit;
  }
  return fallback;
}

export function getPropByType<K extends ContactKeysWithType>(socialContact: SocialContact, key: K, type: string): ItemOf<K> | undefined {
  //@ts-expect-error this is crazy, but that how it works
  return (socialContact[key]?.toArray() ?? []).find((el) => {
    //@ts-expect-error this is crazy, but that how it works
    const types: any[] = hasType(el) && el.type2?.toArray();
    if (types.length > 0) {
      return types[0]["@id"] == type
    }
  })
}

export function getVisibleItems<K extends ResolvableKey>(
  socialContact: SocialContact | undefined,
  key: K,
): ItemOf<K>[] {
  if (!socialContact) return [];

  const set = socialContact[key];
  if (!set) return [];

  return set.toArray().filter(item =>
    !(hasHidden(item) && item.hidden) && item["@id"]
  ) as ItemOf<K>[];
}

export function setUpdatedTime(contactObj: Contact) {
  const currentDateTime = new Date(Date.now()).toISOString();
  if (contactObj.updatedAt) {
    contactObj.updatedAt.valueDateTime = currentDateTime;
  } else {
    contactObj.updatedAt = {
      valueDateTime: currentDateTime,
      source: "user",
    }
  }
}

export function updatePropertyFlag<K extends ResolvableKey>(
  contact: SocialContact,
  key: K,
  itemId: string,
  flag: string,           // "preferred" | "selected" | "hidden"
  mode: "single" | "toggle" = "single",
): void {
  const set = contact[key] as LdSet<any>;
  if (!set) return;

  const items = set.toArray();

  if (mode === "single") {
    items.forEach(el => {
      if (!el["@id"]) return;
      el[flag] = el["@id"] === itemId;
    });
  } else {
    const target = items.find(el => el["@id"] === itemId);
    if (target) {
      target[flag] = !(target[flag] ?? false);
    }
  }
}


export function updateProperty<K extends ResolvableKey>(
  contact: SocialContact,
  key: K,
  itemId: string,
  property: string,
  value: any
): void {
  const set = contact[key] as LdSet<any>;
  if (!set) return;

  const items = set.toArray();

  const item = items.find(el => el["@id"] === itemId);
  if (item) {
    item[property] = value;
  }
}


const allProperties = Object.keys((contactContext.Individual as any)["@context"]);
const excludedProperties = contactCommonProperties.map(prop => prop as string);
export const contactLdSetProperties = allProperties.filter(prop => !excludedProperties.includes(prop)) as (keyof ContactLdSetProperties)[];