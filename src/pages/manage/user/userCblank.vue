<template>
</template>

<script>
import ichooarouter from "../../../router"
	export default{
		created(){
			var id1=this.$route.params.id;
			ichooarouter.push('/users/createuser/'+id1);
		}
	}
</script>

<style>
</style>