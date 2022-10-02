import { Trigger } from "deno-slack-api/types.ts";
import { ManageUserConfigWorkflow } from "../workflows/manage_user_config.ts";

const manageUserConfigTrigger: Trigger<
  typeof ManageUserConfigWorkflow.definition
> = {
  type: "shortcut",
  name: "Manage User Config Trigger",
  description: "Dipity Config Trigger",
  workflow: "#/workflows/manage_user_config_workflow",
  inputs: {
    user_id: {
      value: "{{data.user_id}}",
    },
    interactivity: {
      value: "{{data.interactivity}}",
    },
  },
};

export default manageUserConfigTrigger;
