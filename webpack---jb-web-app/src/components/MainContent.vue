<template>
    <div class="main">
        <router-view/>
   </div>
</template>

<script>


export default {
    name: "MainContent",

    data:() => ({
    }),

}
</script>

<style scoped>

.btn-ticket  {
    display: none !important;
}

.badge {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 50%;
    color: white;
    background-color: red;
    top: 0;
    right: 0;
    height: 18px;
    width: 18px;
    padding: 3px;
    font-size: 12px;
    font-weight: bold;
}


@media screen and (max-width: 800px) {
    .main {
        padding-bottom: 50px;
    }

    .btn-ticket  {
        display: flex !important;
        overflow: visible;
        z-index: 999 ;
        position: fixed ;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        right: 0 ;
        bottom: 60px ;
        height: 50px !important;
        width: 50px !important;
        margin: 15px;
        background-color: var(--app-primary-color) !important;
    }

    .btn-ticket > i, .counter {
        font-size: 18px;
        font-weight: bold;
    }
   
}

</style>