<template>
    <sui-form-field>
        <sui-button-group>
            <sui-button
                type="button"
                :toggle="settingsVisible"
                @click="toggleSettings"
                :icon="settingsIcon">{{ settingsLabel }}</sui-button>
            <sui-button
                type="button"
                icon="trash"
                @click="clear"/>
            <sui-button
                type="button"
                icon="question circle"
                @click="showHelp"/>
        </sui-button-group>
    </sui-form-field>
</template>

<script>
export default {
    name: 'Toolbar',
    props: {
        settingsVisible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        settingsLabel() {
            if(this.settingsVisible) {
                return "Hide options";
            }
            return "Show options";
        },
        settingsIcon() {
            if(this.settingsVisible) {
                return "angle up";
            }
            return "angle down";
        }
    },
    methods: {
        toggleSettings() {
            this.$emit("toggle");
        },
        showHelp() {
            this.$emit("help");
        },
        clear() {
            this.$emit("clear");
        }
    }
};
</script>
