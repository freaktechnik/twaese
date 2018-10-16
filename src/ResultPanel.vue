<template>
    <div>
        <result ref="result">{{ text }}</result>
        <sui-grid class="equal width">
            <sui-grid-row>
                <sui-grid-column>
                    <a
                        :href="tweetUrl"
                        is="sui-button"
                        :disabled="!canTweet"
                        social="twitter"
                        icon="twitter"
                        size="massive"
                        primary
                        fluid>Tweet!</a>
                </sui-grid-column>
                <sui-grid-column width="1">
                    <sui-button
                        icon="clipboard"
                        size="massive"
                        title="Copy to clipboard"
                        @click="copy"/>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
    </div>
</template>
<script>
import Result from './Result.vue';
import twitter from 'twitter-text';

export default {
    name: 'ResultPanel',
    components: {
        "result": Result
    },
    props: {
        text: {
            type: String,
            required: true
        }
    },
    computed: {
        canTweet() {
            const parsedTweet = twitter.parseTweet(this.text);
            return parsedTweet.valid;
        },
        tweetUrl() {
            return `https://twitter.com/intent/tweet?hashtags=twäse&text=${encodeURIComponent(this.text)}`;
        }
    },
    methods: {
        copy() {
            if("clipboard" in navigator && "writeText" in navigator.clipboard) {
                navigator.clipboard.writeText(this.text);
            }
            else {
                const selection = document.getSelection();
                selection.selectAllChildren(this.$refs.result.$el);
                document.execCommand("copy");
            }
        }
    }
};
</script>
<style scoped>
.ui.grid > .row > .column {
    width: auto;
}
</style>
