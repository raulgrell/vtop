<template>
    <div class="character-sheet">
        <FormulateForm
            v-model="unit"
            :schema="schema" />
    </div>
</template>

<script>
export default {
    name: 'CharacterSheet',

    data() {
        return {
            data() {
                return {
                    unitData: this.unit
                } 
            },
            props: {
                unit: Object
            },
            schema: [
                {
                    type: 'submit',
                    label: 'Submit'
                }
            ]
        };
    },

    mounted() {

    },

    methods: {

    },
};
</script>

<style scoped>
</style>