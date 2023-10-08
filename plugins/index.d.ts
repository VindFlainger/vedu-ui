import {NuxtApp} from "#app";
import {DateTime} from "luxon";
import api from "~/api/index";

export interface Plugins extends NuxtApp {
    $luxon: DateTime,
}