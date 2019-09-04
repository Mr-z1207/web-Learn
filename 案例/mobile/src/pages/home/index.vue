<template>
    <div class="Home">
        <p>home page</p>
        <p>sss</p>
        <p v-for="todo in this.$store.state.home.todos">{{todo.task}}</p>
    </div>
</template>

<script>
    export default {
        name:'Home',       
    }
</script>

<style>
  
</style>