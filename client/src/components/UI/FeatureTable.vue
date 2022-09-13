
<template>
    <div>
        <table>
            <tr v-for="a in entries" :key="a[0]">
                <td>
                    {{  a[0]  }}
                </td>
                <td>
                    {{  a[1]  }}
                </td>
                <td>
                    <a v-if="roll">
                        {{  "Roll"  }}
                    </a>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { entries } from '../../fx';

export default {
    name: 'FeatureTable',

    data() {
        return {

        };
    },
    props: {
        entries: Array,
        roll: Boolean
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style scoped>

</style>