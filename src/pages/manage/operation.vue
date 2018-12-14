<template>
	<div class="content-views">
		<div class="content-views-nav">
			<p class="title-view">业务管理</p>
			<div class="mbanav-r">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>业务管理</el-breadcrumb-item>
			</el-breadcrumb>
			</div>
		</div>
		<div class="content-views-head">			
			<div class="content-views-head-r">			
				<el-button size="small" @click="addOpe" type="primary">添加业务流</el-button>
			</div>			
		</div>
		<div class="content-views-body">
			<el-table ref="multipleTable"
				tooltip-effect="light"
				v-loading="loading"
				:header-cell-style="getRowClass"
			    border 
				:data="tableData"
				height="100%"
				highlight-current-row
				style="text-align: center;min-width: 1000px;"
				@selection-change="handleSelectionChange" size="medium">				
			    <el-table-column type="index">
			    </el-table-column>
				<el-table-column prop="createTime" label="创建时间" sortable width="220">
					<template slot-scope="scope">{{ scope.row.createTime }}</template>
				</el-table-column>
				<el-table-column prop="workName" label="业务名字">
				</el-table-column>
				<el-table-column prop="workDesc" label="业务描述" :show-overflow-tooltip="true">
				</el-table-column>
				
				<el-table-column prop="workStepNum" label="流程个数" width="80">
				</el-table-column>
				<el-table-column label="编辑" width="200">
					<template slot-scope="scope">
						<el-button @click="editOpe(scope.row)" type="text" size="small"><i class="el-icon-edit"></i>&nbsp;编辑描述</el-button>
						<el-button @click="toAddOpe(scope.row)" type="text" size="small"><i class="el-icon-edit"></i>&nbsp;编辑详情</el-button>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="80">
					<template slot-scope="scope">						
						<el-button @click="deleteRow(scope.row)" type="text" size="small" style="color:#f00">
							<i class="el-icon-delete"></i>&nbsp;删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>			
		</div>
		<div class="content-view-bottom">				
			 <div class="fy-right-bottom">
				 <el-pagination
				      @current-change="handleCurrentChange"
					  :page-size=20
				      :current-page="currentPage4"
				      layout="total, prev, pager, next ,jumper"
				      :total="showPages">
				 </el-pagination>
			</div>
		</div>
		<div class="content-view-alert" v-if="alertIsShow">
			<h4>业务基本信息</h4>
				<el-form :model="addOpeForm" ref="addOpeForm" label-width="80px" class="add-addOpeForm-form demo-addOpeForm" size="small" v-loading="loading">
					<el-form-item label="业务名字" prop="opeName" 
					:rules="[{required: true, message: '名字不能为空', trigger: 'blur'},
					{min: 3,max:20,message: '长度在3 到 20 个字符,名字唯一',trigger: 'blur'}]">
					  	<el-input v-model="addOpeForm.opeName" placeholder="请输入业务名字" ></el-input>
				    </el-form-item>	
				    <el-form-item label="业务描述" prop="opeDes" :rules="[{
					required: true, message: '描述不能为空', trigger: 'blur'
					}]">
					  	<el-input type="textarea" v-model="addOpeForm.opeDes" placeholder="请输入业务描述" style="max-height:80px;overflow:hidden;"></el-input>
				    </el-form-item>	
					<el-form-item label-width="0px" class="add-model-form-btn">
					  	<el-button @click="addOpeAlert('addOpeForm')" size="small" type="primary" class="add-model-form-btn1" v-if="addOpeForm.btnIsAdd">添加</el-button>
						  <el-button @click="editOpeAlert('addOpeForm')" size="small" type="primary" class="add-model-form-btn1" v-if="!addOpeForm.btnIsAdd">保存</el-button>
						<el-button @click="exitAddOpe" size="small" type="primary" class="add-model-form-btn2">取消</el-button>   
				    </el-form-item>	
				</el-form>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import {addOperation,editOperation,deleteOperation,getOperationList,ossBaseURL_g,ossDownBaseURL_g} from '../../api/api';
