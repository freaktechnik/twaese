<template>
    <sui-form-field>
        <label>{{ label }}</label>
        <sui-label
            attached="top right"
            :color="labelColor"
        >
            {{ remaining }}
        </sui-label>
        <textarea
            @input="setValue"
            required
            :value="value"
            placeholder="Your cheesy text goes here..."
        />
    </sui-form-field>
</template>

<script>
import twitter from 'twitter-text';

const EMPTY = 0;

export default {
    name: 'Input',
    props: {
        maxLength: {
            type: Number,
            default: twitter.configs.defaults.maxWeightedTweetLength,
            validator: (v) => v > EMPTY
        },
        label: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        remaining() {
            const parsedTweet = twitter.parseTweet(this.value);
            return this.maxLength - parsedTweet.weightedLength;
        },
        labelColor() {
            if(this.remaining < EMPTY) {
                return "red";
            }
            return '';
        }
    },
    methods: {
        setValue(event) {
            this.$emit("change", event.target.value);
        }
    }
};
</script>

<style scoped>
.label-container {
    position: relative;
}

textarea {
    hyphens: auto;
}
</style>
