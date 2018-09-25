import replacements from './constants/replacements';
import modes from './constants/modes';

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getReplacement = (mode, customReplacement) => {
    if(mode === modes.CUSTOM) {
        return customReplacement;
    }
    const replacementOptions = replacements[mode];
    if(!Array.isArray(replacementOptions)) {
        return replacementOptions;
    }
    return replacementOptions[getRandomInt(0, replacementOptions.length)];
};

export default ({
    text,
    replaceWords,
    probability,
    mode,
    customReplacement,
    fillWords
}) => {
    const splitChar = replaceWords ? ' ' : '';
    const split = text.split(splitChar);

    const replaced = split.map((part) => {
        if(Math.random() < probability) {
            if(replaceWords && (fillWords || mode === modes.CENSOR)) {
                return part.split('').map(() => getReplacement(mode, customReplacement)).join('');
            }
            return getReplacement(mode, customReplacement);
        }
        return part;
    });

    return replaced.join(splitChar);
};
