import {NuxtApp} from "#app";
import {DateTime} from "luxon";

export interface Plugins extends NuxtApp {
    $luxon: DateTime
}