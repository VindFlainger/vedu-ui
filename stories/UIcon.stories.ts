import UIcon from '~/ui/UIcon.vue'

export default {
    title: 'Design/Icon',
    argTypes: {
        value: {
            type: 'text',
        },
       solid: {
            type: 'boolean'
       }
    },
    component: UIcon,
}

export const Primary = {
    args: {
        value: 'PlusIcon',
        solid: true
    },
}