<template>
    <div id="app">
         <router-link to="/home">Go to home</router-link>
        <router-view></router-view>
    </div>
</template>

<script>

</script>

<style lang="less">
    #app {
        p{
            color:red;
            .rem(padding,10px);
        }
    }
</style>
