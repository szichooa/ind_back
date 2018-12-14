
<template>
	<div class="content-views">
		<div class="content-views-nav">
			<p class="title-view">编辑详情</p>
			<div class="mbanav-r">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/operation' }">业务管理</el-breadcrumb-item>
					<el-breadcrumb-item>编辑详情</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="content-views-body">
			<div class="content-views-body-h3">
				<h4>业务信息</h4>
				<div class="content-views-body-h3-cont">					
					<p>业务名字：<span>{{operationName}}</span></p>
					<p>业务描述：<span>{{operationDesc}}</span></p>
				</div>
			</div>
			<div class="content-views-body-add">
				<h4>业务流程：共{{dynamicValidateForm.domains.length}}步</h4>
				<el-button type="primary" size="mini" class="content-views-body-add-btn" @click="addDomain">添加步骤</el-button>
				
				<div class="content-views-body-add-cont">
					<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic" v-loading="loading">
					  <div class="content-views-body-add-cont-para" v-for="(domain, indexA) in dynamicValidateForm.domains" :key="domain.key">
					  	<div class="add-para-head">
					  		<el-form-item label-width="0" size="small">
								<p>{{"步骤"+(indexA+1)}}：<span>{{domain.stepName}}</span> </p>
								<p>步骤描述：<span>{{domain.stepDesc}}</span></p>
							</el-form-item>								
					  	</div>
						<div class="add-para-cont">
							<el-form-item size="small" label-width="20px" v-if="dynamicValidateForm.domains[indexA].workStepModVoList.length==0">
								<el-button @click="addModelList(domain,indexA)" type="primary" size="mini">添加模块</el-button>
							</el-form-item>	
							<el-form-item
							 label='选择模块'
							 size="small" 
							 class="add-para-cont-item"
							 label-width="80px" 
							 v-for="model,indexB in domain.workStepModVoList" 
							 :key="indexB"
							 v-if="model.type==='add'">
								<el-select v-model="modularUpload" placeholder="请选择函数" size="small">
							      <el-option :label="para.modularName" :value="para.id" v-for="para,indexC in modularList" :key="indexC"></el-option>
							    </el-select>
								<el-button @click="uploadModelList(indexA,indexB)" type="primary" size="mini" round icon="el-icon-edit-outline" v-if="uploadModelStep">保存</el-button>
								<el-button @click="removeModelList1(indexA,indexB)" type="text" size="mini" round icon="el-icon-delete" class="item-delete"></el-button>
							</el-form-item>
							<el-form-item v-if="model.type!=='add'" label='' size="small" class="add-para-cont-item" label-width="0px" v-for="model,indexB in domain.workStepModVoList" :key="indexB">
								<p style="text-indent:40px;display:inline-block;font-weight:600;">模块名字：<span style="font-weight:500;">{{model.modName}}</span></p>
								<el-button @click="removeModelList(indexA,model)" type="text" size="mini" round icon="el-icon-delete" class="item-delete"></el-button>
							</el-form-item>	
						</div>
						<el-button @click.prevent="editDomain(domain)" type="text" size="mini" round icon="el-icon-edit-outline" class="para-delete1">								
						</el-button>
						<el-button @click.prevent="removeDomain(domain)" type="text" size="mini" round icon="el-icon-delete" class="para-delete2">								
						</el-button>
					  </div>
					  <el-form-item style="text-align:right;padding-right:20px;" label-width="0px">
						<el-button type="primary" @click="backOperation" size="small">返回</el-button>
					  </el-form-item>
					</el-form>
				</div>
			</div>
			<div class="content-view-alert" v-if="alertIsShow">
				<h4>步骤基本信息</h4>
				<el-form :model="opeStepForm" ref="opeStepForm" label-width="80px" class="add-opeStepForm-form demo-opeStepForm" size="mini">
					<el-form-item label="步骤别名" prop="opeStepName" 
					:rules="[{required: true, message: '名字不能为空', trigger: 'blur'},
					{min: 3,max: 10,message: '长度在3 到 10 个字符,名字唯一',trigger: 'blur'}]">
					  	<el-input v-model="opeStepForm.opeStepName" placeholder="请输入步骤别名" ></el-input>
				    </el-form-item>	
				    <el-form-item label="步骤描述" prop="opeStepDes" :rules="[{
					required: true, message: '描述不能为空', trigger: 'blur'
					}]">
					  	<el-input type="textarea" v-model="opeStepForm.opeStepDes" placeholder="请输入步骤描述" style="max-height:80px;overflow:hidden;"></el-input>
				    </el-form-item>	
					<el-form-item label-width="0px" class="add-model-form-btn">
					  	<el-button @click="addOpeStep('opeStepForm')" size="mini" type="primary" class="add-model-form-btn1" v-if="opeStepForm.btnIsAdd">添加</el-button>
						<el-button @click="editOpeStep('opeStepForm')" size="mini" type="primary" class="add-model-form-btn1" v-if="!opeStepForm.btnIsAdd">保存</el-button>
						<el-button @click="exitAddOpeStep" size="mini" type="primary" class="add-model-form-btn2">取消</el-button>   
				    </el-form-item>	
				</el-form>
		</div>
		</div>
	</div>
