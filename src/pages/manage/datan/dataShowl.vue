
<template>
	<div class="content-views">
		<div class="content-views-nav">
			<p class="title-view">{{dataBaseNameH}}</p>
			<div class="mbanav-r">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/datal' }">本地数据库</el-breadcrumb-item>
					<el-breadcrumb-item>查看数据库</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="content-views-head">
			<div class="content-views-head-r">			
				<el-button size="small" @click="addDataBaseH" type="primary">添加数据</el-button>
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
				@selection-change="handleSelectionChange"
				style="text-align: center;min-width: 1000px;" size="medium">
				<el-table-column type="selection">
				</el-table-column>
			    <el-table-column type="index">
			    </el-table-column>
				<el-table-column label="操作" width="80">
					<template slot-scope="scope">
						<el-button @click="editDataBaseH(scope.row)" type="text" size="small"><i class="el-icon-edit"></i>&nbsp;编辑</el-button>
					</template>
				</el-table-column>
				<el-table-column v-for="item,index in inputData" :prop="'inputDataChange.'+index+'.'+item.dbAttr" :label="item.dbAttr" :key="item.id">
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
			<div class="btn-left-bottom">
				<el-button size="small" @click="deleteRow" type="danger">批量删除</el-button>
			</div>
			<el-button size="small" @click="backToDataList" type="danger" style="position:absolute;bottom:10px;right:10px;">返回</el-button>
		</div>
		<div class="content-view-alert" v-if="alertIsShow">
			<h4>选择参数数据</h4>
				<el-form ref="attrs" label-width="80px" class="add-addOpeForm-form demo-addOpeForm" size="small" :model="attrs">
					<el-form-item label-width="0px" class="add-model-form-btn">
						<el-select v-model="attrs" multiple placeholder="请选择" style="width:280px;" filterable>
							<el-option
							v-for="item in inputData"
							:key="item.key"
							:label="item.key"
							:value="item.key"
							>
							</el-option>
						</el-select>
				    </el-form-item>	
					<el-form-item label-width="0px" class="add-model-form-btn">
						<el-button @click="dataListCompare" size="small" type="primary" class="add-model-form-btn1">确定</el-button>   
						<el-button @click="closeAlertNow" size="small" type="primary" class="add-model-form-btn2">取消</el-button>   
				    </el-form-item>	
				</el-form>
		</div>
		<div class="table-show" v-if="tableIsShow">
			<div class="charts" style="position:relative;">
				<tableShow></tableShow>
				<el-button type="text" @click="closeTableShow" style="font-size:20px; position:absolute;right:20px;top:5px;"><i class="el-icon-circle-close-outline"></i></el-button>
			</div>
		</div>
		<div class="content-view-add" v-if="addIsShow">
			<h4>{{addDataName}}</h4>
				<el-form label-width="80px" class="add-addOpeForm-form demo-addOpeForm" size="small" :model="addInputDataList" ref="addInputDataList">
					<div class="data-cont">
						<el-form-item
						 label-width="180px"
						 v-for="item,index in addInputDataList.addInputData"
						 :label="item.dbAttr" 
						 :key="item.id" 
						 :inline="true" 
						 style="width:380px;float:left;"
						 :prop="'addInputData.'+index+'.attrValue'"
						 :rules="{required: true, message: '参数值不能为空', trigger: 'blur'}">
							<el-input v-model="item.attrValue" placeholder="请输入参数值"  style="width:180px;"></el-input>
						</el-form-item>	
					</div>
					<el-form-item label-width="0px" class="add-model-form-btn">
						<el-button @click="addAddNow('1')" v-if="!editRow" size="small" type="primary" class="add-model-form-btn1">确定</el-button>
						<el-button @click="editAddNow('0')" v-if="editRow" size="small" type="primary" class="add-model-form-btn1">确定</el-button>   
						<el-button @click="closeAddNow" size="small" type="primary" class="add-model-form-btn2">取消</el-button>   
				    </el-form-item>	
				</el-form>
		</div>
	</div>
</template>


