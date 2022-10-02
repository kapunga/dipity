export enum AvailabilityTypes {
  ANYONE = "anyone",
  PARTNER_LIST = "partner-list",
  CHANNEL_MEMBER = "channel-member",
}

export type OpenAvailability = {
  user_id: string;
  looking_for_me: boolean;
  until: number;
  availability_type: AvailabilityTypes.ANYONE;
};

export type PartnerListAvailability = {
  user_id: string;
  partners_user_ids: string[];
  until: number;
  availability_type: AvailabilityTypes.PARTNER_LIST;
};

export type ChannelAvailability = {
  user_id: string;
  channel_id: string;
  until: number;
  availability_type: AvailabilityTypes.CHANNEL_MEMBER;
};

export type Availability =
  | OpenAvailability
  | PartnerListAvailability
  | ChannelAvailability;