</template>


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
			min-width: 990px;
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
			min-height: 300px;
			min-width:1000px;
			position: relative;
			.content-views-body-h3{	
				background: #fff;
				display:flex;
				margin-top:10px;
				padding:60px 10px 10px;
				border-radius:4px;
				border:1px solid #dcdfe6;
				position: relative;
				h4{
					position: absolute;
					top:0;
					height:28px;
					line-height: 40px;
					font-size: 16px;
					margin:10px 20px 10px;
				}
				.content-views-body-h3-cont{
					font-size: 14px;
					border-radius:4px;
					border:1px solid #dcdfe6;
					width:100%;
					margin: 10px 20px 10px;
					padding:15px 0;
					p{
						font-weight: 600;
						padding:0 40px;
    					line-height: 32px;
						span{
							font-weight: 500;
						}
					}
				}
			}
			.content-view-alert{
				width:400px;
				height:240px;
				position: fixed;
				top:50%;
				left:50%;
				margin-left: -100px;
				margin-top:-120px;
				background: #fff;
				border:1px solid #dcdfe6;
				border-radius: 4px;
				padding:10px 30px 10px 10px;
				box-sizing: border-box;
				h4{
					text-align: center;
					font-size: 16px;
					height:50px;
					line-height: 40px;
				}
				.add-model-form-btn{
					text-align: center;
				}
			}
			.content-views-body-add{
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
				.content-views-body-add-btn{
					position:absolute;
					right:30px;
					top:15px;
				}
				.para-num{
					position: absolute;
					top:50px;
					height:20px;
					line-height: 20px;
					margin:0px 20px 0px;
				}
				.content-views-body-add-cont{
					width:100%;
					
					.content-views-body-add-cont-para{
						
						display: flex;
						position:relative;
						border-radius:4px;
						border:1px solid #dcdfe6;
						margin:10px 20px 10px;
						flex-direction:column;
						.para-delete1{
							position: absolute;
							right:38px;
							top:12px;
						}
						.para-delete2{
							position: absolute;
							right:8px;
							top:12px;
						}
						.add-para-head{
							width:100%;
							padding:10px 0 0;
							flex:auto;
							border-bottom: 1px solid #dcdfe6;
							p{
								line-height: 30px;
								font-size: 14px;
								font-weight: 600;
								padding: 0 40px;
								span{
									font-weight: 500;
								}
							}
						}
						.add-para-cont{
							width:100%;
							flex:1;
							padding: 10px 0 0;
							.add-para-cont-item{
								margin:0px 10px 10px 20px;
								border-radius:4px;
								border:1px solid #dcdfe6;
								padding:5px 10px 5px 0;
								position: relative;
								.item-delete{
									position: absolute;
									right:8px;
									top:2px;
								}
							}
						}
					}
				}
			}
		}
	}
	
