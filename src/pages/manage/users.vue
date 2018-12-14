<template>
	<div class="content-views">
		<div class="content-views-nav">
			<p class="title-view">用户管理</p>
			<div class="mbanav-r">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>用户管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="content-views-head">
			<div class="content-views-head-l">
				<el-input v-model="search.userName" placeholder="登录名" size="small" style="width:200px;" @keyup.enter.native="getBackData"></el-input>
				<el-button type="primary" @click="getBackData" size="small" icon="el-icon-search" style="margin-left:20px;">查询</el-button>
			</div>
			<div class="content-views-head-r">
				<el-button size="small" @click="toCreateUsers" type="primary">{{createName}}</el-button>
			</div>

		</div>
		<div class="content-views-body">
			<el-table ref="multipleTable" v-loading="loading" border :header-cell-style="getRowClass" :data="tableData" height="100%" tooltip-effect="light"
			    highlight-current-row style="text-align: center;" @selection-change="handleSelectionChange" size="medium">
				<el-table-column type="selection">
				</el-table-column>
				<el-table-column type="index">
				</el-table-column>
				<el-table-column prop="userCreatetime" label="创建时间" sortable>
					<template slot-scope="scope">{{scope.row.userCreatetime}}</template>
				</el-table-column>
				<el-table-column prop="loginName" label="登录名">
				</el-table-column>

				<el-table-column prop="userName" label="姓名">
				</el-table-column>
				<el-table-column prop="userPhone" label="电话">
				</el-table-column>
				<el-table-column prop="userStatus" label="状态" width="150">
					<template slot-scope="scope">
						<el-switch v-if="scope.row.userStatus===true" v-model="scope.row.userStatus" active-color="#13ce66" inactive-color="#ff4949"
						    disabled active-icon-class="el-icon-circle-check">
						</el-switch>
						<el-switch v-if="scope.row.userStatus===false" v-model="scope.row.userStatus" active-color="#13ce66" inactive-color="#ff4949"
						    disabled active-icon-class="el-icon-circle-close">
		 				</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small"><i class="el-icon-edit"></i>&nbsp;编辑</el-button>
						<el-button @click="deleteUserByID(scope.row)" type="text" size="small" style="color:#f00">
							<i class="el-icon-delete"></i>&nbsp;删除							
						</el-button>
					</template>
				</el-table-column>
			</el-table>

		</div>
		<div class="content-view-bottom">
			<div class="btn-left-bottom">
				<el-button type="danger" @click="batchRemove()" size="small" :disabled="this.sels.length===0">批量删除</el-button>
				<el-button @click="toggleSelection()" size="small">取消选择</el-button>
			</div>

			<div class="fy-right-bottom">
				<el-pagination @current-change="handleCurrentChange" :current-page="currentPage4" layout="total, prev, pager, next ,jumper" :page-size=20
				    :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script> 
	//	import {mapState} from 'vuex'
