<template>

</template>



<script>
import ichooarouter from "../../../router"
	export default{
		
		//详情页面刷新
		created(){
			var id1=this.$route.params.id;
			ichooarouter.push('/operation/addope/'+id1)
		}

	}
</script>