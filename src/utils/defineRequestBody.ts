export type TActivityName =
  | "readTextbook"
  | "viewAdditionalMaterial"
  | "solveAutocheckTask"
  | "viewEventRecording";

export type TSecondArgument = number | string;
/* в зависимости от event в TActivityName:
  для readTextbook - moduleId (number)
  для viewAdditionalMaterial - materialId (number)
  для solveAutocheckTask - taskId (string)
  для viewEventRecording - eventId (number)
  */

function defineKeyName(eventName: TActivityName): string {
  switch (eventName) {
    case "readTextbook":
      return "moduleId";

    case "viewAdditionalMaterial":
      return "materialId";

    case "solveAutocheckTask":
      return "taskId";

    case "viewEventRecording":
      return "eventId";

    default:
      return "moduleId";
  }
}

const defineRequestBody = (
  eventName: TActivityName,
  secondArgument: TSecondArgument,
  groupId: number,
  startedAt: string,
  durationSeconds: number
) => {
  const body = {
    event: eventName,
    params: {
      groupId: groupId,
      startedAt: startedAt,
      durationSeconds: durationSeconds,
    },
  };

  const additionalKey = defineKeyName(eventName);

  Object.defineProperty(body, additionalKey, {
    value: secondArgument,
  });

  return body;
};

export default defineRequestBody;
