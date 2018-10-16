<template>
    <blockquote
        is="sui-segment"
        raised>
        <slot/>
    </blockquote>
</template>

<script>
export default {
    name: 'Result'
};
</script>

<style scoped>
blockquote {
    word-wrap: break-word;
    hyphens: auto;
    white-space: pre-wrap;
}
</style>
