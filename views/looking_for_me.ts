export const lookingForMeView = () => {
  const view = {
    "type": "modal",
    "callback_id": "looking-for-me-view",
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
        "block_id": "looking-for-me-block",
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Section block with radio buttons",
        },
        "accessory": {
          "type": "radio_buttons",
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text":
                  "Only match people looking for me or people in a channel I am in.",
                "emoji": true,
              },
              "value": "only-me",
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Match anyone.",
                "emoji": true,
              },
              "value": "anyone",
            },
          ],
          "initial_option": {
            "text": {
              "type": "plain_text",
              "text":
                "Only match people looking for me or people in a channel I am in.",
              "emoji": true,
            },
            "value": "only-me",
          },
          "action_id": "looking-for-me-choice",
        },
      },
    ],
  };
  return view;
};
