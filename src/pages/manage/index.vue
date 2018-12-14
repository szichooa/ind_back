<template>
	<div class="content-views">
		<div class="content-views-nav">
			<p class="title-view">首页</p>
			<div class="mbanav-r">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>首页</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="content-views-body">
			<div class="welcome">
				<p>您好，{{loginName}}！</p>
				<p>欢迎您使用&nbsp;风机主轴系统设计软件</p>
			</div>
			
		</div>
	</div>
</template>

<script>
		export default {
			data(){
				return {
					loginName:''
				}
			},
			created(){
				
				this.loginName=window.localStorage.getItem('adminName')
			}
		}
</script>

<style lang="scss" scoped>
	.content-views {
		display:flex;
		flex-direction: column;
		height: 100%;
		.content-views-nav{
			border-bottom: 1px solid #909290;
			flex:0 0 20px;
			line-height:20px;
			padding: 10px 15px 0;
			font-size: 12px;
			.title-view{
				float: left;
				padding-left: 10px;
				font-size: 14px;
				font-weight: 600;
			}
			.mbanav-r{
				float:right;
				.el-breadcrumb{
					height: 20px;
					line-height: 20px;
					font-size: 12px;
				}
			}	
		}
		.content-views-body{
			flex:1;
			background: #fff;
			position: relative;
			.welcome{
				position: absolute;
				width: 100%;
				top:50%;
				margin-top:-200px;
				height:200px;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				p{
					margin: auto;
					text-align: center;							
					font-size: 32px;			
				}
			}
			
		}
	}
	
</style>