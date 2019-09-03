<template>
    <div class="List">
        <Item 
            v-for="(todo,index) in todos" 
            :todo='todo'
            :index='index'
        />
    </div>
</template>

<script>
    import Item from './item.vue'
    // 2、注册组件
    export default {
        name:'List',
        components:{
            Item,
        },
        props:{
            todos:Array
        }
    }
</script>

<style scoped>
    
</style>