// @ts-ignore
import {DateTime} from "luxon";
import dateFormats from "~/config/dateFormats";


export default defineNuxtPlugin(() => {
    return {
        provide: {
            luxon: DateTime,
            dateFormats: dateFormats
        },
    }
})

