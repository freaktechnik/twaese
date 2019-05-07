<template>
    <header>
        <h1
            is="sui-header"
            text-align="center"
        >
            <img src="../40px-Cheese.png">
            <a :href="hashtagUrl">#{{ hashtag }}</a>
        </h1>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        hashtag: {
            type: String,
            required: true
        }
    },
    computed: {
        hashtagUrl() {
            return `https://twitter.com/hashtag/${encodeURIComponent(this.hashtag)}`;
        }
    }
};
</script>
