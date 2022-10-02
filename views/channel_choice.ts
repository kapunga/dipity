export const channelPickerView = () => {
  const view = {
    "type": "modal",
    "callback_id": "channel_picker_view",
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
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": "Which conversation are you looking for people from?",
          "emoji": true,
        },
      },
      {
        "block_id": "channel-chooser",
        "type": "actions",
        "elements": [
          {
            "type": "conversations_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Select a conversation",
              "emoji": true,
            },
            "filter": {
              "include": [
                "public",
                "private",
              ],
            },
            "action_id": "channel-choice",
          },
        ],
      },
    ],
  };

  return view;
};
