import UButton from "~/ui/UButton.vue"

export default {
    title: "Controls/UButton",
    argTypes: {
        size: {
            type: 'select',
            options: ['xs', 'sm', '', 'lg', 'xl']
        },
        rounded: {
            type: 'select',
            options: ['full', '3xl', '2xl', 'xl', 'lg', '', 'sm', 'xs']
        },
        beforeIcon: {
            type: 'string'
        },
        afterIcon: {
            type: 'string'
        }
    },
    component: UButton,
}

export const Primary = {
    args: {
        label: "Test",
        size: "xl",
        color: 'cyan',
        fontWeight: 700
    },
}

export const Icon = {
    args: {
        label: "Test",
        size: "xl",
        color: 'cyan',
        afterIcon: 'PlusIcon',
        iconStyle: 'solid',
        minWidth: 300
    },
}