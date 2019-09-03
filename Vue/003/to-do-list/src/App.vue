<template>
  <div id="app">
    <!-- 3、使用组件 -->
    <Header />
    <List :todos="todos" />
  </div>
</template>

<script>
	// 1、引入组件
	import Header from './components/Header.vue'
	import List from './components/List.vue'
	// 2、注册组件
	export default {
		name:'App',
		components:{
            Header,
            List,
        },
        data:function() {
        	return {
        		todos:[
        			{
        				task:'吃饭',
                        done:true
        			},
        			{
        				task:'睡觉',
                        done:false
        			}
        		]
        	}
        }
	}
</script>

<style>
	#app{
        width: 600px;
        margin: 100px auto;
    }
</style>
