import {
  Availability,
  AvailabilityTypes,
  ChannelAvailability,
  OpenAvailability,
  PartnerListAvailability,
} from "../lib/lib_availability.ts";

export type DSAvailability = {
  user_id: string;
  availability_type: string;
  metadata: string;
  until: number;
};

export const fromDsAvailability = (dsa: DSAvailability): Availability => {
  const baseAvailability = {
    user_id: dsa.user_id,
    until: dsa.until,
  };
  switch (dsa.availability_type) {
    case AvailabilityTypes.ANYONE:
      return {
        ...baseAvailability,
        looking_for_me: JSON.parse(dsa.metadata),
      } as OpenAvailability;
    case AvailabilityTypes.CHANNEL_MEMBER:
      return {
        ...baseAvailability,
        channel_id: dsa.metadata,
      } as ChannelAvailability;
    case AvailabilityTypes.PARTNER_LIST:
      return {
        ...baseAvailability,
        partners_user_ids: JSON.parse(dsa.metadata),
      } as PartnerListAvailability;
    default:
      throw new Error(
        `Unrecognized Avalability Type: '${dsa.availability_type}'`,
      );
  }
};

export const toDsAvailability = (a: Availability): DSAvailability => {
  const baseAvailability = {
    user_id: a.user_id,
    availability_type: a.availability_type,
    until: a.until,
  };
  switch (a.availability_type) {
    case AvailabilityTypes.ANYONE:
      return {
        ...baseAvailability,
        metadata: JSON.stringify(a.looking_for_me),
      } as DSAvailability;
    case AvailabilityTypes.CHANNEL_MEMBER:
      return {
        ...baseAvailability,
        metadata: a.channel_id,
      } as DSAvailability;
    case AvailabilityTypes.PARTNER_LIST:
      return {
        ...baseAvailability,
        metadata: JSON.stringify(a.partners_user_ids),
      };
  }
};
