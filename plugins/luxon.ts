import {DateTime, Settings} from "luxon";
import dateFormats from "~/config/dateFormats";

Settings.defaultLocale = 'ru-RU'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            luxon: DateTime,
            dateFormats: dateFormats
        },
    }
})

