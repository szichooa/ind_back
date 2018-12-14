<template>
	<div class="content-views">
		<div class="content-views-nav">
			<p class="title-view">本地数据库</p>
			<div class="mbanav-r">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>本地数据库</el-breadcrumb-item>
			</el-breadcrumb>
			</div>
		</div>
		<div class="content-views-head">
			<div class="content-views-head-l">
				<el-input v-model="search.name" placeholder="函数名" size="small" style="width:200px;" @keyup.enter.native="searchDataListDB"></el-input>
				<el-button type="primary" @click="searchDataListDB" size="small" icon="el-icon-search" style="margin-left:20px;">查询</el-button>
			</div>			
			<div class="content-views-head-r">			
				<el-button size="small" @click="addDataBase" type="primary">添加数据库</el-button>
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
				<el-table-column prop="dbName" label="数据库名称">
				</el-table-column>
				<el-table-column prop="dbInfo" label="数据库描述" :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button @click="showDataBase(scope.row)" type="text" size="small"><i class="el-icon-search"></i>&nbsp;查看</el-button>
						<el-button @click="bindDataBase(scope.row)" type="text" size="small"><i class="el-icon-edit"></i>&nbsp;管理</el-button>
						<el-button @click="editDataBase(scope.row)" type="text" size="small"><i class="el-icon-edit"></i>&nbsp;编辑</el-button>
					</template>
				</el-table-column>
				<el-table-column label="删除" width="80">
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
					  :page-size=500
				      :current-page="currentPage4"
				      layout="total, prev, pager, next "
				      :total="showPages">
				 </el-pagination>
			</div>
		</div>
		<div class="content-view-alert" v-if="alertIsShow">
			<h4>数据库基本信息</h4>
			<el-form :model="addOpeForm" ref="addOpeForm" label-width="100px" class="add-addOpeForm-form demo-addOpeForm" size="small" v-loading="loadingA">
				<el-form-item label="数据库名称" prop="dataBaseName" 
				:rules="[{required: true, message: '名字不能为空', trigger: 'blur'},
				{min: 3,max:20,message: '长度在3 到 20 个字符,名字唯一',trigger: 'blur'}]">
					<el-input v-model="addOpeForm.dataBaseName" placeholder="请输入数据库名称" ></el-input>
				</el-form-item>	
				<el-form-item label="数据库描述" prop="dataBaseInfo"
				:rules="[{required: true, message: '描述不能为空', trigger: 'blur'}]">
					<el-input v-model="addOpeForm.dataBaseInfo" placeholder="请输入数据库描述" type="textarea" style="max-height:180px;overflow:hidden"></el-input>
				</el-form-item>	
				<el-form-item label-width="0px" class="add-model-form-btn">
					<el-button @click="addDataBaseAlert('addOpeForm')" size="small" type="primary" class="add-model-form-btn1" v-if="addOpeForm.btnIsAdd">添加</el-button>
						<el-button @click="editDataBaseAlert('addOpeForm')" size="small" type="primary" class="add-model-form-btn1" v-if="!addOpeForm.btnIsAdd">保存</el-button>
					<el-button @click="exitAddOpe" size="small" type="primary" class="add-model-form-btn2">取消</el-button>   
				</el-form-item>	
			</el-form>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import {ossBaseURL_g,ossDownBaseURL_g,addDataListDBLocal,delDataListDBLocal,getDataListDBLocal,editDataListDBLocal,getAllFncList } from '../../api/api';
