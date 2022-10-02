import { SlackAPIClient } from "deno-slack-sdk/types.ts";
import { printError } from "../lib/lib_error.ts";

export type DSUserConf = {
  user_id: string;
  default_window: number;
  preferred_partners: string;
};

export type UserConf = {
  user_id: string;
  default_window: number;
  preferred_partners: string[];
};

export const userConfToDsUserConf = (
  userConf: UserConf,
): DSUserConf => {
  return {
    user_id: userConf.user_id,
    default_window: userConf.default_window,
    preferred_partners: JSON.stringify(userConf.preferred_partners),
  } as DSUserConf;
};

export const dsUserConfToUserConf = (
  dsUserConf: DSUserConf,
): UserConf => {
  return {
    user_id: dsUserConf.user_id,
    default_window: dsUserConf.default_window,
    preferred_partners: JSON.parse(dsUserConf.preferred_partners),
  } as UserConf;
};

export default class UserConfDatastore {
  private static readonly DATASTORE_NAME = "user_conf";

  static get = async (
    client: SlackAPIClient,
    user_id: string,
  ): Promise<UserConf> => {
    console.log("[UserConfDatastore.get]", `user_id=${user_id}`);
    const result = await client.apps.datastore.get({
      datastore: this.DATASTORE_NAME,
      id: user_id,
    });
    if (!result.ok) throw new Error(printError(result));

    const userConf = result.item as DSUserConf;
    console.log("[UserConfDatastore.get]", userConf);

    if (Object.keys(userConf).length === 0) {
      return {
        user_id: user_id,
        default_window: 15,
        preferred_partners: [],
      } as UserConf;
    } else {
      return dsUserConfToUserConf(userConf);
    }
  };

  static put = async (
    client: SlackAPIClient,
    userConf: UserConf,
  ): Promise<void> => {
    const dsConf = userConfToDsUserConf(userConf);
    console.log("[UserConfDatastore.put]", dsConf);
    const result = await client.apps.datastore.put({
      datastore: this.DATASTORE_NAME,
      item: dsConf,
    });
    if (!result.ok) throw new Error(printError(result));
  };
}
