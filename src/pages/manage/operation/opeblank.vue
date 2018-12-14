<template>
	
</template>


<style lang="scss" scoped>
	
</style>

<script>
	export default{
		created(){
			var id1=this.$route.params.id;
			this.$router.push('/operation');
		}
	}
</script>