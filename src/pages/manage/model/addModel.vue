<template>
	<div class="content-views">
		<div class="content-views-nav">
			<p class="title-view">关联函数</p>
			<div class="mbanav-r">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/model' }">模块管理</el-breadcrumb-item>
					<el-breadcrumb-item>关联函数</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="content-views-body">
			<div class="content-views-body-name">
				<h4>模块基本信息</h4>
				<div class="content-views-body-name-l">
					<p>模块名字：{{modelName}}</p>
					<p>模块描述：<span>{{modelDes}}</span>
					</p>	
				</div>
			</div>
			<div class="content-views-body-fnc">
				<h4>函数基本信息</h4>
				<el-button type="primary" size="small" class="content-views-body-fnc-btn" @click="alertFnc=!alertFnc">添加模块关联函数</el-button>
				<p class="para-num">关联函数的个数：{{dynamicValidateForm.domains.length}}</p>
				<div class="content-views-body-fnc-cont">
					<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
						<div class="content-views-body-fnc-cont-para" v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key">
							<div class="fnc-para-head">
								<el-form-item label-width="0px" size="small">
									<div style="text-indent:2em;font-size:14px;font-weight:600;">函数名字：{{dynamicValidateForm.domains[index].funName}}</div>
								</el-form-item>								
							</div>
							<div class="fnc-para-cont">
								<div class="fnc-para-cont-d" v-for="para,indexP in showParaList[index]" v-if="para.functionId=dynamicValidateForm.domains[index].funId" :key="para.id">
									<p>{{para.parpameterName}}</p>
									<el-button @click="toEditPara(indexP,para)" type="text" size="small">编辑展示项</el-button>
									<img v-if="para.parpameterImg" src="">
								</div>
							</div>
							<el-button @click.prevent="removeDomain(domain)" type="text" size="mini" round icon="el-icon-delete" class="para-delete">								
							</el-button>
						</div>
						<el-form-item label-width="0px" style="text-align:right;padding-right:20px;">
							<el-button type="primary" @click="backModel" size="small">返回</el-button>
						</el-form-item>
					</el-form>
				</div>	
			</div>
			<div class="add-alert-fnc" v-if="alertFnc">
					<div class="fnc-para-head">
						<span style="font-size:14px;">请选择函数</span>
					  	<el-select v-model="addFncModId" placeholder="请选择函数" size="small" @change="handleFncChange2()" class="add-alert-fnc-select">
							<el-option :label="para.functionName" :value="para.id" v-for="para,index in fncList" :key="para.id"></el-option>
						</el-select>						
					</div>
					<div class="fnc-para-cont">
						<div class="fnc-para-cont-d" v-for="para,index in paraList" :key="para.id">
							<p>{{para.parpameterName}}</p>
							<img v-if="para.parpameterImg" src="">			
						</div>						
					</div>
					<el-button type="primary" @click="addFncMod()" size="mini" class="alert-cont-btn1">添加</el-button>
					<el-button @click="alertFnc=!alertFnc" size="mini" class="alert-cont-btn2">取消</el-button>
					
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import ichooarouter from "../../../router"
import {getModFncById,getFncParaListById,getAllFncList,delModFncById,insertModFncById} from '../../../api/api';
	export default{
		data() {
			return {
				adminToken:'',
				showParaListN:[],
				showParaFncID:[],
				showParaList:[],
				alertFnc:false,
				addFncModId:'',
				modelName:'',
				modelDes:'',
				selectedOptions:[],
				fncList:[],
				paraList:[],
				dynamicValidateForm: {
					domains: []
				}
			};
		},
		mounted(){
			if(window.localStorage.isAdminId=="2"){
				this.$router.push('/index')
			}
			this.adminToken=window.localStorage.getItem('adminToken')
			this.modelDes=window.sessionStorage.getItem('modelDes')
			this.modelName=window.sessionStorage.getItem('modelName')
			//通过模块id获取模块关联信息
			getModFncById(window.sessionStorage.ApiUrl,{
						token:this.adminToken,
						mod_id:this.$route.params.id
				}).then(res=>{
					if(res.data.status==200){
						this.dynamicValidateForm.domains=res.data.data;
						this.showParaFncID=res.data.data.map(value=>value.funId)
						var that=this;
						var showParaListN;
						var promiseAddParaList=function(i){
							let itemI=i
							return new Promise((resolve, reject)=>{
								//获取函数列表
								getFncParaListById(window.sessionStorage.ApiUrl,{
										token:that.adminToken,
										fun_id:itemI							
								}).then(res=>{	
									if(res.data.status==200){
										resolve(res.data.data)
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
										message: '获取参数列表失败!'
										});
									}				
								}).catch(err=>{
									reject(err)
								});
							})
						};
						let tasks = [];
						for(let i = 0; i< this.showParaFncID.length; i++){
							tasks.push(promiseAddParaList(this.showParaFncID[i]));
						}
						Promise.all(tasks).then(res=>{
							this.showParaList=res
						})
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
						message: '获取函数列表失败!'
						});
		          	}				
				}).catch();
				//直接获取所有函数列表
				getAllFncList(window.sessionStorage.ApiUrl,{
						token:this.adminToken
				}).then(res=>{
					if(res.data.status==200){
						this.fncList=res.data.data
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
						message: '获取函数列表失败!'
						});
		          	}				
				}).catch();				
		},
		methods:{
			handleFncChange(value) {
				getFncParaListById(window.sessionStorage.ApiUrl,{
						token:this.adminToken,
						fun_id:this.addFncModId
				}).then(res=>{
					if(res.data.status==200){
						this.paraList=res.data.data
		          	}else{
		          		this.$message({
						type: 'info',
						message: '获取参数列表失败!'
						});
		          	}				
				}).catch();
			},
			handleFncChange2(value) {
				getFncParaListById(window.sessionStorage.ApiUrl,{
						token:this.adminToken,
						fun_id:this.addFncModId
				}).then(res=>{
					if(res.data.status==200){
						this.paraList=res.data.data
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
						message: '获取参数列表失败!'
						});
		          	}
				
				}).catch();
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			removeDomain(item) {
				var index = this.dynamicValidateForm.domains.indexOf(item)
				var itemFncID=item.funId
				this.$confirm('此操作将永久删除该关联函数关系, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then((item) => {
					delModFncById(window.sessionStorage.ApiUrl,{
							token:this.adminToken,
							fun_id:itemFncID,
							mod_id:this.$route.params.id
					}).then(res=>{
						if(res.data.status==200){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							ichooarouter.push('/model/editmodpara/'+this.$route.params.id);
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
								message: '删除失败!'
							});
						}				
					}).catch(err=>{				
						this.$message({
							type: 'info',
							message: '删除失败!'
						})
					});
				}).catch(()=>{
					return false
				});
			},
			addFncMod() {
				insertModFncById(window.sessionStorage.ApiUrl,{
						token:this.adminToken,
						fun_id:this.addFncModId,
						mod_id:this.$route.params.id
				}).then(res=>{
					if(res.data.status==200){
						this.$message({
							type: 'success',
							message: '关联成功!'
						});
						ichooarouter.push('/model/editmodpara/'+this.$route.params.id);
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
							message: '关联失败!'
						});
		          	}				
				}).catch(err=>{				
					this.$message({
						type: 'info',
						message: '关联失败!'
					})
				});
			},
			backModel(){
				this.$router.push('/model')
			},
			toEditPara(indexP,value){
				window.sessionStorage.setItem('paraShowModelId',this.$route.params.id)
				window.sessionStorage.setItem('paraShowName',value.parpameterName)
				window.sessionStorage.setItem('paraShowNameCn',value.parpameterNameSx)
				window.sessionStorage.setItem('paraShowDes',value.parpameterDesc)
				window.sessionStorage.setItem('paraShowExample',value.parpameterExamples)
				window.sessionStorage.setItem('parpShowImg',value.parpameterImg)
				ichooarouter.push('/model/paraind/'+value.id);
			}
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
			overflow-y:auto;
			min-width:700px;
			position: relative;
			min-width:1000px;
			.add-alert-fnc{
				position: absolute;
				top:50%;
				margin-top:-150px;
				width:500px;
				left:50%;
				margin-left: -250px;
				height:260px;
				border-radius:4px;
				border:1px solid #dcdfe6;					
				background: #fff;
				padding:0px 0px 10px;
				.alert-cont-btn1{
					position: absolute;
					bottom:10px;
					left:190px;
				}
				.alert-cont-btn2{
					position: absolute;
					bottom:10px;
					left:250px;
				}
				.fnc-para-head{
					width:100%;
					padding:10px 0 0;
					height:52px;
					border-bottom: 1px solid #dcdfe6;
					text-align: center;
					.add-alert-fnc-select{
						width:200px;
						margin:0px 20px 0;
					}
				}
				.fnc-para-cont{
					width:100%;
					flex:1;
					display: flex;
					overflow-x: auto;
					.fnc-para-cont-d{
						text-align: center;
						flex:auto;
						max-width:100px;
						height:100px;
						border:1px solid #dcdfe6;
						border-radius:4px;
						margin:18px 10px 18px;
						position: relative;
						p{
							width:60px;
							text-align: center;
							overflow: hidden;
							line-height: 20px;
							margin:30px 20px 0;
							font-weight: 600;
						}
						img{
							width:20px;
							height: 20px;
							position: absolute;
							top:0;
							right: 0;
						}
					}
				}					
			}
			.content-views-body-fnc{
				border:1px solid #dcdfe6;
				background: #fff;
				display:flex;
				margin-top:10px;
				padding:85px 10px 10px;
				border-radius:4px;
				position: relative;
				
				h4{
					position: absolute;
					top:0;
					height:32px;
					line-height: 40px;
					font-size: 16px;
					margin:10px 20px 10px;
				}
				.content-views-body-fnc-btn{
					position:absolute;
					right:20px;
					top:20px;
				}
				.para-num{
					position: absolute;
					top:55px;
					height:20px;
					font-size: 14px;
					line-height: 20px;
					margin:0px 40px 0px;
				}
				.content-views-body-fnc-cont{
					width:100%;
					
					.content-views-body-fnc-cont-para{
						height:230px;
						display: flex;
						position:relative;
						border-radius:4px;
						border:1px solid #dcdfe6;
						margin:10px 20px 10px;
						flex-direction:column;
						.para-delete{
							position: absolute;
							right:8px;
							top:12px;
						}
						.fnc-para-head{
							width:100%;
							padding:10px 0 0;
							flex:0 0 32px;
							border-bottom: 1px solid #dcdfe6;
						}
						.fnc-para-cont{
							width:100%;
							flex:1;
							display: flex;
							overflow-x: auto;
							overflow-y: hidden;
							.fnc-para-cont-d{
								text-align: center;
								flex:auto;
								max-width:120px;
								height:120px;
								border:1px solid #dcdfe6;
								border-radius:4px;
								margin:18px 10px 18px;
								position: relative;
								p{
									width:100px;
									padding: 25px 10px 0;
									text-align: center;
									height:60px;
									line-height: 20px;
									font-weight: 600;
								}
								img{
									width:20px;
									height: 20px;
									position: absolute;
									top:0;
									right: 0;
								}
							}
						}
					}
				}
			}
			.content-views-body-name{
				border:1px solid #dcdfe6;
				background: #fff;
				display:flex;
				margin-top:10px;
				padding:60px 10px 10px;
				border-radius:4px;
				position: relative;
				h4{
					position: absolute;
					top:0;
					height:28px;
					line-height: 40px;
					font-size: 16px;
					margin:10px 20px 10px;
				}
				.content-views-body-name-l{
					font-size: 14px;
					border-radius:4px;
					border:1px solid #dcdfe6;
					width:100%;
					margin: 10px 20px 10px;
					padding:15px 0;
					p{
						font-weight: 600;
						text-indent: 0px;
						padding:0 40px;
    					line-height: 32px;
						span{
							font-weight: 500;
						}
					}
				}
			}
		}
	}
	
</style>
