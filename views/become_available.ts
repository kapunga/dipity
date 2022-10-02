import { AvailabilityTypes } from "../lib/lib_availability.ts";

export const becomeAvailableView = () => {
  const view = {
    "type": "modal",
    "callback_id": "become_available_view",
    "title": {
      "type": "plain_text",
      "text": "Dipity",
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
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "Become Available",
          "emoji": true,
        },
      },
      {
        "block_id": "available-until",
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "I'm available until...",
        },
        "accessory": {
          "type": "timepicker",
          "initial_time": "13:37",
          "placeholder": {
            "type": "plain_text",
            "text": "Select time",
            "emoji": true,
          },
          "action_id": "available-until-action",
        },
      },
      {
        "block_id": "available-for",
        "type": "input",
        "element": {
          "type": "static_select",
          "initial_option": {
            "text": {
              "type": "plain_text",
              "text": "Anyone available.",
              "emoji": true,
            },
            "value": "anyone",
          },
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text": "Anyone available.",
                "emoji": true,
              },
              "value": AvailabilityTypes.ANYONE,
            },
            {
              "text": {
                "type": "plain_text",
                "text": "People I'm looking for.",
                "emoji": true,
              },
              "value": AvailabilityTypes.PARTNER_LIST,
            },
            {
              "text": {
                "type": "plain_text",
                "text": "People from a particular channel.",
                "emoji": true,
              },
              "value": AvailabilityTypes.CHANNEL_MEMBER,
            },
          ],
          "action_id": "available-for-action",
        },
        "label": {
          "type": "plain_text",
          "text": "I'd like to chat with",
          "emoji": true,
        },
      },
    ],
  };

  return view;
};
