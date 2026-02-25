<template>
    <div class="aside-right">
        <Ticket/>
    </div>
</template>

<script>
import Ticket from './common/Ticket.vue'

export default {
   name: "AsideRight",

    components: {
        Ticket
    },

    data() {
        return {
            visible: false,
        }
    },

}
</script>

<style scoped>


</style>