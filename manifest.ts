import { DefineDatastore, Manifest, Schema } from "deno-slack-sdk/mod.ts";
import { ManageUserConfigWorkflow } from "./workflows/manage_user_config.ts";

export const UserConfDatastore = DefineDatastore({
  name: "user_conf",
  primary_key: "user_id",
  attributes: {
    user_id: {
      type: Schema.types.string,
    },
    default_window: {
      type: Schema.types.integer,
    },
    preferred_partners: {
      type: Schema.types.string,
    },
  },
});

export const AvailabilityDatastore = DefineDatastore({
  name: "availability",
  primary_key: "user_id",
  attributes: {
    user_id: {
      type: Schema.types.string,
    },
    availability_type: {
      type: Schema.types.string,
    },
    metadata: {
      type: Schema.types.string,
    },
  },
});

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "dipity",
  description: "Thor messing about with Hermes in his spare time",
  icon: "assets/icon.png",
  workflows: [ManageUserConfigWorkflow],
  datastores: [UserConfDatastore],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
  ],
});
