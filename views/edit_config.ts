export const renderEditConfigView = (
  defaultWindow: string,
  preferredPartners: string[],
) => {
  const window = Number(defaultWindow);
  const badWindow = isNaN(window) || window <= 0;
  const view = {
    "type": "modal",
    "callback_id": "edit_user_conf_view",
    "title": {
      "type": "plain_text",
      "text": "Dipity Configuration",
      "emoji": true,
    },
    "submit": {
      "type": "plain_text",
      "text": "Submit",
      "emoji": true,
    },
    "close": {
      "type": "plain_text",
      "text": "Cancel",
      "emoji": true,
    },
    "blocks": [
      {
        "block_id": "chat_window_block",
        "type": "input",
        "element": {
          "type": "plain_text_input",
          "action_id": "default_chat_window",
          "initial_value": `${defaultWindow}`,
        },
        "label": {
          "type": "plain_text",
          "text": "Default Chat Window",
          "emoji": true,
        },
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "plain_text",
            "text": `Enter your preferred chat window in minutes.${
              badWindow
                ? " :warning: Please enter a postive number :warning: "
                : ""
            }`,
            "emoji": true,
          },
        ],
      },
      {
        "block_id": "partner_select_block",
        "type": "input",
        "element": partnerSelectElement(preferredPartners),
        "label": {
          "type": "plain_text",
          "text": "Preferred Chat Partners",
          "emoji": true,
        },
      },
      {
        "type": "context",
        "elements": [
          {
            "type": "plain_text",
            "text":
              "Select anyone who you would like to chat with, could be office friends, people whose brain's you would like to pick, executives you have questions for, etc.",
            "emoji": true,
          },
        ],
      },
    ],
  };

  return view;
};

/**
 * We have to check if `preferredPartners` is empty. If it is empty,
 * we can't include it in `initial_users` or the modal will fail to load.
 */
const partnerSelectElement = (preferredPartners: string[]) => {
  if (preferredPartners && preferredPartners.length > 0) {
    return {
      "type": "multi_users_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Select users",
        "emoji": true,
      },
      "initial_users": preferredPartners,
      "action_id": "preferred_partners",
    };
  } else {
    return {
      "type": "multi_users_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Select users",
        "emoji": true,
      },
      "action_id": "preferred_partners",
    };
  }
};
