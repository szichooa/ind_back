
<template>
	
</template>


<style lang="scss" scoped>
	
</style>

<script>
import ichooarouter from "../../../router"
	export default{
		created(){
			var id1=this.$route.params.id;
			ichooarouter.push('/model/addmodel/'+id1);
		}
	}
</script>
