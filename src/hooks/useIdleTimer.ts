import { useIdleTimer } from "react-idle-timer";
import defineRequestBody from "../utils/defineRequestBody";

export type TActivityName =
  | 'readTextbook'
  | 'viewAdditionalMaterial'
  | 'solveAutocheckTask'
  | 'viewEventRecording';

export type TSecondArgument =
  | number
  | string;
  /* в зависимости от event в TActivityName:
  для readTextbook - moduleId (number)
  для viewAdditionalMaterial - materialId (number)
  для solveAutocheckTask - taskId (string)
  для viewEventRecording - eventId (number)
  */

const useIdleTimerHook = (eventName: TActivityName, 
  secondArgument: TSecondArgument ) => {
  const handleOnIdle = () => {
    console.log("user is idle");
    console.log("last active", getTotalActiveTime());
    /* 
    тут отправлять запрос на бєкенд со всем суммарно активным временем которое можно получить вызвав getTotalActiveTime():

    - заметил нюанс что время timeout не включается во время пользования приложением, то  есть как только юзер перестал хоть какие то действия делать это время не считается активным использованием;
    - getTotalActiveTime() - не забыть учесть нюанс что ф-ия возвращает милисекунды, а бекенд ждет секунды, то есть делить на 1000 результат вызова функции

    !!! Дока бекенда для отправки
    https://wikijs.goit.global/ru/lms/services/data-warehouse
    не писал тут решение, так как не знаю как правильно решить проблему с просроченным токеном, а также отсюда не отправлю запрос так как токена тут нет вприниципе (считаю это нужно делать уже в самой LMS)

    - ПАРАМЕТР groupId брать тут хуком из common, чтобы каждый раз не передавать его при вызове функции
    import { getGroup } from '@modules/common/services/api/group';
    - ПАРАМЕТР durationSeconds = getTotalActiveTime()/1000; также тут определяется
    - ПАРАМЕТР durationSeconds - также определять тут, таким образом:
    new Date().toISOString().substr(0, 19);
    и будет необходимый формат по доке бэкенда - "2021-07-20T07:57:08"
    - ПАРАМЕТР secondArgument будет содержать в себе в зависимости от eventName 
    для readTextbook - moduleId (number)
    для viewAdditionalMaterial - materialId (number)
    для solveAutocheckTask - taskId (string)
    для viewEventRecording - eventId (number)

    ИТОГО МОЖНО БУДЕТ СФОРМИРОВАТЬ ОДИН ИЗ ЧЕТЫРЕХ ВИДОВ ОБЪЕКТА И ОТПРАВИТЬ НА БЭКЕНД:
    1) {
      "event": "readTextbook",
      "params": {
          "moduleId": 1,
          "groupId": 1,
          "startedAt": "2021-04-10T10:54:00",
          "durationSeconds": 567
        }
      }

    2) {
      "event": viewAdditionalMaterial",
      "params": {
          "materialId": 1,
          "groupId": 1,
          "startedAt": "2021-04-10T10:54:00",
          "durationSeconds": 567
        }
      }

      3) {
        "event": "solveAutocheckTask",
        "params": {
          "taskId": "html-100",
          "groupId": 1,
          "startedAt": "2021-04-10T10:54:00",
          "durationSeconds": 567
          }
      }

      4) {
          "event": "viewEventRecording",
          "params": {
                "eventId": 5,
                "groupId": 1,
                "startedAt": "2021-04-10T10:54:00",
                "durationSeconds": 567
            }
          }  

      *** для определения формата объекта использовать утилитку defineRequestBody
      import defineRequestBody from "../utils/defineRequestBody";
    */
  };

  const handleOnActive = () => {
    console.log("user is active");
  };

  const { getTotalActiveTime } = useIdleTimer({
    timeout: 3000,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
  });

  return { handleOnIdle, handleOnActive };
  /*
    1. Задумано использовать в компоненте конспекта (или текстового доп материала) так:

    useEffect(() => {
      handleOnActive();

      return () => {
        handleOnIdle();
      }
    }, [])

    2. В автопроверках:
      handleOnActive() - запускать в дидмаунте страницы, только если задача не решена;
      handleOnIdle(); - запускать в функции проверки результата решения задачи, если задача решена полностью правильно ИЛИ при размаунте страницы/компонента

    * таким образом будем фиксировать время первого решения каждой задачи по id 

    3. в видео доп материалах:
      handleOnActive() - на play
      handleOnIdle() - на стоп или паузу, или при размонтировании компонента
  */
};

export default useIdleTimerHook;
