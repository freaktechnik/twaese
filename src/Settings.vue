<template>
    <sui-form-fields :inline="false" grouped>
        <h2 is="sui-header">Options</h2>
        <sui-form-field>
            <label>Replacement type</label>
            <sui-button-group>
                <sui-button type="button" v-for="modeName in modes" toggle :active="mode === modeName" :key="modeName" :value="modes[modeName]" @click="setMode">{{ modeName }}</sui-button>
            </sui-button-group>
        </sui-form-field>
        <sui-form-field v-if="mode === modes.CUSTOM">
            <label>Replace with</label>
            <sui-input placeholder="Custom replacement" :value="customReplacement" @input.native="setReplacement" :required="mode === modes.CUSTOM" min-length="1"></sui-input>
        </sui-form-field>
        <sui-form-field>
            <label>Replacement probability</label>
            <input type="range" min="0" max="100" step="1" :value="percentage" @input="setProbability">
            <sui-label>{{ percentage }}%</sui-label>
        </sui-form-field>
        <sui-form-field>
            <label>Replace</label>
            <sui-button-group>
                <sui-button type="button" toggle :active="replaceWords" @click="setReplaceWords">Words</sui-button>
                <sui-button-or></sui-button-or>
                <sui-button type="button" toggle :active="!replaceWords" @click="setReplaceLetters">Letters</sui-button>
            </sui-button-group>
        </sui-form-field>
        <sui-form-field>
            <sui-checkbox label="Fill words" :input-value="actuallyFillWords" :disabled="!canFillWords" @input="setFillWords"></sui-checkbox>
        </sui-form-field>
    </sui-form-fields>
</template>

<script>
import modes from './constants/modes';

export default {
    name: 'Settings',
    props: {
        replaceWords: {
            type: Boolean,
            default: true
        },
        probability: {
            type: Number,
            default: 0.2,
            validator: (v) => v >= 0 && v <= 1
        },
        mode: {
            type: String,
            default: modes.HOLES,
            validator: (v) => Object.values(modes).includes(v)
        },
        customReplacement: {
            type: String,
            default: ''
        },
        fillWords: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            modes
        };
    },
    computed: {
        percentage() {
            return Math.floor(this.probability * 100);
        },
        canFillWords() {
            return this.mode !== modes.CENSOR && this.replaceWords;
        },
        actuallyFillWords() {
            return (this.mode === modes.CENSOR || this.fillWords) && this.replaceWords;
        }
    },
    methods: {
        setMode(e) {
            this.update({
                mode: e.target.value
            });
        },
        setReplacement(e) {
            this.update({
                customReplacement: e.target.value
            });
        },
        setFillWords(e) {
            this.update({
                fillWords: e.target.checked
            });
        },
        setProbability(e) {
            this.update({
                probability: e.target.valueAsNumber / 100
            });
        },
        setReplaceWords() {
            this.update({
                replaceWords: true
            });
        },
        setReplaceLetters() {
            this.update({
                replaceWords: false
            });
        },
        update(change) {
            this.$emit("update", Object.assign({
                replaceWords: this.replaceWords,
                probability: this.probability,
                fillWords: this.fillWords,
                customReplacement: this.customReplacement,
                mode: this.mode
            }, change));
        }
    }
};
</script>
