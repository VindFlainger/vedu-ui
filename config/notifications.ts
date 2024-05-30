export default {
    DELETE_LESSON_REQUEST: {
        title: (v: string) => `Удалить урок «${v}» ?`,
        message: `Это сделает данный урок недоступным для учащихся, и восстановить его будет невозможно.`
    }
}