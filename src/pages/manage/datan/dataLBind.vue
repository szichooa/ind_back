
<template>
	<div class="content-views">
		<div class="content-views-nav">
			<p class="title-view">数据参数信息</p>
			<div class="mbanav-r">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/data' }">本地数据库</el-breadcrumb-item>
					<el-breadcrumb-item>数据参数信息</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="content-views-body">
			<h3 class="fun-name">
				数据库名称：{{dataBaseName}}
			</h3>
			<el-form :model="dataRelationList" class="content-views-body-cont" size="small">
				<div class="input-data">
					<h4>参数列表</h4>
					<el-form-item v-for="itemI,indexI in dataRelationList.inputData" :key="itemI.id" style="position:relative;" label-width="160px" :label="'参数'+(indexI+1)+'名称'">
						<el-input v-model="itemI.dbAttr" placeholder="参数名字（表头）" :inline="true" class="data-input-value"></el-input>
						<el-button type="text" @click="delItemI(indexI)" class="delete-btn" icon="el-icon-delete" style="position:absolute;right:70px;"></el-button>
					</el-form-item>
					<el-button @click="addInputData()" type="text" size="mini" icon="el-icon-circle-plus-outline" class="input-btn" style="position:absolute;right:15px;top:10px;font-size:18px;"></el-button>
				</div>
			</el-form>
			
			<div class="content-views-body-btn">
				<el-button @click="addInputData()" type="primary" size="small" class="input-btn" icon="el-icon-circle-plus-outline" style="position:absolute;right:50%;top:30px;margin-right:-49px;">添加数据</el-button>
				<el-button @click="editDataRelation()" type="primary" size="small">保存</el-button>
				<el-button @click="backData()" type="danger" size="small">返回</el-button>
			</div>			
		</div>
	</div>
</template>


<style lang="scss" scoped>
	.content-views {
		display:flex;
		flex-direction: column;
		height: 100%;
		font-size: 14px;
		.content-views-nav{
			border-bottom: 1px solid #909290;
			flex:0 0 20px;
			line-height:20px;
			padding: 10px 15px 0;
			font-size: 12px;
			min-width:990px;
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
			padding:0 10px 0;
			flex:1;
			height:100%;
			display: flex;
			flex-direction: column;
			min-width:1000px;
			background: #fff;
			overflow: hidden;
			.fun-name{
				height:70px;
				line-height:60px;
				flex:0 0 70px;
				text-indent: 20px;
			}
			.content-views-body-cont{
				flex:1;
				height:100%;
				padding: 0px 20px 0;
				position: relative;
				display: flex;
				justify-content: space-around;
				overflow: hidden;
				.input-data{
					box-sizing: border-box;
					flex:1;
					height:100%;
					margin:0 20px;
					max-width:500px;
					border:1px solid #ccc;
					border-radius: 5px;
					padding:0 40px 0px;
					position: relative;
					overflow-y: auto;
					overflow-x:hidden;
					h4{
						height:70px;
						line-height: 70px;
						margin-left: -10px;
					}
					.data-input-value{
						width:150px;
					}
				}
			}
			.content-views-body-btn{
				overflow: hidden;
				text-align: right;
				padding: 0 50px;
				flex:0 0 140px;
				line-height: 200px;
				position: relative;
			}
		}
	}
	
</style>

<script>
import axios from "axios"
import {addDataBindLocal,getDataBindLocal } from '../../../api/api';
	export default{
		data() {
			return {
				dataRelationList:{
					inputData:[{
						id:Date.now(),
						dbAttr:''
					}],
					resultData:[]
				},
				useFncName:'函数名字',
				dataBaseName:'数据库名字'
			};
		},
		mounted(){
			this.dataBaseName=window.sessionStorage.dataBaseName
			getDataBindLocal(window.sessionStorage.ApiUrl,{
				'token':window.localStorage.adminToken,
				'db_id':this.$route.params.id
			}).then(res=>{
				if(res.data.status==200){
					if(res.data.data.length>0){
						this.dataRelationList.inputData=res.data.data.reverse()
					}else{
						this.dataRelationList={
							inputData:[{
								id:Date.now(),
								dbAttr:''
							}],
							resultData:[]
						}
					}
				}else if(res.data.status == 201){
					this.$message({
						type: 'info',
						message: 'token失效，为保障账户安全，请重新登陆'
					});						 
					window.localStorage.clear()
					window.window.sessionStorage.setItem('isLogin','0')
					this.$router.push('/login'); 
				}else{
					this.$message({
						type: 'info',
						message: '加载失败!'
					});	
				}
			}).catch()
		},
		methods:{
			delItemI(indexI){
				this.dataRelationList.inputData.splice(indexI,1)
			},
			addInputData(){
				this.dataRelationList.inputData.push({
					id:Date.now(),
					dbAttr:''
				})
			},
			editDataRelation(){
				var params = new URLSearchParams();
				params.append('token',window.localStorage.adminToken);
				params.append('para_json',JSON.stringify(this.dataRelationList.inputData));
				params.append('db_id',this.$route.params.id);
				addDataBindLocal(window.sessionStorage.ApiUrl,params).then(res=>{
					if(res.data.status==200){
						this.$message({
							type: 'success',
							message: '保存成功!'
						});	
						this.$router.push('/datal')
					}else if(res.data.status == 201){
						this.$message({
							type: 'info',
							message: 'token失效，为保障账户安全，请重新登陆'
						});						 
						window.localStorage.clear()
						window.window.sessionStorage.setItem('isLogin','0')
						this.$router.push('/login'); 
					}else{
						this.$message({
							type: 'info',
							message: '加载失败!'
						});	
					}
				}).catch()
			},
			backData(){
				this.$router.push('/datal')
			}
		}
	}
</script>
