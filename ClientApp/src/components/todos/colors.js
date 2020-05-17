export const colorNames = [
    'none',
    'blue',
    'red',
    'orange',
    'purple',
    'green',
]

export const colorValues = {
    'none': null,
    'blue': '#496ddb',
    'red': '#ff6656',
    'orange': '#ee8434',
    'purple': '#6e44ff',
    'green': '#55d6be',
};

export function getColorName(colorType = 0) {
    return colorNames[colorType];
}

export function getColor(colorType = 0) {
    const name = getColorName(colorType);

    return colorValues[name];
}