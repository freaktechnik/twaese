<template>
    <main id="app" is="sui-grid" centered verticalAlign="middle">
        <div class="column">
            <sui-segment class="left aligned">
                <twaese-header hashtag="twäse"></twaese-header>
                <sui-form v-if="!generated" @submit.prevent="generate">
                    <twaese-input :max-length="maxLength" label="Your text:" :value="text" @change="setText"></twaese-input>
                    <settings v-if="settingsVisible" :replace-words="settings.replaceWords" :probability="settings.probability" :mode="settings.mode" :custom-replacement="settings.customReplacement" :fill-words="settings.fillWords" @update="updateSettings"></settings>
                    <toolbar :settings-visible="settingsVisible" @toggle="toggleSettings" @help="showHelp" @clear="clear"></toolbar>
                    <sui-button primary size="massive" fluid type="submit">Cheese!</sui-button>
                </sui-form>
                <section v-else>
                    <sui-button icon="undo" @click="back">Try again</sui-button>
                    <result>{{ modifiedText }}</result>
                    <a :href="tweetUrl" is="sui-button" :disabled="!canTweet" social="twitter" icon="twitter" size="massive" primary fluid @click="tweet">Tweet!</a>
                </section>
            </sui-segment>
            <help @hide="hideHelp" :open="modal"></help>
        </div>
    </main>
</template>

<script>
import modes from './constants/modes';
import Header from './Header.vue';
import Input from './Input.vue';
import Settings from './Settings.vue';
import Toolbar from './Toolbar.vue';
import Result from './Result.vue';
import Help from './Help.vue';
import processText from './process-text';

export default {
    name: 'app',
    components: {
        "twaese-header": Header,
        "twaese-input": Input,
        settings: Settings,
        toolbar: Toolbar,
        result: Result,
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
            maxLength: 240,
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
        generate(e) {
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

.column {
    max-width: 450px;
}
</style>
<style>
@viewport {
    min-width: device-width;
    zoom: 100%;
}
</style>
