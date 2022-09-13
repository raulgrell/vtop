<template>
    <div class="flex justify-end">
        <div v-if="event.data.type == 'roll'" class="event-box">
            <div class="is-pulled-left">{{  event.user_data.name  }} - Rolling {{ event.data.dice }}</div>
            <div>{{  event.data.result.total  }}</div>
            <div>{{  event.data.result.renderedExpression  }}</div>
        </div>
        <div v-else-if="event.data.type == 'roll'" class="event-box">
        </div>
        <div v-else-if="event.data.type == 'roll'" class="event-box">
        </div>
        <div v-else-if="event.data.type == 'roll'" class="event-box">
        </div>
        <div v-else>
            {{  JSON.stringify(event)  }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'EventBox',

    data() {
        return {

        };
    },
    props: {
        event: Object
    },

    mounted() {

    },

    methods: {
    },
};
</script>

<style scoped>


.event-box {
    width: 256px;
    border: 1px solid black;
    margin: 0.5em;
}
</style>