import ichooarouter from "../../router"
	export default {
		methods: {
			showDataBase(row){
				let rows=row;
				window.sessionStorage.setItem('dataBaseName',rows.dbName)
				window.sessionStorage.setItem('funBindID',rows.funId)
				ichooarouter.push('/datal/datashowl/'+rows.id);
			},
			//绑定数据
			bindDataBase(row){
				let rows=row;
				window.sessionStorage.setItem('dataBaseName',rows.dbName)
				window.sessionStorage.setItem('funBindID',rows.funId)
				ichooarouter.push('/datal/bindl/'+rows.id);
			},
			//添加业务
			addDataBaseAlert(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var params = new URLSearchParams();
						params.append('token', this.adminToken);
						params.append('db_name',this.addOpeForm.dataBaseName);
						params.append('db_info',this.addOpeForm.dataBaseInfo);
						addDataListDBLocal(window.sessionStorage.ApiUrl,params).then((res)=>{
							if(res.data.status==200){						
								this.$message({
								type: 'success',
								message: '添加成功!'
								});
								this.loadingA=false;
								this.alertIsShow=false;
								this.handleCurrentChange(1);
							}else if(res.data.status == 201){
								this.$message({
									type: 'info',
									message: 'token失效，为保障账户安全，请重新登陆'
								});						 
								window.localStorage.clear()
								window.window.sessionStorage.setItem('isLogin','0')
								this.$router.push('/login'); 
							}else if(res.data.status == 300){
								this.$message({
									type: 'info',
									message: '每个函数只能绑定一个数据库，该函数已存在数据库，请更换其它函数'
								});	
								this.loadingA=false
							}else if(res.data.status == 401){
								this.$message({
									type: 'info',
									message: '该数据库名字已存在，请更改!'
								});	
								this.loadingA=false
							}else{
								this.$message({
								type: 'info',
								message: '添加失败!'
								});
								this.loadingA=false
							}				
						}).catch(err=>{
							this.$message({
								type: 'info',
								message: '添加失败!'
							});
							this.loadingA=false
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
			editDataBaseAlert(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var params = new URLSearchParams();
						params.append('token', this.adminToken);
						params.append('db_name',this.addOpeForm.dataBaseName);
						params.append('db_info',this.addOpeForm.dataBaseInfo);
						params.append('db_id',this.addOpeForm.dataID);
						editDataListDBLocal(window.sessionStorage.ApiUrl,params).then((res)=>{
							if(res.data.status==200){						
								this.$message({
								type: 'success',
								message: '添加成功!'
								});
								this.loadingA=false;
								this.alertIsShow=false;
								this.handleCurrentChange(1);
							}else if(res.data.status == 201){
								this.$message({
									type: 'info',
									message: 'token失效，为保障账户安全，请重新登陆'
								});						 
								window.localStorage.clear()
								window.window.sessionStorage.setItem('isLogin','0')
								this.$router.push('/login'); 
							}else if(res.data.status == 300){
								this.$message({
									type: 'info',
									message: '请选择函数'
								});	
								this.loadingA=false
							}else if(res.data.status == 401){
								this.$message({
									type: 'info',
									message: '该数据库名字已存在，请更改!'
								});	
								this.loadingA=false
							}else{
								this.$message({
								type: 'info',
								message: '添加失败!'
								});
								this.loadingA=false
							}				
						}).catch(err=>{
							this.$message({
								type: 'info',
								message: '添加失败!'
							});
							this.loadingA=false
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
				var dbID=row.id
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then((row) => {
					delDataListDBLocal(window.sessionStorage.ApiUrl,{
						token:this.adminToken,
						db_id:dbID
					}).then(res=>{		
						if(res.data.status==200){						
							this.$message({
							type: 'success',
							message: '删除成功!'
							});
							this.loading=false;
							this.handleCurrentChange(1);
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
			selectChange(){

			},
			addDataBase(){
				this.alertIsShow=true
				this.addOpeForm.dataBaseName='';
				this.addOpeForm.dataBaseInfo='';
				this.addOpeForm.funID='';
				this.addOpeForm.btnIsAdd=true;
			},
			editDataBase(row){
				let rows=row
				this.alertIsShow=true
				this.addOpeForm.dataBaseName=rows.dbName;
				this.addOpeForm.dataBaseInfo=rows.dbInfo;
				this.addOpeForm.funID=rows.funId;
				this.addOpeForm.btnIsAdd=false;
				this.addOpeForm.dataID=rows.id;
			},
			searchDataListDB(){
				getDataListDBLocal(window.sessionStorage.ApiUrl,{
					token:this.adminToken,
					db_name:this.search.name
				}).then(res=>{		
					if(res.data.status==200){	
						this.showPages=res.data.data.length
						this.tableData=res.data.data
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
			//分页
		    handleCurrentChange(val) {
		        var page=val;
		        getDataListDBLocal(window.sessionStorage.ApiUrl,{
					token:this.adminToken,
					db_name:this.search.name
				}).then(res=>{		
					if(res.data.status==200){						
						var tableD=res.data.data;
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
				getDataListDBLocal(window.sessionStorage.ApiUrl,{
					token:this.adminToken
				}).then(res=>{		
					if(res.data.status==200){	
						this.showPages=res.data.data.length
						this.tableData=res.data.data
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
				chooseFunID:'',
				downLoadBaseUrl:'',
				uploadUrl:'',
				showPages:0,
				adminToken:'',
				addOpeForm:{
					dataBaseName:'',
					dataBaseInfo:'',
					btnIsAdd:true,
					funID:'',
					dataID:''
				},
				alertIsShow:false,
				loading:true,
				loadingA:false,
				search:{
					name:''
				},
				funList:[],
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
			max-height:400px;
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