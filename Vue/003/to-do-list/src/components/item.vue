<template>
	<div 
	class="Item" 
	:style="{backgroundColor:bgColor}" 
	@mouseenter="handleShow(true)"
	@mouseleave="handleShow(false)"
	>
		<input type="checkbox" v-model="todo.done">
	    <span>{{todo.task}}</span>
	    <button v-if="isShow">删除</button>
	</div>
</template>

<script>
    export default {
        name:'item',
        props:{
        	todo:Object,
        	index:Number,
        },
        data(){
            return {
                bgColor:'#fff',
                isShow:false
            }
        },
        methods:{
        	handleShow(bool){
        		this.bgColor = bool ? '#ff6700' : ''
        		this.isShow = bool
        	}
        }
    }
</script>

<style scoped>
    .Item{
        width: 100%;
        line-height: 40px;
        border: 1px dashed #ccc;
        margin-top: 10px;
    }
    input{
        float: left;
        margin-top: 14px;
        vertical-align: top;
    }
    button{
        float: right;
        margin-top: 14px;
        vertical-align: top;
    }
</style>