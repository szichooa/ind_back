<template>
	<div class="content-views">
		<div class="content-views-nav">
			<p class="title-view">函数管理</p>
			<div class="mbanav-r">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>函数管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="content-views-head">
			<div class="content-views-head-l">
				<el-input v-model="search.userName" placeholder="函数名" size="small" style="width:200px;" @keyup.enter.native="getBackData"></el-input>
				<el-button type="primary" @click="getBackData" size="small" icon="el-icon-search" style="margin-left:20px;">查询</el-button>
			</div>
			<div class="content-views-head-r">
				<el-button size="small" @click="uploadFnc" type="primary">上传函数</el-button>
			</div>
		</div>
		<div class="content-views-body">
			<el-table ref="multipleTable" size="medium" border v-loading="loading" :header-cell-style="getRowClass" tooltip-effect="light" :data="tableData" height="100%" highlight-current-row style="text-align: center;">
				<el-table-column type="index">
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" sortable>
					<template slot-scope="scope">{{ scope.row.createTime}}</template>
				</el-table-column>
				<el-table-column prop="functionName" label="函数名">
				</el-table-column>
				<el-table-column prop="functionDesc" label="函数功能描述" :show-overflow-tooltip="true" >
				</el-table-column>
				<el-table-column prop="parameterNum" label="参数个数" width="100">
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button @click="paraEdit(scope.row)" type="text" size="small">
							<i class="el-icon-edit"></i>&nbsp;编辑
						</el-button>
						<el-button @click="deleteRow(scope.$index, scope.row)" type="text" size="small" style="color:#f00">
							<i class="el-icon-delete"></i>&nbsp;删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="content-view-bottom">
			<div class="fy-right-bottom">
				<el-pagination @current-change="handleCurrentChange" :current-page="currentPage4" layout="total, prev, pager, next ,jumper" :page-size=20
				    :total="total">
				</el-pagination>
			</div>
		</div>
		<div class="content-view-alert" v-if="false">
			<div class="alert-cont">
				<div class="ope-name">
					<h3>操作类型：</h3><h4></h4>
				</div>
				<div class="ope-detial">
					<h3>调用参数：</h3>
					<p></p>
				</div>
				<div class="ope-detial">
					<h3>操作结果：</h3>
					<p></p>
				</div>
				<div class="ope-button">
					<el-button type="danger" size="small" @click="showAlertNot()">返回</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ichooarouter from "../../router"
