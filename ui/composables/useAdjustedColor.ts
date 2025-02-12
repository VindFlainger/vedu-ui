import { MaybeRefOrGetter } from "@vue/reactivity";
import { adjustBrightness, parseColor } from "~/ui/utils/parsers";

export function useAdjustedColor(color: MaybeRefOrGetter, brightness: MaybeRefOrGetter = 30) {
    const _color = ref<string>('#000000')
    const adjustedColor = ref<string>('#000000')

    watchEffect(() => _color.value = parseColor(toValue(color)))
    watchEffect(() => adjustedColor.value = adjustBrightness(toValue(_color), brightness))

    return {
        color: _color,
        adjustedColor
    }
}