import { getUserList,delUserById,delUserByIds} from '../../api/api';
import ichooarouter from "../../router"
	export default {
		data() {
			return {
				createName:'创建账户',
				isAdminID:'',
				adminToken:'',
				id: 0,
				pageChange: 1,
				search: {
					userName: ''
				},
				userToken: '',
				sels: [],
				currentPage4: 1,
				visible2: false,
				showData: [],
				total: 0,
				tableData: [],
				loading: true,
				pages: 0
			}
		},
		methods: {
			//表格css控制
			getRowClass({
				row,
				column,
				rowIndex,
				columnIndex
				}) {
					if (rowIndex == 0) {
						return 'background:#ddd;color:#000;'
					} else {
						return ''
					}
			},
			//布尔值处理
			conditionChange(n) {
				if (n == 0) {
					return false;
				} else {
					return ture
				}
			},
			//分页
			handleCurrentChange(val) {
				this.pageChange = val;
				this.loading = true;
				getUserList(window.sessionStorage.ApiUrl,{
					"is_admin":this.isAdminID,
					"page_start": this.pageChange,
					"page_size": 20,
					"search_login_name":this.$store.state.search_login_name,
					"token": this.adminToken
				}).then(res => {
					if(res.data.status == 200){
						this.loading = false;
						this.tableData = res.data.data.list;
						this.total = res.data.data.total;
						this.pages = res.data.data.pages;
						for (var i = 0; i < this.tableData.length; i++) {
							this.tableData[i].userStatus = Boolean(this.tableData[i].userStatus);
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
						this.loading = false;
						this.$message({
							type: 'info',
							message: '获取列表失败!'
						});
					}
				})
			},
			//查询
			getBackData() {
				this.loading = true;
				getUserList(window.sessionStorage.ApiUrl,{
					"is_admin":this.isAdminID,
					"page_start": 1,
					"page_size": 20,
					"search_login_name": this.search.userName,
					"token": this.adminToken
				}).then(res => {
					if (res.data.status == 200) {
						this.loading = false;
						this.tableData = res.data.data.list;
						this.$store.commit('myChangeSearchLoginName',this.search.userName)
						this.total = res.data.data.total;
						for (var i = 0; i < this.tableData.length; i++) {
							this.tableData[i].userStatus = Boolean(this.tableData[i].userStatus);
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
						this.loading = false;
						this.$message({
							type: 'info',
							message: '查询失败!'
						});
					}
				}).catch(err=>{
					this.loading = false;
					this.$message({
						type: 'info',
						message: '查询失败!'
					});
				})
			},
			//取消选择
			toggleSelection(rows) {
				this.$refs.multipleTable.clearSelection();
			},
			//批量选择输出数组id
			handleSelectionChange(sels) {
				this.sels = sels;
			},
			//编辑
			handleClick(row) {
				this.$store.commit('myChangeEditForm', row)
				window.localStorage.setItem('editUserToken',row.userToken)
				window.localStorage.setItem('isSelfChange',"0")
				ichooarouter.push('/users/createuser/' + row.id)
			},

			//创建跳转
			toCreateUsers() {
				ichooarouter.push('/users/createuser/9999')
			},
			//删除
			deleteUserByID(row) {
				var rowId = row.id;
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then((row) => {
					delUserById(window.sessionStorage.ApiUrl,{
							"id": rowId,
							"token": this.adminToken
					}).then(res => {
						if (res.data.status == 200) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.$router.push('/userblank');
						}else if(res.data.status == 201){
							this.$message({
								type: 'info',
								message: 'token失效，为保障账户安全，请重新登陆'
							});						 
							window.localStorage.clear()
							window.window.sessionStorage.setItem('isLogin','0')
							this.$router.push('/login'); 
						} else {
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
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id);
				this.$confirm('确认删除选中账户吗？', '提示', {
					type: 'warning'
				}).then(() => {
					delUserByIds(window.sessionStorage.ApiUrl,{
						"ids": ids.join(","),
						"token": this.adminToken
					}).then(res=>{
						if (res.data.status == 200) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.$router.push('/userblank');
						}else if(res.data.status == 201){
							this.$message({
								type: 'info',
								message: 'token失效，为保障账户安全，请重新登陆'
							});						 
							window.localStorage.clear()
							window.window.sessionStorage.setItem('isLogin','0')
							this.$router.push('/login'); 
						} else {
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
					})
				}).catch(()=>{					
					return false
				});
			}
		},
		created() {
			if(window.localStorage.isAdminId=="2"){
				this.createName="创建普通账户"
			}else if(window.localStorage.isAdminId=="1"){
				this.createName="创建管理员"
			}
			this.adminToken=window.localStorage.getItem('adminToken')
			this.isAdminID=parseInt(window.localStorage.getItem('isAdminId'))
		},
		mounted() {
			if(this.adminToken){
				getUserList(window.sessionStorage.ApiUrl,{
					"is_admin":this.isAdminID,
					"page_start": this.pageChange,
					"page_size": 20,
					"token": this.adminToken
				}).then(res => {
					if (res.data.status == 200) {
						this.tableData = res.data.data.list;
						this.total = res.data.data.total;
						this.pages = res.data.data.pages;
						this.loading = false;
						for (var i = 0; i < this.tableData.length; i++) {
							this.tableData[i].userStatus = Boolean(this.tableData[i].userStatus);
						}
					}else if(res.data.status == 201){
						this.$message({
							type: 'info',
							message: 'token失效，为保障账户安全，请重新登陆'
						});						 
						window.localStorage.clear()
						window.window.sessionStorage.setItem('isLogin','0')
						this.$router.push('/login'); 
					} else {
						this.$message({
							type: 'info',
							message: '加载失败!'
						});
						this.loading = false;
					}
				}).catch(err => {
					this.$message({
						type: 'info',
						message: '加载失败!'
					});
					this.loading = false;
				})
			}else{
				this.$message({
					type: 'info',
					message: 'token失效，为保障账户安全，请重新登陆'
				});	
				this.$router.push('/login'); 
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
	}
</style>