import { getFncList,delFncById} from '../../api/api';
	export default {		
		methods: {
			//表格css控制
			getRowClass({ row, column, rowIndex, columnIndex }) {
				if (rowIndex == 0) {
					return 'background:#ddd;color:#000;'
				} else {
					return ''
				}
			},
			//分页控制
			handleCurrentChange(val) {
				this.pageChange = val;
				this.loading=true;
				getFncList(window.sessionStorage.ApiUrl,{
						"page_start":this.pageChange,
						"page_size":20,
						"search_fun_name":this.$store.state.search_fun_name,
		          		"token":this.adminToken
					}).then((res) => {
						this.loading=false;
						if(res.data.status == 200){
							this.tableData=res.data.data.list;
							this.total=res.data.data.total;
							this.pages=res.data.data.pages;
							for(var i = 0;i<this.tableData.length;i++){
								this.tableData[i].userStatus=Boolean(this.tableData[i].userStatus);
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
								message: '获取列表失败!'
							});
						}
		          	})
			},
			toggleSelection(rows) {
				this.$refs.multipleTable.clearSelection();
			},
			paraEdit(row) {
				window.sessionStorage.setItem('fncTitle','edit')
				this.$store.commit('myChangefncTitle','编辑函数')
				ichooarouter.push('/fnc/uploadfnc/'+row.id)
			},
			uploadFnc() {
				window.sessionStorage.setItem('fncTitle','upload')
				this.$store.commit('myChangefncTitle','upload')
				ichooarouter.push('/fnc/uploadfnc/9999')
			},
			//删除操作
			deleteRow(index, row) {
				var rowId=row.id;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then((row) => {					
					delFncById(window.sessionStorage.ApiUrl,{
						"id":rowId,
						"token":this.adminToken
		          	}).then(res=>{	
		          		if(res.data.status==200){
			          		this.$message({
							type: 'success',
							message: '删除成功!'
							});
							this.$router.push('/paraEdit');
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
		          	}).catch(() => {
		          		this.$message({
						type: 'info',
						message: '删除失败!'
						});
		          	})
				}).catch(()=>{
					return false
				});
			},
			//查询
			getBackData(){
				this.loading=true;
				getFncList(window.sessionStorage.ApiUrl,{
					"page_start":1,
		        	"page_size":20,
		        	"search_fun_name":this.search.userName,
		    		"token":this.adminToken	          	
		     	}).then(res=>{	
					this.loading=false;	
					if(res.data.status==200){          
						this.tableData=res.data.data.list;
						this.total=res.data.data.total;
						for(var i = 0;i<this.tableData.length;i++){
							this.tableData[i].userStatus=Boolean(this.tableData[i].userStatus);
						}	 
						this.$store.commit('myChangeSearchFncName',this.search.userName)  
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
							message: '查询失败!'
						});
					} 
		        })
			}
		},
		mounted(){
			this.adminToken=window.localStorage.getItem('adminToken')
			if(this.adminToken){
				getFncList(window.sessionStorage.ApiUrl,{
					"page_start":this.pageChange,
					"page_size":20,
					'search_fun_name':'',
					"token":this.adminToken
				}).then((res) => {	  
					if(res.data.status==200){
						this.tableData=res.data.data.list;
						this.total=res.data.data.total;
						this.pages=res.data.data.pages;
						this.loading=false;
						for(var i = 0;i<this.tableData.length;i++){
							this.tableData[i].userStatus=Boolean(this.tableData[i].userStatus);
						}
					}else if(res.data.status == 201){
						this.$message({
							type: 'info',
							message: 'token失效，为保障账户安全，请重新登陆'
						});						 
						window.localStorage.clear()
						window.window.sessionStorage.setItem('isLogin','0')
						this.$router.push('/login'); 
						this.loading=false;
					}else{
						this.loading=false;
						this.$message({
							type: 'info',
							message: '获取失败!'
						});
					}	
				}).catch(err=>{
					this.loading=false;
				})
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
				adminToken:"",
				currentPage4:1,
				total:0,
				loading: true,
				pageChange:1,
				search: {
					name: ''
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
		position: relative;
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
			padding: 0 10px 0;
			flex: 1;
			height: 100%;
			overflow-y: auto;
			min-width:1000px;
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
		.content-view-alert{
			position: absolute;
			width:100%;
			height:100%;
			background: rgba(255,255,255,.7);
			display: flex;
			z-index: 999;
			.alert-cont{
				flex:1;
				background: #fff;
				border-radius: 4px;
				margin:10px;
				display: flex;
				flex-direction: column;
				min-width: 720px;
				h3{
					height:50px;
					line-height:50px;
					margin-left: 20px;
					display: inline-block;
					min-width:90px;
					text-align: right;
				}
				.ope-name{
					flex:0 0 50px;
					padding-top: 20px;
					h4{
						height:50px;
						line-height:50px;
						display: inline-block;
						font-size: 14px;
						margin-left: 20px;
					}
				}
				.ope-detial{
					flex:1;
					overflow-y:auto;
					p{
						margin: 0 50px;
						text-indent: 2em;
						line-height:24px;
						font-size: 14px;
						min-width: 800px;
						word-break: break-all;
					}
				}
				.ope-button{
					flex: 0 0 50px;
					text-align: right;
					padding: 20px 30px 0 0;
				}
			}
		}
	}
</style>