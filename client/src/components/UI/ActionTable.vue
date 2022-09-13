<template>
    <div>
        <table>
            <tr v-for="a in entries" :key="a.name">
                <td>{{  a.name  }}</td>
                <td>
                    <table>
                        <tr v-for="e, i in a.effects">
                            <td>{{  e.type  }}</td>
                            <td><a>{{  e.effect ? e.effect.roll : "Roll"  }}</a></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'ActionTable',

    data() {
        return {

        };
    },

    props: {
        entries: Array,
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style scoped>
</style>