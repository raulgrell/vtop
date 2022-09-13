

<template>
    <div>
        <div v-for="a in entries" :key="a.name">
            <div>{{  a.name  }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EffectTable',

    data() {
        return {

        };
    },

    props: {
        entries: Array
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style scoped>
</style>