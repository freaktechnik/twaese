import replacements from './constants/replacements';
import modes from './constants/modes';

const START = 0,
    NEXT = 1,
    NO_RESULT = -1,

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + NEXT)) + min;
    },

    getReplacement = (mode, customReplacement) => {
        if(mode === modes.CUSTOM) {
            return customReplacement;
        }
        const replacementOptions = replacements[mode];
        if(!Array.isArray(replacementOptions)) {
            return replacementOptions;
        }
        return replacementOptions[getRandomInt(START, replacementOptions.length - NEXT)];
    };

export default ({
    text,
    replaceWords,
    probability,
    mode,
    customReplacement,
    fillWords
}) => {
    const splitChar = replaceWords ? ' ' : '',
        split = text.split(splitChar),
        replaced = split.map((part) => {
            if(part.search(/^\s/) === NO_RESULT && Math.random() < probability) {
                if(replaceWords && (fillWords || mode === modes.CENSOR)) {
                    return part
                        .split('')
                        .map(() => getReplacement(mode, customReplacement))
                        .join('');
                }
                return getReplacement(mode, customReplacement);
            }
            //TODO handle new lines between two words
            return part;
        });

    return replaced.join(splitChar);
};
