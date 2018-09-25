<template>
    <blockquote is="sui-segment" raised>
        <slot></slot>
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
}
</style>