<style lang="scss" scoped>
	.content-views {
		display:flex;
		flex-direction: column;
		height: 100%;
		position: relative;
		.table-show{
			width:100%;
			height:100%;
			position: absolute;
			top:0;
			left:0;
			background: rgba(0,0,0,.8);
			text-align: center;
			z-index:1000;
			.charts{
				margin:100px auto 0;
				width:1000px;
			}
		}
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
				text-align:right;
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
		.content-view-add{
			width:900px;
			position: absolute;
			top:50%;
			left:50%;
			margin-left: -450px;
			margin-top:-350px;
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
			.data-cont{
				height:500px;
				margin-left:20px;
				border:1px solid #dcdfe6;
				border-radius: 4px;
				padding:20px 15px 0px 0;
				overflow-y: auto;
				overflow-x: hidden;
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
				margin-right: 100px;
				float:right;
				line-height: 40px;
				.el-pagination{
					padding:10px 0 0 0;
				}
			}
		}
		.content-views-body{
			padding:0px 10px 0;
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
			.content-views-head-r{
				float: right;
			}
		}
	}
</style>

<script>
import tableShow from "../../../common/tableShow1.vue";
import {addResultDBDataLocal,delResultDBDataLocal,editResultDBDataLocal,getResultDBDataLocal,getDataBindLocal} from '../../../api/api';
	export default{
		components: {
			tableShow
		},
		methods: {
			addAddNow(formName){
				this.$refs['addInputDataList'].validate((valid) => {
					if (valid) {
						var inputDataObj={inputDataChange:[]}
						inputDataObj.inputDataChange=this.addInputDataList.addInputData.map(item=>{
							var attr=item.dbAttr
							item[attr]=item.attrValue
							return item;
						})
						var params = new URLSearchParams();
						params.append('token', this.adminToken);
						params.append('db_id',this.$route.params.id);
						params.append('json_object',JSON.stringify(inputDataObj));
						addResultDBDataLocal(window.sessionStorage.ApiUrl,params).then((res)=>{
							if(res.data.status==200){						
								this.$message({
								type: 'success',
								message: '添加成功!'
								});
								this.loadingA=false;
								this.addIsShow=false;
								this.inputData=this.inputData.map(res=>{
									res.attrValue='';
									return res
								});
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
						});
					} else {
						this.$message({
							type: 'error',
							message: '请检查数据是否填写规范!'
						});	
						return false;
					}
				});
				
			},
			closeAddNow(){
				this.addIsShow=false;
			},
			addDataBaseH(){
				var dataLNow=this.inputData.map(res=>{
					res.attrValue='';
					return res
				});
				this.addInputDataList.addInputData=dataLNow;
				this.editRow=false;
				this.addIsShow=true;
				this.addDataName="添加数据"
			},
			editDataBaseH(row){
				var rows=row
				this.editRow=true;
				this.addIsShow=true;
				this.rowMid=rows.mid;
				var dataLNow=this.inputData
				if(rows.inputDataChange.length==this.inputData.length){
					this.addInputDataList.addInputData=rows.inputDataChange;
				}else{
					this.addInputDataList.addInputData=dataLNow;
					for(var i=0;i<rows.inputDataChange.length;i++){
						for(var j=0;j<dataLNow.length;j++){
							if(rows.inputDataChange[i].dbAttr==this.addInputDataList.addInputData[j].dbAttr){
								this.addInputDataList.addInputData[j].attrValue=rows.inputDataChange[i].attrValue
							}
						}
					}
				}
				this.addDataName="编辑数据"
			},
			editAddNow(row){
				var rows=row
				var inputDataObj={inputDataChange:[]}
				inputDataObj.inputDataChange=this.addInputDataList.addInputData.map(item=>{
					var attr=item.dbAttr
					item[attr]=item.attrValue
					return item;
				})
				inputDataObj.db_id=this.$route.params.id;
				this.$refs['addInputDataList'].validate((valid) => {
					if (valid) {
						if(rows=="0"){
							var params = new URLSearchParams();
							params.append('token', this.adminToken);
							params.append('mid',this.rowMid);
							params.append('json_object',JSON.stringify(inputDataObj));
							editResultDBDataLocal(window.sessionStorage.ApiUrl,params).then((res)=>{
								if(res.data.status==200){						
									this.$message({
									type: 'success',
									message: '编辑成功!'
									});
									this.loadingA=false;
									this.addIsShow=false;
									this.inputData=this.inputData.map(res=>{
										res.attrValue='';
										return res
									});
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
										message: '编辑失败！'
									});	
									this.loadingA=false
								}else if(res.data.status == 401){
									this.$message({
										type: 'info',
										message: '编辑失败！'
									});	
									this.loadingA=false
								}else{
									this.$message({
									type: 'info',
									message: '编辑失败!'
									});
									this.loadingA=false
								}				
							}).catch(err=>{
							});
						}else if(rows=='1'){
							var params = new URLSearchParams();
							params.append('token', this.adminToken);
							params.append('db_id',this.$route.params.id);
							params.append('json_object',JSON.stringify(inputDataObj));
							addResultDBDataLocal(window.sessionStorage.ApiUrl,params).then((res)=>{
								if(res.data.status==200){						
									this.$message({
									type: 'success',
									message: '添加成功!'
									});
									this.inputData=this.inputData.map(res=>{
										res.attrValue='';
										return res
									});
									this.loadingA=false;
									this.addIsShow=false;
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
							});
						}
						
					} else {
						this.$message({
							type: 'error',
							message: '请检查数据是否填写规范!'
						});	
						return false;
					}
				});
			},
			closeTableShow(){
				this.tableIsShow=false;
				this.alertIsShow=false;
			},
			showAlertNow(){
				if(this.sels.length>1){
					this.alertIsShow=true;
				}else{
					this.$message({
						type: 'info',
						message: '请至少勾选两次计算记录!'
					});
				}
			},
			closeAlertNow(){
				this.alertIsShow=false;
			},
			dataListCompare(){
				this.attrs=this.attrs.join(',')
				this.mids=this.sels.map(res=>res.mid)
				this.mids=this.mids.join(',')
				getResultDBDataCom({
					token:this.adminToken,
					fun_id:window.sessionStorage.funBindID,
					mids:this.mids,
					attrs:this.attrs
				}).then(res=>{		
					if(res.data.status==200){						
						this.$message({
							type: 'success',
							message: '加载成功!'
						});
						this.$store.commit('comTableShowData',res.data.data)
						this.tableIsShow=true;
						this.loading=false;
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
			handleSelectionChange(sels) {
				this.sels = this.allSels.concat(sels)
			},
			backToDataList(){
				this.$router.push("/datal")
			},
			//删除
			deleteRow(row) {
				this.mids=this.sels.map(res=>res.mid)
				this.mids=this.mids.join(',')
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then((row) => {
					delResultDBDataLocal(window.sessionStorage.ApiUrl,{
						token:this.adminToken,
						mid:this.mids
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
			//表格css控制
			getRowClass({ row, column, rowIndex, columnIndex }) {
				if (rowIndex == 0) {
					return 'background:#ddd;color:#000;font-weight:100;font-size:10px;'
				} else {
					return ''
				}
			},
			//分页
		    handleCurrentChange(val) {
				var page=val;
				this.allSels=this.sels;
		        getResultDBDataLocal(window.sessionStorage.ApiUrl,{
					token:this.adminToken,
					db_id:this.$route.params.id,
					page_start:page,
					page_size:20
				}).then(res=>{		
					if(res.data.status==200){						
						var tableD=res.data.data.list;
						this.tableData=tableD.reverse()
						this.loading=false
						this.sels = this.allSels
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
			}	
		},
		created(){
			if(window.localStorage.isAdminId=="2"){
				this.$router.push('/index')
			}
			this.adminToken=window.localStorage.getItem('adminToken');
			this.dataBaseNameH=window.sessionStorage.dataBaseName;
			if(this.adminToken){
				getDataBindLocal(window.sessionStorage.ApiUrl,{
					token:this.adminToken,
					db_id:this.$route.params.id
				}).then(res=>{		
					if(res.data.status==200){
						var dataHere=res.data.data.reverse().map(res=>{
							res.attrValue='';
							return res
						});
						this.inputData=dataHere;
						this.$store.commit('changeInputDataLocal',dataHere);
						getResultDBDataLocal(window.sessionStorage.ApiUrl,{
							token:this.adminToken,
							db_id:this.$route.params.id,
							page_start:1,
							page_size:20
						}).then(res=>{		
							if(res.data.status==200){
								this.tableData=res.data.data.list
								this.showPages=this.tableData.length
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
						}).catch(err=>{this.loading=false});
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
				}).catch(err=>{this.loading=false});
			}else{
				this.$message({
					type: 'info',
					message: 'token失效，为保障账户安全，请重新登陆'
				});	
				this.$router.push('/login'); 
			}
		},
		mounted(){
			
		},
		data() {
			return {
				addInputDataList:{
					addInputData:[]
				},
				addDataName:'添加数据',
				editRow:false,
				rowMid:'',
				addIsShow:false,
				dataBaseNameH:'',
				tableIsShow:false,
				inputData:[],
				chooseFunID:'',
				downLoadBaseUrl:'',
				uploadUrl:'',
				showPages:0,
				adminToken:'',
				addOpeForm:{
					dataBaseName:'',
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
				allSels:[],
				sels: [],
				mids:[],
				attrs:[],
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