</style>

<script>
import axios from "axios"
import ichooarouter from "../../../router"
import {getOperationStepById,getAllModList,delOperationStepById,insertOperationStepById,editOperationStepById,insertOperationStepMod,delOperationStepMod,ossDownBaseURL_g} from '../../../api/api';
	export default{
		data() {
			return {
				adminToken:'',
				uploadModelStep:true,
				modularList:[],
				modularUpload:'',
				opeStepForm:{
					opeStepName:'',
					opeStepDes:'',
					btnIsAdd:true,
					opeStepId:''
				},
				downLoadBaseUrl:'',
				alertIsShow:false,
				operationName:'',
				operationDesc:'',
				operationReportName:'',
				operationReportPath:'',
				loading:true,
				dynamicValidateForm: {
					domains: []
				}
			};
		},
		mounted(){
			if(window.localStorage.isAdminId=="2"){
				this.$router.push('/index')
			}
			this.downLoadBaseUrl=window.sessionStorage.DownLoadUrlH+ossDownBaseURL_g
			this.adminToken=window.localStorage.getItem('adminToken')
			this.operationName=window.sessionStorage.getItem('operationName')
			this.operationDesc=window.sessionStorage.getItem('operationDesc')
			this.operationReportName=window.sessionStorage.getItem('operationReportName')
			this.operationReportPath=window.sessionStorage.getItem('operationReportPath')
			getOperationStepById(window.sessionStorage.ApiUrl,{
					token:this.adminToken,
					work_id:this.$route.params.id
			}).then(res=>{
				if(res.data.status==200){
					this.dynamicValidateForm.domains=res.data.data.reverse()
					//获取所有模块列表
					getAllModList(window.sessionStorage.ApiUrl,{
							token:this.adminToken
					}).then(res=>{
						if(res.data.status==200){	
							this.modularList=res.data.data
							this.loading=false
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
							this.loading=false
						}				
					}).catch(err=>{
						this.$message({
							type: 'info',
							message: '加载失败!'
						});
						this.loading=false
					});
		    	}else{
		       		this.$message({
						type: 'info',
						message: '加载失败!'
					});
					this.loading=false
		        }				
			}).catch(err=>{
				this.$message({
					type: 'info',
					message: '加载失败!'
				});
				this.loading=false
			});
		},
		methods:{
			downLoadReport(){
				var reportURL=this.downLoadBaseUrl+this.operationReportPath
				window.open(reportURL, '_blank')
			},
			//添加步骤
			addDomain() {
				this.opeStepForm.opeStepName=''
				this.opeStepForm.opeStepDes=''
				this.opeStepForm.btnIsAdd=true
				this.alertIsShow=true
			},
			editDomain(item){
				//编辑
				this.opeStepForm.opeStepId=item.id
				this.opeStepForm.opeStepName=item.stepName
				this.opeStepForm.opeStepDes=item.stepDesc
				this.opeStepForm.btnIsAdd=false
				this.alertIsShow=true
			},
			//删除步骤
			removeDomain(item) {
				var itemID=item.id
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then((item) => {
					delOperationStepById(window.sessionStorage.ApiUrl,{
							token:this.adminToken,
							step_name:this.opeStepForm.opeStepName,
							step_desc:this.opeStepForm.opeStepDes,
							id:itemID
					}).then(res=>{
						if(res.data.status==200){
							this.$message({
							type: 'success',
							message: '删除成功!'
							});
							ichooarouter.push('/operation/editope/'+this.$route.params.id)
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
						});
					});
				}).catch(()=>{
					return false
				});
			},
			//添加步骤和流程关系
			addOpeStep(formName){
				//添加
				this.$refs[formName].validate((valid) => {
					if (valid) {
						insertOperationStepById(window.sessionStorage.ApiUrl,{
								token:this.adminToken,
								step_name:this.opeStepForm.opeStepName,
								step_desc:this.opeStepForm.opeStepDes,
								work_id:this.$route.params.id
						}).then(res=>{
							if(res.data.status==200){
								ichooarouter.push('/operation/editope/'+this.$route.params.id)
							}else if(res.data.status == 201){
								this.$message({
									type: 'info',
									message: 'token失效，为保障账户安全，请重新登陆'
								});						 
								window.localStorage.clear()
								window.window.sessionStorage.setItem('isLogin','0')
								this.$router.push('/login'); 
							}else if (res.data.status == 401) {
								this.$message({
									type: 'info',
									message: '该步骤名已拥有,请更改步骤名'
								});
							}else{
								this.$message({
								type: 'info',
								message: '添加失败!'
								});
							}				
						}).catch(err=>{
							this.$message({
								type: 'info',
								message: '添加失败!'
							});
						});
					} else {
						this.$message({
							type: 'info',
							message: '请检查填写内容!'
						});
						return false;
					}
        		});	
			},
			editOpeStep(formName){
				//保存
				this.$refs[formName].validate((valid) => {
					if (valid) {
						editOperationStepById(window.sessionStorage.ApiUrl,{
								token:this.adminToken,
								step_name:this.opeStepForm.opeStepName,
								step_desc:this.opeStepForm.opeStepDes,
								id:this.opeStepForm.opeStepId
						}).then(res=>{
							if(res.data.status==200){
								ichooarouter.push('/operation/editope/'+this.$route.params.id)
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
								message: '添加失败!'
								});
							}				
						}).catch(err=>{
							this.$message({
								type: 'info',
								message: '添加失败!'
							});
						});
					} else {
						this.$message({
							type: 'info',
							message: '请检查填写内容!'
						});
						return false;
					}
        		});	
			},
			exitAddOpeStep(){
				//取消
				this.alertIsShow=false
			},
			addModelList(domain,indexA){
				this.dynamicValidateForm.domains[indexA].workStepModVoList.push(
					{
						"id": '',
						"workId": '',
						"modId": '',
						"workStepId": '',
						"workStepModSort": 0,
						"createTime": Date.now(),
						"updateTime": Date.now(),
						"modName": "",
						"type":'add'
					}
				)
			},
			//保存模块与步骤关系
			uploadModelList(indexA,indexB){
				insertOperationStepMod(window.sessionStorage.ApiUrl,{
						token:this.adminToken,
						mod_id:this.modularUpload,
						work_step_id:this.dynamicValidateForm.domains[indexA].id,
						work_id:this.$route.params.id
				}).then(res=>{
					if(res.data.status==200){
						this.$message({
						type: 'success',
						message: '添加成功!'
						});
						ichooarouter.push('/operation/editope/'+this.$route.params.id)
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
						message: '添加失败!'
						});
		          	}				
				}).catch(err=>{
					this.$message({
						type: 'info',
						message: '添加失败!'
					});
				});
			},
			//删除模块与步骤关系
			removeModelList(indexA,model){				
				//this.dynamicValidateForm.domains[indexA].modelList.splice(indexB, 1)
				var modelItem=model
				var indexAAA=indexA
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then((item) => {
					delOperationStepMod(window.sessionStorage.ApiUrl,{
							token:this.adminToken,
							mod_id:modelItem.modId,
							work_step_id:this.dynamicValidateForm.domains[indexAAA].id,
							work_id:this.$route.params.id
					}).then(res=>{
						if(res.data.status==200){
							this.$message({
							type: 'success',
							message: '删除成功!'
							});
							ichooarouter.push('/operation/editope/'+this.$route.params.id)
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
						});
					});
				}).catch(()=>{
					return false
				});
			},
			removeModelList1(indexA,indexB){				
				this.dynamicValidateForm.domains[indexA].workStepModVoList.splice(indexB, 1)
			},
			submitForm(formName) {
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			
			
			backOperation(){
				this.$router.push('/operation')
			},
			toEditPara(){
				this.$router.push('/paraind')
			}
		}
	}
</script>
