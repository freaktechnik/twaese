<template>
    <sui-modal
        @changed="hideModal"
        :open="open"
    >
        <sui-modal-header>Help</sui-modal-header>
        <sui-modal-content>
            <p>This site is redundant. Just so you know it.</p>
            <p><strong><sui-icon name="exclamation triangle" />Danger:</strong> the tweets generated by this site may not appeal to your twitter followers!</p>
            <p>This website removes or replaces randomly chosen words or letters in your text. After clicking "Cheese!" you'll get a preview and with the "Tweet!" button you can tweet the message. Only after explicitly posting the tweet to Twitter with a twitter sharing page it potentially appears in your follower's timelines.</p>
            <p>If you're not happy with the result, you can re-run the generator by clicking "Try again". You can adjust your text and the settings.</p>
            <p>The generator also works for texts longer than a tweet, it will just not be tweetable afterward.</p>
            <p>"Twäse" is an amalgamation of "Tweet" and the German word for cheese, "Käse", since this word punches holes into your text.</p>
            <p>Source code is available on <a href="https://github.com/freaktechnik/twaese">GitHub</a> and is licensed under the MIT.</p>
            <p>© 2018 by Martin Giger.</p>
        </sui-modal-content>
        <sui-modal-actions>
            <sui-button
                positive
                @click="hideModal"
            >
                Close
            </sui-button>
        </sui-modal-actions>
    </sui-modal>
</template>

<script>

export default {
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideModal() {
            if(this.open) {
                this.$emit("hide");
            }
        }
    }
};
</script>
