import { colors } from './defaults'
import { rounded } from './defaults'

export const parseColor = (color: string) => {
    if (color.includes('#')) {
        return color
    } else {
        if (/^[a-z]+-\d{2,3}$/.test(color)) {
            const level = Number.parseInt(color.substr(color.indexOf('-') + 1))
            const _color = color.substr(0, color.indexOf('-'))
            return colors?.[_color]?.[level] ?? colors.primary[700]
        } else if (/^[a-z]+$/.test(color)) {
            return colors?.[color] ?? colors.primary[700]
        } else return colors.primary[700]
    }
}

export const parseRounded = (round: string) => {
    return rounded[round] || rounded['md']
}
