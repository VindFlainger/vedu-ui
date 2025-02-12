import { colors } from './defaults'
import { rounded } from './defaults'

export const parseColor = (color: string) => {
    if (color && color.includes('#')) {
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

export const adjustBrightness = (hex: string, amount: number) => {
    if (/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(hex) ) {
        hex = hex.replace(/^#/, '');

        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }

        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        r = Math.min(255, Math.max(0, r + amount));
        g = Math.min(255, Math.max(0, g + amount));
        b = Math.min(255, Math.max(0, b + amount));

        const newHex = '#' + [r, g, b].map(component => {
            const hexComponent = component.toString(16);
            return hexComponent.length === 1 ? '0' + hexComponent : hexComponent;
        }).join('');

        return newHex;
    }
    return hex
}

