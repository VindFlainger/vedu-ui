<template>
    <component :is="tag">
        <svg
            v-if="value.startsWith('mdi')"
            :style="styles"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke-width="1"
            :class="svgClass"
        >
            <path :d="mdijs[value]" />
        </svg>
        <component v-else :is="solid ? Solid[value + 'Icon'] : Outline[value + 'Icon']" :style="styles" />
    </component>
</template>

<script setup lang="ts">
import * as Solid from '@heroicons/vue/24/solid';
import * as Outline from '@heroicons/vue/24/outline';
import * as mdijs from '@mdi/js';

import { parseColor } from '~/ui/utils/parsers';

export interface Props {
    value: string;
    solid?: boolean;
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    tag?: string;
    svgClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
    size: 24,
    color: '#000000',
    tag: 'span',
    value: 'InformationCircle',
});

const color = computed<string>(() => parseColor(props.color));

const styles = computed(() => ({
    width: `${props.size}px`,
    height: `${props.size}px`,
    color: `${color.value}`,
    strokeWidth: props.strokeWidth,
}));
</script>
