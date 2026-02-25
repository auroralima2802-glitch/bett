<template>

    <div class="aside-left">
       <Menu/>
    </div>

</template>

<script>
import Menu from './common/Menu.vue'

export default {
   name: "AsideLeft",

   components: {
        Menu
   },

    data() {
        return {
            visible: false,
        }
    },

}
</script>

<style>

</style>