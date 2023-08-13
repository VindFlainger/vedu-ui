import { parseColor } from "~/ui/utils/parsers";
import { MaybeRefOrGetter } from "@vue/reactivity";

export function useColor(_color: MaybeRefOrGetter) {
    const color = ref<string>('#000000')

    watchEffect(() => color.value = parseColor(toValue(_color)))

    return { color }
}