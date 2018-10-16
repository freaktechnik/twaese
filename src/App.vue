<template>
    <main
        id="app"
        is="sui-grid"
        centered
        vertical-align="middle">
        <div class="column">
            <sui-segment class="left aligned">
                <twaese-header hashtag="twäse"/>
                <sui-form
                    v-if="!generated"
                    @submit.prevent="generate">
                    <twaese-input
                        :max-length="maxLength"
                        label="Your text:"
                        :value="text"
                        @change="setText"/>
                    <settings
                        v-if="settingsVisible"
                        :replace-words="settings.replaceWords"
                        :probability="settings.probability"
                        :mode="settings.mode"
                        :custom-replacement="settings.customReplacement"
                        :fill-words="settings.fillWords"
                        @update="updateSettings"/>
                    <toolbar
                        :settings-visible="settingsVisible"
                        @toggle="toggleSettings"
                        @help="showHelp"
                        @clear="clear"/>
                    <sui-button
                        primary
                        size="massive"
                        fluid
                        type="submit">Cheese!</sui-button>
                </sui-form>
                <section v-else>
                    <sui-button
                        icon="undo"
                        @click="back">Try again</sui-button>
                    <result-panel :text="modifiedText"/>
                </section>
            </sui-segment>
            <help
                @hide="hideHelp"
                :open="modal"/>
        </div>
    </main>
</template>

<script>
import modes from './constants/modes';
import Header from './Header.vue';
import Input from './Input.vue';
import Settings from './Settings.vue';
import Toolbar from './Toolbar.vue';
import ResultPanel from './ResultPanel.vue';
import Help from './Help.vue';
import processText from './process-text';
import twitter from 'twitter-text';

export default {
    name: 'App',
    components: {
        "twaese-header": Header,
        "twaese-input": Input,
        settings: Settings,
        toolbar: Toolbar,
        "result-panel": ResultPanel,
        help: Help
    },
    data() {
        return {
            generated: false,
            text: '',
            modifiedText: '',
            settings: {
                replaceWords: false,
                probability: 0.2,
                mode: modes.HOLES,
                customReplacement: '',
                fillWords: false
            },
            maxLength: twitter.configs.defaults.maxWeightedTweetLength,
            showSettings: false,
            modal: false
        };
    },
    computed: {
        settingsVisible() {
            return !this.generated && this.showSettings;
        },
        canTweet() {
            return this.modifiedText.length <= this.maxLength;
        },
        tweetUrl() {
            return `https://twitter.com/intent/tweet?hashtags=twäse&text=${encodeURIComponent(this.modifiedText)}`;
        }
    },
    methods: {
        setText(text) {
            this.text = text;
        },
        updateSettings(settings) {
            this.settings = settings;
        },
        toggleSettings() {
            this.showSettings = !this.showSettings;
        },
        generate() {
            this.modifiedText = processText({
                text: this.text,
                replaceWords: this.settings.replaceWords,
                probability: this.settings.probability,
                mode: this.settings.mode,
                customReplacement: this.settings.customReplacement,
                fillWords: this.settings.fillWords
            });
            this.generated = true;
        },
        back() {
            this.generated = false;
            this.modifiedText = '';
        },
        showHelp() {
            this.modal = true;
        },
        hideHelp() {
            if(this.modal) {
                this.modal = false;
            }
        },
        clear() {
            this.text = '';
            this.modifiedText = '';
        }
    }
};
</script>

<style scoped>
main {
    height: 100%;
}

main > .column {
    max-width: 450px;
}
</style>
<style>
@viewport {
    min-width: device-width;
    zoom: 100%;
}
</style>
