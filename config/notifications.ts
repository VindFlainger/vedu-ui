export default {
    DELETE_LESSON_REQUEST: {
        title: (v: string) => `Delete «${v}» ?`,
        message: `This will make this material inaccessible to students and it will be impossible to restore it.`
    }
}