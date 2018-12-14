
<template>
	<div class="content-views">	
		<div class="content-views-nav">
			<p class="title-view">{{ruleform.title}}</p>
			<div class="mbanav-r">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/fnc' }">函数管理</el-breadcrumb-item>
					<el-breadcrumb-item>{{ruleform.title}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<el-form :model="ruleform" status-icon :rules="rules" ref="ruleform" label-width="150px" label-position="right" class="content-views-body demo-ruleForm" size="small" v-loading="ruleform.loading">
			<div class="content-views-body-name">
				<h4>函数基本信息</h4>
				<div class="content-views-body-name-r">
					<p class="fnc-upload-file-name" v-if="ruleform.uploadFncP"><a style="text-indent:60px;display:inline-block;">{{downLoadImgBaseUrl+ruleform.fncUrl}}</a></p>
					<el-form-item class="content-views-body-name-r-upload" label="* 函数文件">
						<el-button size="mini" type="primary" class="download-fnc" @click="downLoadFncUrl"  v-if="ruleform.downLoadPara">查看<i class="el-icon-download el-icon--right"></i></el-button>
						<el-upload
						  class="upload-demo"
						  :action="ruleform.uploadUrl"
						  :on-preview="handlePreview"
						  :on-remove="handleRemove"
						  :before-remove="beforeRemove"
						  :on-success="uploadFnc"
						  multiple
						  :limit="1"
						  name="file"
						  :on-exceed="handleExceed"
						  :file-list="ruleform.fileList">
							<el-button size="mini" type="primary" v-if="!ruleform.downLoadPara">上传<i class="el-icon-upload2 el-icon--right"></i></el-button>
							<el-button size="mini" type="primary" v-if="ruleform.downLoadPara">重新上传<i class="el-icon-upload2 el-icon--right"></i></el-button>
						</el-upload>	
					</el-form-item>
					<el-form-item label="函数名字" prop="fncName">
						<el-input type="text" placeholder="请输入函数名字(唯一)" v-model="ruleform.fncName" style="max-width:300px;"></el-input>
					</el-form-item>
					<el-form-item label="函数描述" prop="fncDsecribe">
						<el-input type="textarea" placeholder="请输入函数描述" class="content-views-body-name-r-input-miaoshu" v-model="ruleform.fncDsecribe"></el-input>
					</el-form-item>
					<el-form-item label="调用类名称" prop="functionCallNamespace">
						<el-input type="text" placeholder="请输入函数调用类名称" v-model="ruleform.functionCallNamespace" style="max-width:300px;"></el-input>
					</el-form-item>
					<el-form-item label="调用方法名称" prop="functionCallFunname">
						<el-input type="text" placeholder="请输入函数调用方法名称" v-model="ruleform.functionCallFunname" style="max-width:300px;"></el-input>
					</el-form-item>
					<el-form-item label="数组返回值长度" prop="functionResultArraylength">
						<el-input type="text" placeholder="请输入函数返回数组长度" v-model.number="ruleform.functionResultArraylength" style="max-width:300px;"></el-input>
					</el-form-item>
					<el-form-item label="模板名字">
						<el-input type="text" placeholder="请输入模板名字" v-model="ruleform.reportName" style="max-width:300px;"></el-input>
					</el-form-item>
					<el-form-item label="模板地址">
						<el-upload
						  class="upload-demo"
						  :action="ruleform.uploadUrl"
						  :on-success="uploadReportPath"
						  multiple
						  :limit="1"
						  name="file"
						>
							<el-button size="mini" type="primary" v-if="!ruleform.reportPath">上传<i class="el-icon-upload2 el-icon--right"></i></el-button>
							<el-button size="mini" type="primary" v-if="ruleform.reportPath">重新上传<i class="el-icon-upload2 el-icon--right"></i></el-button>
						</el-upload>
						<el-button size="mini" type="primary" style="position: absolute;top:3px;left:132px;" @click="downLoadReportModular" v-if="ruleform.reportPath">查看<i class="el-icon-download el-icon--right"></i></el-button>
					</el-form-item>
					
				</div>
			</div>
			<div class="content-views-body-para" v-if="ruleform.downLoadPara">
				<h4>参数数量:{{ruleform.dynamicValidateForm.domains.length}}<el-button @click="addDomainAlert" size="mini" type="text" style="float:right;margin-right:20px;" icon="el-icon-circle-plus-outline"></el-button></h4>
				<el-form :model="ruleform.dynamicValidateForm" ref="ruleform.dynamicValidateForm" label-width="90px" class="demo-dynamic" size="small">	  					
					<div class="para-list" v-for="(domain, index) in ruleform.dynamicValidateForm.domains"
					    :key="domain.id">	  
						<p>参数{{index+1}}</p>
						<el-form-item label="参数名字">
							<el-input v-model="domain.parpameterName" placeholder="请输入参数名字" disabled></el-input>
						</el-form-item>	
						<el-form-item label="参数简称">
							<el-input v-model="domain.parpameterNameSx" placeholder="请输入参数简称" disabled></el-input>
						</el-form-item>
						<el-form-item label="参数长度">
							<el-input v-model="domain.parpameterLength" placeholder="请输入参数长度" disabled></el-input>
						</el-form-item>
						<el-form-item label="参数描述">
							<el-input type="textarea" v-model="domain.parpameterDesc" placeholder="请输入参数描述" disabled></el-input>
						</el-form-item>	
						<el-form-item label="参数示例">
							<el-input type="textarea" v-model="domain.parpameterExamples" placeholder="请输入参数示例" disabled></el-input>
						</el-form-item>	
						<el-form-item label="是否必传">
							<el-switch v-model="domain.parpameterIsnull" disabled active-icon-class="el-icon-circle-check" v-if="domain.parpameterIsnull==true"></el-switch>
							<el-switch v-model="domain.parpameterIsnull" disabled active-icon-class="el-icon-circle-close" v-if="domain.parpameterIsnull==false"></el-switch>
						</el-form-item>
						<el-form-item label="图片示例">
						</el-form-item>
						<div class="para-list-edit">
								<el-button v-if="domain.parpameterImg" size="mini" type="primary" @click="downLoadI(domain)">查看说明图</el-button>
								<el-button size="mini" type="primary" @click="addDomainAlert(domain,index)">编辑参数</el-button>
						</div>
						<img v-if="domain.parpameterImg" :src="downLoadImgBaseUrl+domain.parpameterImg" alt="图片示例" @click="downLoadI(domain)">
				    	<el-button @click.prevent="removeDomain(domain)" size="mini" type="text" round icon="el-icon-delete" class="para-list-btn"></el-button>
					</div>
					<div class="para-list-b" style="overflow:hidden;flex:0 0 20px;">&nbsp;</div>
				  	<div class="para-btn">
				   		<el-button @click="addDomainAlert" size="mini" type="primary">添加参数</el-button>
				  	</div>
				</el-form>
			</div>
			<div class="content-views-body-result">
				<h4>计算结果</h4>
				<div class="result-form">
					<el-form-item label="结果示例">
						<el-input type="textarea" placeholder="请输入结果示例" class="content-views-body-name-r-input-miaoshu" v-model="ruleform.resultExample"></el-input>
					</el-form-item>
					<el-form-item label="结果描述">
						<el-input type="textarea" placeholder="请输入结果描述" class="content-views-body-name-r-input-miaoshu" v-model="ruleform.resultDescribe"></el-input>
					</el-form-item>
					<el-form-item label="图片描述" class="upload-fnc">
						<el-upload
						  class="upload-demo"
						  :action="ruleform.uploadUrl"
						  :on-preview="handlePreviewR"
						  :on-remove="handleRemoveR"
						  :on-success="uploadFncR"
						  multiple
						  :limit="1"
						  name="file"
						  :on-exceed="handleExceedR"
						  :file-list="ruleform.fileList"
						  style="width:500px;">
						  <el-button size="mini" type="primary" v-if="!ruleform.downLoadPara">上传<i class="el-icon-upload2 el-icon--right"></i></el-button>
						  <el-button size="mini" type="primary" v-if="ruleform.downLoadPara">重新上传<i class="el-icon-upload2 el-icon--right"></i></el-button>
						</el-upload>	
						<el-button size="mini" type="primary" class="download-img" @click="downLoadResultImg" v-if="ruleform.downLoadPara">查看<i class="el-icon-download el-icon--right"></i></el-button>
					</el-form-item>
					<img v-if="ruleform.resultUrl" :src="downLoadImgBaseUrl+ruleform.resultUrl" alt="图片示例" @click="downLoadResultImg">
				</div>				
			</div>			
			<div class="content-views-body-bottom">
				<el-form-item label-width="0" style="text-align:right;padding-right:20px;">
					<el-button type="primary" @click="submitForm('ruleform')" size="small" v-if="!ruleform.downLoadPara">上传</el-button>
					<el-button type="primary" @click="submitForm2('ruleform')" size="small" v-if="ruleform.downLoadPara">保存</el-button>
					<el-button type="primary" @click="backFnc" size="small">返回</el-button>
				</el-form-item>
			</div>
		</el-form>		
		<div class="add-para-alert" v-if="ruleform.addPara">
			<p>参数基本信息</p>
			<!-- <el-form label-width="90px" class="add-para-alert-form" v-model="addParaForm" ref="addParaForm" :rules="ruleform.rules2"> -->
			<el-form :model="addParaForm" ref="addParaForm" label-width="100px" class="add-para-alert-form demo-ruleForm" :rules="rules2">
				    <el-form-item label="参数名字" prop="parpameterName">
					  	<el-input v-model="addParaForm.parpameterName" placeholder="请输入参数名字" ></el-input>
				    </el-form-item>	
					<el-form-item label="参数简称" prop="parpameterNameSx">
					  	<el-input v-model="addParaForm.parpameterNameSx" placeholder="请输入参数简称"></el-input>
				    </el-form-item>
					<el-form-item label="参数长度" prop="parpameterLength">
					  	<el-input v-model.number="addParaForm.parpameterLength" placeholder="请输入参数长度"></el-input>
				    </el-form-item>
					<el-form-item label="参数描述" prop="parpameterDesc">
						<el-input type="textarea" v-model="addParaForm.parpameterDesc" placeholder="请输入参数描述"></el-input>
				    </el-form-item>	
					<el-form-item label="参数示例" prop="parpameterExamples">
						<el-input type="textarea" v-model="addParaForm.parpameterExamples" placeholder="请输入参数示例"></el-input>
				    </el-form-item>	
					<el-form-item label="是否必传" prop="parpameterIsnull">
					  	<el-switch v-model="addParaForm.parpameterIsnull"></el-switch>
				    </el-form-item>
					<el-form-item label="上传说明图">
					  	<el-upload
							  class="upload-demoI"
							  :action="ruleform.uploadUrl"
							  :on-preview="handlePreviewI"
							  :on-remove="handleRemoveI"
							  :before-remove="beforeRemoveI"
							   :on-success="uploadFncI"
							  multiple
							  :limit="1"
							  :on-exceed="handleExceedI"
							  :file-list="ruleform.fileListI">
							<el-button size="mini" type="primary">上传说明图</el-button>												 
						</el-upload>	
				    </el-form-item>	
					<img :src="downLoadImgBaseUrl+addParaForm.parpameterImg" v-if="addParaForm.parpameterImg" alt="图片示例">
					<el-button @click="addFncPara" size="mini" type="primary" class="add-para-alert-form-btn1">保存</el-button>
					<el-button @click="exitAddPara" size="mini" type="primary" class="add-para-alert-form-btn2">取消</el-button>   
			</el-form>
		</div>
	</div>
</template>


<style lang="scss" scoped>
	.content-views {
		display:flex;
		flex-direction: column;
		height: 100%;
		font-size: 14px;
		input,textarea{
			padding-left: 10px;
		}
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
		.add-para-alert{
			display: flex;
			flex-direction: column;
			position: fixed;
			left:50%;
			top:50%;
			margin-top:-320px;
			margin-left:-150px;
			background: #ffffff;
			width:500px;
			height:600px;
			padding:30px 20px 0 10px;
			box-sizing: border-box;
			border:1px solid #dcdfe6;
			border-radius: 4px;
			p{
				text-align:center;
				font-size:18px;
				font-weight:600;
				height:24px;
				line-height:24px;
				flex: 0 0 44px;
			}
			.add-para-alert-form{
				position: relative;
				flex:auto;
				padding-right:20px;
				img{
						position: absolute;
						bottom:50px;
						right: 50px;
						width:120px;
						height:100px;
						background: #dcdfe6;
				}
				.add-para-alert-form-btn1{
					position: absolute;	
					left:170px;
					bottom:10px;
				}
				.add-para-alert-form-btn2{
					position: absolute;	
					left:230px;
					bottom:10px;
				}
			}
			
		}
		.content-views-body{
			padding:0 10px 0;
			flex:1;
			height:100%;
			overflow-y:scroll;
			min-height: 300px;
			min-width:1000px;
			.content-views-body-bottom{
				background:#fff;
				margin-top:10px;
				border-radius: 4px;
				padding:15px 0 0px;
				border:1px solid #dcdfe6;
				text-align: center;
				margin-bottom:10px;	
			}
			.content-views-body-result{
				background:#fff;
				margin-top:10px;
				border-radius: 4px;
				padding:10px 10px 50px;
				border:1px solid #dcdfe6;
				h4{
					height:38px;
					line-height: 28px;
					margin:10px 20px 10px;
					font-size: 16px;
				}
				.result-form{
					padding:20px 30px 0px 0;
					position: relative;
					img{
						position: absolute;
						bottom:-50px;
						right: 200px;
						width:100px;
						height:80px;
						background: #ccc;
					}
					.upload-fnc{
						position: relative;
						.download-img{
							position: absolute;
							top:3px;
							left:132px;
						}
					}
					
				}
						
			}
			.content-views-body-para{
				background:#fff;
				margin-top:10px;
				border-radius: 4px;
				padding:60px 10px 0;
				overflow:hidden;
				padding-bottom:50px;
				position:relative;
				border:1px solid #dcdfe6;
				min-height: 100px;
				flex-direction: column;
				h4{
					text-indent: 20px;
					position: absolute;
					height:28px;
					width: 100%;
					line-height: 28px;
					margin:10px 0px 10px;
					font-size: 16px;
					top:10px;
				}
				.demo-dynamic{
					display: flex;
					overflow-x: auto;
					padding:10px 25px 10px 20px;
					.para-list{
						flex:auto;
						padding:60px 35px 110px 20px;
						position:relative;
						border:1px solid #dcdfe6;
						border-radius: 4px;
						min-width:380px;
						max-width: 380px;
						margin:10px 10px;
						p{
							position: absolute;
							text-align:center;
							font-size:14px;
							font-weight:600;
							height:40px;
							line-height:40px;
							top:10px;
							left:25px;
						}
						img{
							position: absolute;
							bottom:70px;
							right: 50px;
							width:120px;
							height:100px;
							background: #dcdfe6;
						
						}
						.para-list-edit{
							position:absolute;
							bottom:15px;
							width:200px;
							left:50%;
							margin-left: -100px;
							text-align: center;
						}
						.down-load-img{
							position:absolute;
							bottom:15px;
						}
						.para-list-btn{
							position: absolute;
							right:0px;
							top:15px;
						}
					}
					.para-btn{
						position:absolute;
						left:50%;
						bottom:10px;
						margin-left:-40px;
					}
				}
				
			}
			.content-views-body-name{
				border:1px solid #dcdfe6;
				background: #fff;
				margin-top:10px;
				padding:50px 10px 10px;
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
				.content-views-body-name-r{
					padding:20px 30px 0px 0;
					position: relative;
					.fnc-upload-file-name{
						position: absolute;
						top:84px;
						left:40px;
						width:900px;
						height:24px;
						overflow-x: hidden;
						font-size: 12px;
						    color: #606266;
					}
					.content-views-body-name-r-upload{
						height:76px;
						position: relative;
						.download-fnc{
							position: absolute;
							top:3px;
							left:132px;
						}
					}
					.content-views-body-name-r-input{
						height:86px;
						input{
							height:28px;
							border:1px solid  #dcdfe6;
							border-radius: 4px;
							width:200px ;
							margin:0 20px 10px 0px;
						}
						.content-views-body-name-r-input-miaoshu{
							width:90% ;
							margin:0 20px 10px 0px;
							height:58px;
							border:1px solid  #dcdfe6;
							border-radius: 4px;
							outline: none;
							font-family: "微软雅黑";
						}
						
					}
				}
			}
		}
	}
	
</style>

<script>
import ichooarouter from "../../../router"
import { 
	getFncById,
	getFncParaListById,
	editFncParaListById,
	insertFncParaListById,
	editFncById,
	insertFnc,
	delFncParaListById,
	ossBaseURL_g,
	ossDownBaseURL_g
}from '../../../api/api';
	export default{
		data() {
	     	return {
			 	downLoadImgBaseUrl:'',
			  	ruleform:{
					reportName:'',
					reportPath:'',
					functionCallNamespace:'',	
					functionCallFunname:'',
					functionResultArraylength:'',
					uploadFncP:true,
					pageTitle:'',
					addPara:false,
					adminToken:'',
					downLoadPara:false,
					savePath:"",                  //adminToken
					btnBottom:"提交",
					title:'上传函数',
					fncName:"",
					uploadUrl:"",
					fileList: [],
					fileListI:[],
					resultExample:'',
					resultDescribe:'',
					fncDsecribe:'',
					fncUrl:'',
					resultUrl:'',
					paraIndex:'',
					loading:true,
					dynamicValidateForm:{	        	
						domains:[]
					}
			  	},
			  	rules: {
					fncName: [
						{ required: true, message: '请输入函数名称', trigger: 'blur' },
						{min: 3,max: 30,message: '长度在3 到 30 个字符,名字唯一',trigger: 'blur'}
					],
					fncDsecribe:[
						{ required: true, message: '请输入函数描述', trigger: 'blur' },
					],
					functionCallNamespace:[
						{ required: true, message: '请输入函数调用类名称', trigger: 'blur' },
					],
					functionCallFunname:[
						{ required: true, message: '请输入函数调用方法名称', trigger: 'blur' },
					],
					functionResultArraylength:[
						{ required: true, message: '请输入数组返回值长度', trigger: 'blur' },
						{ type: 'number', message: '返回值长度必须为数字值', trigger: 'blur'}
					]
			  	},
			  	addParaForm:{
					parpameterIs:1,
					parpameterName:'',
					parpameterNameSx:'',
					parpameterLength:'',
					parpameterDesc:'',
					parpameterExamples:'',
					parpameterIsnull:true,
					parpameterImg:'',
					parpameterIsnull1:true
				},
				rules2: {
					parpameterName: [
						{ required: true, message: '请输入参数名称', trigger: 'blur' },
						{min: 2,max: 20,message: '长度在2 到 20 个字符,名字唯一',trigger: 'blur'}
					],
					parpameterNameSx:[
						{ required: true, message: '请输入参数简称', trigger: 'blur' },
						{min: 2,max: 16,message: '长度在2 到 16 个字符,名字唯一',trigger: 'blur'}
					],
					parpameterDesc:[
						{ required: true, message: '请输入参数描述', trigger: 'blur' },
					],
					parpameterExamples:[
						{ required: true, message: '请输入参数示例', trigger: 'blur' },
					],
					parpameterLength:[
						{ required: true, message: '请输入参数长度', trigger: 'blur' },
						{ type: 'number', message: '参数长度必须为数字值'}
					]
			    }			
	      };
	    },
	    mounted(){  	
			this.downLoadImgBaseUrl=window.sessionStorage.DownLoadUrlH+ossDownBaseURL_g
		},
		created(){
			if(window.localStorage.isAdminId=="2"){
				this.$router.push('/index')
			}
			this.ruleform.savePath=window.localStorage.getItem('adminToken')
			this.ruleform.pageTitle=window.sessionStorage.getItem('fncTitle')
			if(this.ruleform.pageTitle=='edit'){
				this.ruleform.title='编辑函数'
				this.ruleform.btnBottom="保存"
				this.ruleform.downLoadPara=true
				this.ruleform.uploadFncP=true
				getFncById(window.sessionStorage.ApiUrl,{
					token:this.ruleform.savePath,
					id:this.$route.params.id				
				}).then(res=>{
					if(res.data.status==200){
						this.ruleform.fncName=res.data.data.functionName
						this.ruleform.fncDsecribe=res.data.data.functionDesc
						this.ruleform.resultDescribe=res.data.data.functionResultDesc
						this.ruleform.resultExample=res.data.data.functionResultExample
						this.ruleform.resultUrl=res.data.data.functionResultImg
						this.ruleform.fncUrl=res.data.data.functionPath
						this.ruleform.functionCallFunname=res.data.data.functionCallFunname
						this.ruleform.functionCallNamespace=res.data.data.functionCallNamespace
						this.ruleform.functionResultArraylength=res.data.data.functionResultArraylength
						this.ruleform.reportName=res.data.data.reportName
						this.ruleform.reportPath=res.data.data.reportPath
						getFncParaListById(window.sessionStorage.ApiUrl,{
							token:this.ruleform.savePath,
							fun_id:this.$route.params.id				
						}).then(res=>{
							this.ruleform.loading=false
							if(res.data.data.length!=0){
								this.ruleform.dynamicValidateForm.domains=res.data.data
								for(var i = 0;i<this.ruleform.dynamicValidateForm.domains.length;i++){
									this.ruleform.dynamicValidateForm.domains[i].parpameterIsnull=Boolean(this.ruleform.dynamicValidateForm.domains[i].parpameterIsnull);
								}
							}
						}).catch();
					}else if(res.data.status == 201){
						this.$message({
							type: 'info',
							message: 'token失效，为保障账户安全，请重新登陆'
						});						 
						window.localStorage.clear()
						window.window.sessionStorage.setItem('isLogin','0')
						this.$router.push('/login'); 
					}else{
						this.ruleform.loading=false
						this.$message({
							type: 'info',
							message: '加载失败!'
						});	
					}
				}).catch(err=>{
					this.$message({
						type: 'info',
						message: '由于网络链接问题，加载失败，请检查网络链接!'
					});
					this.ruleform.loading=false
				});
			}else if(this.ruleform.pageTitle=='upload'){
				this.ruleform.loading=false
				this.ruleform.title='上传函数'
				this.ruleform.btnBottom="上传"
				this.ruleform.downLoadPara=false
				this.ruleform.uploadFncP=false
	    	}
			this.ruleform.uploadUrl=window.sessionStorage.ApiUrl+ossBaseURL_g+this.ruleform.savePath
			this.ruleform.adminToken=this.ruleform.savePath
		},
		methods:{
			uploadReportPath(response,file,fileList){
				this.ruleform.reportPath=response.data.all_path
			},
			//新增参数
			
			addFncPara(){
				this.$refs['addParaForm'].validate((valid) => {
					if (valid) {
						var parpameterIs=this.addParaForm.parpameterIsnull?1:0
						if(this.addParaForm.id){
							editFncParaListById(window.sessionStorage.ApiUrl,{
								'token':this.ruleform.savePath,
								'id':this.addParaForm.id,
								'fun_id':this.$route.params.id,
								'fun_para_name':this.addParaForm.parpameterName,
								'fun_para_name_sx':this.addParaForm.parpameterNameSx,
								'fun_para_length':this.addParaForm.parpameterLength,
								'fun_para_desc':this.addParaForm.parpameterDesc,
								'fun_para_examples':this.addParaForm.parpameterExamples,
								'fun_para_isnull':parpameterIs,
								'fun_para_img':this.addParaForm.parpameterImg
							}).then(res=>{
								if(res.data.status==200){
									this.$message({
									type: 'success',
									message: '保存成功!'
									});
									window.sessionStorage.setItem('fncId',this.$route.params.id)
									ichooarouter.push('/fnc/addParaB/'+this.$route.params.id);
								}else if(res.data.status == 201){
									this.$message({
										type: 'info',
										message: 'token失效，为保障账户安全，请重新登陆'
									});						 
									window.localStorage.clear()
									window.window.sessionStorage.setItem('isLogin','0')
									this.$router.push('/login'); 
								}else if(res.data.status == 401){
									this.$message({
										type: 'info',
										message: '该名字已存在，请更改名字!'
									});	
								}else{
									this.$message({
									type: 'info',
									message: '保存失败!'
									});
								}					
							}).catch(() => {
								this.$message({
								type: 'info',
								message: '保存失败!'
								});
							})
						}else{
							insertFncParaListById(window.sessionStorage.ApiUrl,{
								'token':this.ruleform.savePath,
								'fun_id':this.$route.params.id,
								'fun_para_name':this.addParaForm.parpameterName,
								'fun_para_name_sx':this.addParaForm.parpameterNameSx,
								'fun_para_length':this.addParaForm.parpameterLength,
								'fun_para_desc':this.addParaForm.parpameterDesc,
								'fun_para_examples':this.addParaForm.parpameterExamples,
								'fun_para_isnull':parpameterIs,
								'fun_para_img':this.addParaForm.parpameterImg								
							}).then(res=>{
								if(res.data.status==200){
									this.$message({
									type: 'success',
									message: '添加成功!'
									});
									window.sessionStorage.setItem('fncId',this.$route.params.id)
									ichooarouter.push('/fnc/addParaB/'+this.$route.params.id);
								}else if(res.data.status == 201){
									this.$message({
										type: 'info',
										message: 'token失效，为保障账户安全，请重新登陆'
									});						 
									window.localStorage.clear()
									window.window.sessionStorage.setItem('isLogin','0')
									this.$router.push('/login'); 
								}else if(res.data.status == 401){
									this.$message({
										type: 'info',
										message: '该函数名字已存在，请更改函数名字!'
									});	
								}else{
									this.$message({
									type: 'info',
									message: '添加失败!'
									});
								}	        		
							}).catch(() => {
								this.$message({
								type: 'info',
								message: '添加失败!'
								});
							})
						}					
						this.ruleform.addPara=false
					} else {
						this.$message({
						type: 'info',
						message: '请检查填写内容!'
						});
						return false;
					}
				});
			},
			exitAddPara(){
				this.ruleform.addPara=false
			},
			//新增参数按钮弹出
			addDomainAlert(domain,index){
				if(domain.id){
					this.addParaForm=domain
				}else{
					this.addParaForm={
						parpameterIs:1,
						parpameterName:'',
						parpameterNameSx:'',
						parpameterLength:'',
						parpameterDesc:'',
						parpameterExamples:'',
						parpameterIsnull:true,
						parpameterImg:'',
						parpameterIsnull1:true
					}
				}
				this.ruleform.paraIndex=index
				this.ruleform.addPara=true
			},
			//提交按钮
			submitForm() {
				this.$refs['ruleform'].validate((valid) => {
					if (valid) {
						var params = new URLSearchParams();
						params.append('fun_name',this.ruleform.fncName);
						params.append('fun_name_cn', this.ruleform.fncName);
						params.append('fun_path',this.ruleform.fncUrl);
						params.append('token',this.ruleform.savePath);
						params.append('fun_desc', this.ruleform.fncDsecribe);
						params.append('fun_result_desc',this.ruleform.resultDescribe);
						params.append('fun_result_example',this.ruleform.resultExample);
						params.append('fun_result_img',this.ruleform.resultUrl);
						params.append('fun_call_namespace',this.ruleform.functionCallNamespace);
						params.append('fun_call_funname',this.ruleform.functionCallFunname);
						params.append('fun_result_arraylength',this.ruleform.functionResultArraylength);
						params.append('report_name',this.ruleform.reportName);
						params.append('report_path',this.ruleform.reportPath);
						insertFnc(window.sessionStorage.ApiUrl,params).then(res=>{			          		
							if(res.data.status==200){
								this.$message({
									type: 'success',
									message: '创建成功!'
								});
								this.$router.push('/fnc');						
							}else if(res.data.status == 201){
								this.$message({
									type: 'info',
									message: 'token失效，为保障账户安全，请重新登陆'
								});						 
								window.localStorage.clear()
								window.window.sessionStorage.setItem('isLogin','0')
								this.$router.push('/login'); 
							}else if(res.data.status==300){
								this.$message({
									type: 'info',
									message:'函数包文件未上传或说明图未上传'
								});
							}else if(res.data.status == 401){
								this.$message({
									type: 'info',
									message: '该名字已存在，请更改名字!'
								});	
							}else{
								this.$message({
									type: 'info',
									message: '创建失败'
								});
							}										
						}).catch(err=>{
							this.$message({
								type: 'info',
								message: '创建失败'
							});
						});
					} else {
						return false;
					}
				});			  
			},
			//编辑
			submitForm2() {
				this.$refs['ruleform'].validate((valid) => {
					if (valid) {
						var params = new URLSearchParams();
						params.append('id', this.$route.params.id);
						params.append('fun_name',this.ruleform.fncName);
						params.append('fun_name_cn', this.ruleform.fncName);
						params.append('fun_path',this.ruleform.fncUrl);
						params.append('token',this.ruleform.savePath);
						params.append('fun_desc', this.ruleform.fncDsecribe);
						params.append('fun_result_desc',this.ruleform.resultDescribe);
						params.append('fun_result_example',this.ruleform.resultExample);
						params.append('fun_result_img',this.ruleform.resultUrl);
						params.append('parameter_num',this.ruleform.dynamicValidateForm.domains.length);
						params.append('fun_call_namespace',this.ruleform.functionCallNamespace);
						params.append('fun_call_funname',this.ruleform.functionCallFunname);
						params.append('fun_result_arraylength',this.ruleform.functionResultArraylength);	
						params.append('report_name',this.ruleform.reportName);
						params.append('report_path',this.ruleform.reportPath);
						editFncById(window.sessionStorage.ApiUrl,params).then(res=>{			          		
							if(res.data.status==200){
								this.$message({
									type: 'success',	
									message: '编辑成功!'
								});
								this.$router.push('/fnc');						
							}else if(res.data.status == 201){
								this.$message({
									type: 'info',
									message: 'token失效，为保障账户安全，请重新登陆'
								});						 
								window.localStorage.clear()
								window.window.sessionStorage.setItem('isLogin','0')
								this.$router.push('/login'); 
							}else if(res.data.status==400){
								this.$message({
									type: 'info',
									message: '编辑失败'
								});
							}else{
								this.$message({
									type: 'info',
									message: '编辑失败'
								});
							}
																	
						}).catch(err=>{
							this.$message({
								type: 'info',
								message: '编辑失败'
							});
						});
					} else {
						return false;
					}
				});		
		    },
		    //移除参数
		    removeDomain(item) {
				this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delFncParaListById(window.sessionStorage.ApiUrl,{
						token:this.ruleform.savePath,
						id:item.id
					}).then(res=>{
						if(res.data.status==200){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							ichooarouter.push('/fnc/addParaB/'+this.$route.params.id);
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
				}).catch()				
		    },
			//返回函数管理
			backFnc(){
				this.$router.push('/fnc')
			},
			//上传函数包
			handleRemove(file, fileList) {
	        },
	        handlePreview(file) {				
			},
			downLoadFncUrl(){
				let fncURL=this.downLoadImgBaseUrl+this.ruleform.fncUrl
				window.open(fncURL, '_blank')
				//window.location.href = this.ruleform.fncUrl
			},
	        handleExceed(files, fileList) {
	        	this.$message.warning(`当前限制选择1个文件`);
	        },
	        beforeRemove(file, fileList) {
	        	return this.$confirm(`确定移除 ${ file.name }？`);
			},
			//成功回调
			uploadFnc(response, file, fileList){	
				if(response.status==200){
					this.$message({
						type: 'success',
						message: '上传成功!'
					});
					this.ruleform.fncUrl=response.data.all_path;
				}else if(response.status == 201){
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
						message: '上传失败!'
					});	
				}
				this.ruleform.uploadFncP=false            
			},
			//上传结果说明图
			handleRemoveR(file, fileList) {
	        },
	        handlePreviewR(file) {	
			},
			downLoadResultImg(){
				let fncImgURL=this.downLoadImgBaseUrl+this.ruleform.resultUrl
				window.open(fncImgURL, '_blank')
			},
			downLoadReportModular(){
				let fncReportPath=this.downLoadImgBaseUrl+this.ruleform.reportPath
				window.open(fncReportPath, '_blank')
			},
	        handleExceedR(files, fileList) {
	        	this.$message.warning(`当前限制选择1个文件`);
	        },
			//成功回调
			uploadFncR(response, file, fileList){				
				this.ruleform.resultUrl=response.data.all_path;                     
			},
			//上传参数说明图
			handleRemoveI(file, fileListI) {
	        },
	        handlePreviewI(file) {
			},
			downLoadI(domain){
				let domainI=domain
				window.open(this.downLoadImgBaseUrl+domainI.parpameterImg, '_blank')
			},
	        handleExceedI(files, fileListI) {
	        	this.$message.warning(`当前限制选择1个文件`);
	        },
	        beforeRemoveI(file, fileListI) {
	        	return this.$confirm(`确定移除 ${ file.name }？`);
			},
			//成功回调
			uploadFncI(response, file, fileList){			
				this.addParaForm.parpameterImg=response.data.all_path;      
			}
		}
	}
</script>
