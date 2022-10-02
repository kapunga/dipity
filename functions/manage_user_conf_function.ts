import { SlackAPIClient } from "deno-slack-sdk/types.ts";
import {
  DefineFunction,
  Schema,
  SlackAPI,
  SlackFunction,
} from "deno-slack-sdk/mod.ts";
import UserConfDatastore from "../datastores/user_conf.ts";
import { UserConf } from "../datastores/user_conf.ts";
import { renderEditConfigView } from "../views/edit_config.ts";
import { printError } from "../lib/lib_error.ts";

export const ManageUserConfFunction = DefineFunction({
  callback_id: "manage_user_conf_function",
  title: "Manage Dipity Configuration",
  source_file: "functions/manage_user_conf_function.ts",
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
  output_parameters: {
    properties: {},
    required: [],
  },
});

export default SlackFunction(
  ManageUserConfFunction,
  async ({ inputs, token }) => {
    const client: SlackAPIClient = SlackAPI(token);
    const userConf: UserConf = await UserConfDatastore.get(
      client,
      inputs.user_id,
    );
    const result = await client.views.open({
      trigger_id: inputs.interactivity.interactivity_pointer,
      view: renderEditConfigView(
        userConf.default_window.toString(),
        userConf.preferred_partners,
      ),
    });

    if (!result.ok) throw new Error(printError(result));

    return {
      completed: false,
    };
  },
)
  .addViewSubmissionHandler(
    "edit_user_conf_view",
    async ({ inputs, body, view, token }) => {
      const client: SlackAPIClient = SlackAPI(token);
      const windowString =
        view.state.values["chat_window_block"]["default_chat_window"]["value"];
      const defaultWindow = Number(windowString);
      const preferredPartners: string[] = view.state
        .values["partner_select_block"]["preferred_partners"]["selected_users"];

      if (isNaN(defaultWindow)) {
        return {
          response_action: "update",
          view: renderEditConfigView(windowString, preferredPartners),
        };
      } else {
        const userConf: UserConf = {
          "user_id": inputs.user_id,
          "default_window": defaultWindow,
          "preferred_partners": preferredPartners,
        };
        await UserConfDatastore.put(client, userConf);

        await client.functions.completeSuccess({
          function_execution_id: body.function_data.execution_id,
          outputs: {},
        });
      }
    },
  );
