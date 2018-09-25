<template>
    <sui-form-field>
        <label>{{ label }}</label>
        <sui-label attached="top right" :color="labelColor">{{ remaining }}</sui-label>
        <textarea @input="setValue" required :value="value" placeholder="Your cheesy text goes here..."></textarea>
    </sui-form-field>
</template>

<script>
//TODO use twitter-text for length calc?
export default {
    name: 'Input',
    props: {
        maxLength: {
            type: Number,
            default: 280,
            validator: (v) => v > 0
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
            return this.maxLength - this.value.length;
        },
        labelColor() {
            if(this.remaining < 0) {
                return "red";
            }
        }
    },
    methods: {
        setValue(e) {
            this.$emit("change", e.target.value);
        }
    }
};
</script>

<style scoped>
.label-container {
    position: relative;
}
</style>
