<template>
    <blockquote
        is="sui-segment"
        raised
    >
        <slot />
    </blockquote>
</template>

<script>
export default {
    name: 'TwaeseResult'
};
</script>

<style scoped>
blockquote {
    word-wrap: break-word;
    hyphens: auto;
    white-space: pre-wrap;
}
</style>
