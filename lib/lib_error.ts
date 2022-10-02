import { BaseResponse } from "deno-slack-api/types.ts";

export const printError = (response: BaseResponse) => {
  const warnings = response.warnings
    ? `warnings: [${response.warnings.join(", ")}]\n`
    : "";
  const metaWarnings = response?.response_metadata?.warnings
    ? `warning_meta:\n  ${response.response_metadata.warnings.join("\n  ")}\n`
    : "";
  const error = response.error ? `error: '${response.error}\n'` : "";
  const metaMessages = response?.response_metadata?.messages
    ? `messages:\n  ${response.response_metadata.messages.join("\n  ")}`
    : "";
  return `${warnings}${metaWarnings}${error}${metaMessages}`;
};
