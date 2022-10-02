import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ManageUserConfFunction } from "../functions/manage_user_conf_function.ts";

export const ManageUserConfigWorkflow = DefineWorkflow({
  callback_id: "manage_user_config_workflow",
  title: "Manage User Config Workflow",
  description: "Manage Dipity User Config",
  input_parameters: {
    properties: {
      user_id: {
        type: Schema.slack.types.user_id,
      },
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: ["user_id", "interactivity"],
  },
});

ManageUserConfigWorkflow.addStep(ManageUserConfFunction, {
  user_id: ManageUserConfigWorkflow.inputs.user_id,
  interactivity: ManageUserConfigWorkflow.inputs.interactivity,
});
