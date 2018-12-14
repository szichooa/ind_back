<template>
	<div class="content-views">
		<div class="content-views-nav">
			<p class="title-view">模块管理</p>
			<div class="mbanav-r">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>模块管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="content-views-head">
			<div class="content-views-head-r">
				<el-button size="small" @click="addModel()" type="primary">添加模块</el-button>
			</div>
		</div>
		<div class="content-views-body">
			<el-table ref="multipleTable" size="medium" tooltip-effect="light" border :data="tableData" height="100%" highlight-current-row style="text-align: center;" :header-cell-style="getRowClass" v-loading="loading">
				<el-table-column type="index">
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" width="200" sortable>
					<template slot-scope="scope">{{ scope.row.createTime }}</template>
				</el-table-column>
				<el-table-column prop="modularName" label="模块名字">
				</el-table-column>
				<el-table-column prop="modularDesc" label="模块描述" :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column prop="modularFuns" label="关联函数" :show-overflow-tooltip="true">
				</el-table-column>			
				<el-table-column prop="date" label="关联操作" width="150" >
					<template slot-scope="scope">
						<el-button @click="editModelFnc(scope.row)" type="text" size="small"><i class="el-icon-edit"></i>&nbsp;编辑关联函数</el-button>					
					</template>
				</el-table-column>
				<el-table-column label="模块操作" width="150">
					<template slot-scope="scope">
						<el-button @click="editmodel(scope.$index, tableData)" type="text" size="small">
							<i class="el-icon-edit"></i>&nbsp;编辑
						</el-button>
						<el-button @click="deleteRow(scope.$index, scope.row)" type="text" size="small" style="color:#f00">
							<i class="el-icon-delete"></i>&nbsp;删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="add-model" v-if="addModelAlert">
				<h4>模块基本信息</h4>
				<el-form :model="addModelForm" ref="addModelForm" label-width="80px" class="add-model-form demo-addModelForm" size="small">
					<el-form-item label="模块名字" prop="modelName" :rules="[
					{required: true, message: '名字不能为空', trigger: 'blur'},
					{min: 3,max: 20,message: '长度在3 到 20 个字符,名字唯一',trigger: 'blur'}]">
					  	<el-input v-model="addModelForm.modelName" placeholder="请输入模块名字" ></el-input>
				    </el-form-item>	
				    <el-form-item label="模块描述" prop="modelDes" :rules="[{
					required: true, message: '描述不能为空', trigger: 'blur'
					}]">
					  	<el-input type="textarea" v-model="addModelForm.modelDes" placeholder="请输入模块描述" style="max-height:80px;overflow:hidden;"></el-input>
				    </el-form-item>	
					<el-form-item label-width="0px" class="add-model-form-btn">
					  	<el-button @click="addModule('addModelForm')" size="small" type="primary" class="add-model-form-btn1" v-if="addModelForm.btnIsAdd">添加</el-button>
						<el-button @click="editModule('addModelForm')" size="small" type="primary" class="add-model-form-btn1" v-if="!addModelForm.btnIsAdd">保存</el-button>
						<el-button @click="exitAddModule" size="small" type="primary" class="add-model-form-btn2">取消</el-button>   
				    </el-form-item>	
				</el-form>
			</div>
		</div>
		<div class="content-view-bottom">

			<div class="fy-right-bottom">
				<el-pagination @current-change="handleCurrentChange" :current-page="currentPage4" layout="total, prev, pager, next ,jumper" :page-size=20
				    :total='showPages'>
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import ichooarouter from "../../router"
import {insertModular,getModularList,editModularById,delModularById} from '../../api/api';
	export default {
		methods: {
			getRowClass({ row, column, rowIndex, columnIndex }) {
				if (rowIndex == 0) {
					return 'background:#ddd;color:#000;'
				} else {
					return ''
				}
			},
			//alert保存
			addModule(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						insertModular(window.sessionStorage.ApiUrl,{
								token:this.adminToken,
								mod_name:this.addModelForm.modelName,
								mod_desc:this.addModelForm.modelDes
						}).then(res=>{
							if(res.data.status==200){
								this.$message({
								type: 'success',
								message: '添加成功!'
								});		
								this.$router.push('/modelblank');
								this.addModelAlert=false;
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
									message: '该模块名字已存在，请更改!'
								});	
							}else{
								this.$message({
								type: 'info',
								message: '添加失败!'
								});
							}				
						}).catch();
					} else {
						this.$message({
							type: 'info',
							message: '请检查填写内容!'
						});
						return false;
					}
        		});	
			},	
			//alert编辑
			editModule(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						editModularById(window.sessionStorage.ApiUrl,{
								token:this.adminToken,
								mod_name:this.addModelForm.modelName,
								mod_desc:this.addModelForm.modelDes,
								mod_id:this.addModelForm.modelId
						}).then(res=>{
							if(res.data.status==200){
								this.$message({
								type: 'success',
								message: '编辑成功!'
								});		
								this.$router.push('/modelblank');
								this.addModelAlert=false;
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
							}				
						}).catch();
					} else {
						this.$message({
							type: 'info',
							message: '请检查填写内容!'
						});
						return false;
					}
        		});	
				
			},		
			//取消操作
			exitAddModule(){
				this.addModelAlert=false;
			},
			editModelPara(row){
				window.sessionStorage.setItem('modelName',row.modularName)
				window.sessionStorage.setItem('modelDes',row.modularDesc)
				ichooarouter.push('/model/editmodpara/'+row.id);
			},
			editModelFnc(row){
				window.sessionStorage.setItem('modelName',row.modularName)
				window.sessionStorage.setItem('modelDes',row.modularDesc)
				//this.$router.push('/editmodel')
				ichooarouter.push('/model/addmodel/'+row.id);
			},
			handleCurrentChange(val) {
				this.loading=true;
				var page = val;
				getModularList(window.sessionStorage.ApiUrl,{
					token:this.adminToken,
					page_start:page,
					page_size:20
				}).then(res=>{
					if(res.data.status==200){					
						var tableD=res.data.data.list
						for(var j =0;j<tableD.length;j++){
							if(tableD[j].modularFuns!=null){
								tableD[j].modularFuns=tableD[j].modularFuns.map(value=>value.funName).join(',')	
							}else if(tableD[j].modularFuns==null){
								tableD[j].modularFuns="无"
							}
						};
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
				})
			},
			toggleSelection(rows) {
				this.$refs.multipleTable.clearSelection();
			},
			//添加模块
			addModel(){
				this.addModelAlert=true;
				this.addModelForm.modelName=''
				this.addModelForm.modelDes=''
				this.addModelForm.btnIsAdd=true
			},
			//编辑模块
			editmodel(index, rows){
				this.addModelAlert=true;
				this.addModelForm.modelId=rows[index].id
				this.addModelForm.modelName=rows[index].modularName
				this.addModelForm.modelDes=rows[index].modularDesc
				this.addModelForm.btnIsAdd=false
			},			
			deleteRow(index, row) {
				var _modID=row.id
				this.$confirm('此操作将永久删除该模块, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delModularById(window.sessionStorage.ApiUrl,{
							token:this.adminToken,
							mod_id:_modID
					}).then(res=>{
						if(res.data.status==200){
							this.$message({
							type: 'success',
							message: '删除成功!'
							});		
							this.$router.push('/modelblank');
							this.addModelAlert=false;
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
							message: '删除失败'
						});
					});
				}).catch(()=>{
					return false
				});
			},
			uploadFnc() {
				this.$router.push('/uploadfnc')
			}
		},
		created() {
			if(window.localStorage.isAdminId=="2"){
				this.$router.push('/index')
			}
			this.showData = this.tableData;
			this.adminToken=window.localStorage.getItem('adminToken')
		},
		mounted(){
			if(this.adminToken){
				getModularList(window.sessionStorage.ApiUrl,{
						token:this.adminToken,
						page_start:1,
						page_size:20
				}).then(res=>{
					if(res.data.status==200){					
						var tableD=res.data.data.list;
						for(var j =0;j<tableD.length;j++){
							if(tableD[j].modularFuns!=null){
								tableD[j].modularFuns=tableD[j].modularFuns.map(value=>value.funName).join('，')	
							}else if(tableD[j].modularFuns==null){
								tableD[j].modularFuns="无"
							}
						};
						this.showPages=res.data.data.total
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
					}else if(res.data.status == 300){				 
						this.loading=false
					}else{
		          		this.$message({
						type: 'info',
						message: '加载失败!'
						});
						this.loading=false
		          	}				
				}).catch(err=>{
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
				showPages:0,
				adminToken:'',
				loading:true,
				addModelAlert:false,
				addModelForm:{
					modelName:'',
					modelDes:'',
					btnIsAdd:true,
					modelId:''
				},
				currentPage4: 1,
				visible2: false,
				showData: [],
				form: {
					idcard: '',
					password: '',
					name: '',
					tel: '',
					condition: true
				},
				tableData: []
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content-views {
		display: flex;
		flex-direction: column;
		height: 100%;
		.content-views-nav {
			border-bottom: 1px solid #909290;
			flex: 0 0 20px;
			line-height: 20px;
			padding: 10px 15px 0;
			font-size: 12px;
			min-width: 990px;
			.title-view {
				float: left;
				padding-left: 10px;
				font-size: 14px;
				font-weight: 600;
			}
			.mbanav-r {
				float: right;
				.el-breadcrumb {
					height: 20px;
					line-height: 20px;

					font-size: 12px;
				}
			}
		}
		.content-view-bottom {
			flex: 0 0 50px;
			padding: 0 15px 0;
			min-width:1000px;
			line-height: 50px;
			.btn-left-bottom {
				float: left;
				width: 300px;
				height: 50px;
			}
			.fy-right-bottom {
				float: right;
				line-height: 40px;
				.el-pagination {
					padding: 10px 0 0 0;
				}
			}
		}
		.content-views-body {
			min-width:1000px;
			padding: 0 10px 0;
			flex: 1;
			height: 100%;
			overflow-y: auto;
			position: relative;
			.add-model{
				width:400px;
				height:240px;
				position: absolute;
				top:50%;
				left:50%;
				margin-left: -200px;
				margin-top:-250px;
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
					padding-left:30px;
					padding-top:10px;
				}
			}
		}
		.content-views-head {
			flex: 0 0 50px;
			line-height: 50px;
			padding: 0 10px 0;
			min-width:1000px;
			.content-views-head-l {
				float: left;
			}
			.content-views-head-r {
				float: right;
			}
		}
	}
</style>




