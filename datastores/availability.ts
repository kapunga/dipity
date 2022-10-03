import { SlackAPIClient } from "deno-slack-sdk/types.ts";
import {
  Availability,
  AvailabilityTypes,
  ChannelAvailability,
  OpenAvailability,
  PartnerListAvailability,
} from "../lib/lib_availability.ts";
import { printError } from "../lib/lib_error.ts";

export type DSAvailability = {
  user_id: string;
  availability_type: string;
  metadata: string;
  until: bigint;
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

export default class AvailabilityDatastore {
  private static readonly DATASTORE_NAME = "availability";

  static getAll = async (
    client: SlackAPIClient,
  ): Promise<Array<Availability>> => {
    console.log("[AvailabilityDatastore.getAll]");
    const result = await client.apps.datastore.query({
      datastore: this.DATASTORE_NAME,
    });
    if (!result.ok) throw new Error(printError(result));
    const now = Date.now();
    const availabilities = result.items.map((dsa) => {
      const ds_availability = dsa as DSAvailability;
      return fromDsAvailability(ds_availability);
    }).filter((a) => a.until < now);
    return availabilities;
  };

  // TODO Purge function that clears out all expired availabilities.

  static put = async (
    client: SlackAPIClient,
    availability: Availability,
  ): Promise<void> => {
    const ds_availability = toDsAvailability(availability);
    console.log("[AvailabilityDatastore.put]", ds_availability);
    const result = await client.apps.datastore.put({
      datastore: this.DATASTORE_NAME,
      item: ds_availability,
    });
    if (!result.ok) throw new Error(printError(result));
  };
}