import ichooarouter from "../../router"
	export default {
		methods: {	
			downLoadReport(){
				var reportURL=this.downLoadBaseUrl+this.addOpeForm.reportPath
				window.open(reportURL, '_blank')
			},
			uploadReport(response,file,fileList){
				this.addOpeForm.reportPath=response.data.all_path
			},
			//添加业务步骤详情跳转
			toAddOpe(row){
				window.sessionStorage.setItem('operationName',row.workName)
				window.sessionStorage.setItem('operationDesc',row.workDesc)
				window.sessionStorage.setItem('operationReportName',row.reportName)
				window.sessionStorage.setItem('operationReportPath',row.reportPath)
				ichooarouter.push('/operation/addope/'+row.id)
			},
			//添加业务
			addOpeAlert(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.loading=true
							addOperation(window.sessionStorage.ApiUrl,{
									token:this.adminToken,
									work_name:this.addOpeForm.opeName,
									work_desc:this.addOpeForm.opeDes,
									report_name:this.addOpeForm.reportName,
									report_path:this.addOpeForm.reportPath
							}).then(res=>{		
								if(res.data.status==200){						
									this.$message({
									type: 'success',
									message: '添加成功!'
									});
									this.loading=false
									this.$router.push('/opeblank')
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
										message: '该业务名字已存在，请更改!'
									});	
								}else{
									this.$message({
									type: 'info',
									message: '添加失败!'
									});
									this.loading=false
								}				
							}).catch(err=>{
								this.$message({
									type: 'info',
									message: '添加失败!'
								});
								this.loading=false
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
			editOpeAlert(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.loading=true
						editOperation(window.sessionStorage.ApiUrl,{
								token:this.adminToken,
								work_name:this.addOpeForm.opeName,
								work_desc:this.addOpeForm.opeDes,
								report_name:this.addOpeForm.reportName,
								report_path:this.addOpeForm.reportPath,
								id:this.addOpeForm.opeId
						}).then(res=>{		
							if(res.data.status==200){						
								this.$message({
								type: 'success',
								message: '编辑成功!'
								});
								this.loading=false
								this.$router.push('/opeblank')
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
								message: '编辑失败!'
								});
								this.loading=false
							}				
						}).catch(err=>{
							this.$message({
								type: 'info',
								message: '编辑失败!'
							});
							this.loading=false
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
			//删除
			deleteRow(row) {
				var rowID=row.id
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then((row) => {
					deleteOperation(window.sessionStorage.ApiUrl,{
							token:this.adminToken,
							id:rowID	
					}).then(res=>{		
						if(res.data.status==200){						
							this.$message({
							type: 'success',
							message: '删除成功!'
							});
							this.loading=false
							this.$router.push('/opeblank')
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
							this.loading=false
						}				
					}).catch(err=>{
						this.$message({
							type: 'info',
							message: '删除失败!'
						});
						this.loading=false
					});
				}).catch(()=>{
					return false
				});
			},
			addOpe(){
				this.alertIsShow=true
				this.addOpeForm.opeName='';
				this.addOpeForm.opeDes='';
				this.addOpeForm.btnIsAdd=true
			},
			editOpe(row){
				this.alertIsShow=true
				this.addOpeForm.opeName=row.workName;
				this.addOpeForm.opeDes=row.workDesc;
				this.addOpeForm.btnIsAdd=false;
				this.addOpeForm.opeId=row.id;
				this.addOpeForm.reportName=row.reportName
				this.addOpeForm.reportPath=row.reportPath
			},
			exitAddOpe(){
				this.alertIsShow=false
			},
			//表格css控制
			getRowClass({ row, column, rowIndex, columnIndex }) {
				if (rowIndex == 0) {
					return 'background:#ddd;color:#000;'
				} else {
					return ''
				}
			},
		    handleCurrentChange(val) {
		        var page=val;
		        getOperationList(window.sessionStorage.ApiUrl,{
						token:this.adminToken,
						page_start:page,
						page_size:20
				}).then(res=>{		
					if(res.data.status==200){						
						var tableD=res.data.data.list;
						this.tableData=tableD
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
		    },
			getBackData(){
			},
			toggleSelection(rows) {	        
		          this.$refs.multipleTable.clearSelection();	        
		    },
			handleSelectionChange(sels) {  
		        this.sels = sels;
		    }			
		},
		created(){
			if(window.localStorage.isAdminId=="2"){
				this.$router.push('/index')
			}
			this.adminToken=window.localStorage.getItem('adminToken')
			this.uploadUrl=window.sessionStorage.ApiUrl+ossBaseURL_g+this.adminToken
			this.downLoadBaseUrl=window.sessionStorage.DownLoadUrlH+ossDownBaseURL_g
		},
		mounted(){
			if(this.adminToken){
				getOperationList(window.sessionStorage.ApiUrl,{
						token:this.adminToken,
						page_start:1,
						page_size:20
				}).then(res=>{		
					if(res.data.status==200){	
						this.showPages=res.data.data.total
						this.tableData=res.data.data.list
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
					message: 'token失效，为保障账户安全，请重新登陆'
				});	
				this.$router.push('/login'); 
			}
		},
		data() {
			return {
				downLoadBaseUrl:'',
				uploadUrl:'',
				showPages:0,
				adminToken:'',
				addOpeForm:{
					opeName:'',
					opeDes:'',
					btnIsAdd:true,
					opeId:'',
					reportName:'',
					reportPath:''
				},
				alertIsShow:false,
				loading:true,
				search:{
					name:''
				},
				sels: [],
				currentPage4: 1,
				visible2:false,
				form: {
					idcard:'',					
					password:'',
					name: '',
					tel:'',
					condition:true
				},
				tableData: []
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content-views {
		display:flex;
		flex-direction: column;
		height: 100%;
		position: relative;
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
		.content-view-alert{
			width:400px;
			position: absolute;
			top:50%;
			left:50%;
			margin-left: -200px;
			margin-top:-250px;
			background: #fff;
			border:1px solid #dcdfe6;
			border-radius: 5px;
			padding:30px 40px 10px 20px;
			box-sizing: border-box;
			h4{
				text-align: center;
				font-size: 16px;
				height:50px;
				line-height: 40px;
			}
			.add-model-form-btn{
				padding-left: 30px;
				padding-top: 10px;
				text-align: center;
			}
		}
		.content-view-bottom{
			flex:0 0 50px;
			padding: 0 15px 0;
			min-width:1000px;
			line-height:50px;
			.btn-left-bottom{
				float:left;
				width:300px;
				height:50px;
			}
			.fy-right-bottom{
				float:right;
				
				line-height: 40px;
				.el-pagination{
					padding:10px 0 0 0;
				}
			}
		}
		.content-views-body{
			padding:0 10px 0;
			flex:1;
			height:100%;
			overflow-y:auto;
			min-width:1000px;
		}
		.content-views-head{
			flex:0 0 50px;
			line-height: 50px;
			padding: 0 10px 0;
			min-width:1000px;
			.content-views-head-l{
				float: left;
			}
			.content-views-head-r{
				float: right;
			}
		}
	}
</style>