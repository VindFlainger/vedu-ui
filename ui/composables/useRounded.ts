import { parseRounded } from "~/ui/utils/parsers";
import { MaybeRefOrGetter } from "@vue/reactivity";

export function useRounded(_rounded: MaybeRefOrGetter) {
    const rounded = ref<string>('#000000')

    watchEffect(() => rounded.value = parseRounded(toValue(_rounded)))

    return { rounded }
}