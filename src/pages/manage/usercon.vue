
<template>
	<div class="content-views">
		<div class="content-views-nav">
			<p class="title-view">系统日志</p>
			<div class="mbanav-r">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>系统日志</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="content-views-head">
			<div class="content-views-head-l">
				<el-form :model="search" ref="search" :inline="true">	
					<el-date-picker :inline="true" :picker-options="pickerOptions0" type="date" placeholder="选择起始日期" v-model="search.timeStart" style="width: 150px;" size="small"></el-date-picker>					
					<span>--</span>
					<el-date-picker :inline="true" :picker-options="pickerOptions1" type="date" placeholder="选择结束日期" v-model="search.timeEnd" style="width: 150px;" size="small"></el-date-picker>
					<el-input :inline="true" v-model="search.userNameSearch" placeholder="用户名（选填）" style="width: 150px;" size="small"></el-input>
					<el-button size="small" @click="searchHistory" type="primary" style="margin-left:20px;" icon="el-icon-search">查询</el-button>
				</el-form>
			</div>
		</div>
		<div class="content-views-body">
			<el-table ref="multipleTable" size="medium" v-loading="loading" :header-cell-style="getRowClass" border :data="tableData" height="100%" highlight-current-row style="text-align: center;" @selection-change="handleSelectionChange">				
			    <el-table-column type="index">
			    </el-table-column>
				<el-table-column prop="userName" label="姓名">
				</el-table-column>
				<el-table-column prop="funName" label="操作类型">
				</el-table-column>
				<el-table-column prop="createTime" label="操作时间" sortable>
					<template slot-scope="scope">{{ scope.row.createTime }}</template>
				</el-table-column>
				<el-table-column label="操作详情" width="120">
					<template slot-scope="scope">
						<el-button type="text" @click="showAlert(scope.row)" size="small">
							<i class="el-icon-search"></i>&nbsp;查看
						</el-button>
					</template>
				</el-table-column>
			</el-table>			
		</div>
		<div class="content-view-bottom">
			<div class="fy-right-bottom">
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page="currentPage4"
					layout="total, prev, pager, next ,jumper"
					:page-size=20
					:total='showPages'>
				</el-pagination>
			</div>
		</div>
		<div class="content-view-alert" v-if="alertShow.funShow">
			<div class="alert-cont">
				<div class="ope-name">
					<h3>操作类型：</h3><h4>{{alertShow.funName}}</h4>
				</div>
				<div class="ope-detial">
					<h3>调用参数：</h3>
					<p>{{alertShow.funParas}}</p>
				</div>
				<div class="ope-detial">
					<h3>操作结果：</h3>
					<p>{{alertShow.funResult}}</p>
				</div>
				<div class="ope-button">
					<el-button type="danger" size="small" @click="showAlertNot()">返回</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {getUserConById,ossDownBaseURL_g} from '../../api/api';
	export default {
		methods: {
			showAlertNot(){
				this.alertShow.funShow=false;
			},
			showAlert(row){
				this.alertShow.funShow=true;
				this.alertShow.funParas=row.funParas;
				this.alertShow.funResult=JSON.parse(row.funResult);
				this.alertShow.funName=row.funName;
			},
			searchHistory(){
				this.loading=true;
				if(this.search.timeStart){
					var startDate=this.search.timeStart.getFullYear()+'-'+(this.search.timeStart.getMonth()+1)+'-'+this.search.timeStart.getDate()
				}
				if(this.search.timeEnd){
					var endDate=this.search.timeEnd.getFullYear()+'-'+(this.search.timeEnd.getMonth()+1)+'-'+this.search.timeEnd.getDate()
				}
				getUserConById(window.sessionStorage.ApiUrl,{
					token:this.adminToken,
					page_start:1,
					page_size:20,
					user_name:this.search.userNameSearch,
					start_date:startDate,
					end_date:endDate
				}).then(res=>{
					if(res.data.status==200){					
						var tableD=res.data.data.list;
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
				this.loading=true;
				if(this.search.timeStart){
					var startDate=this.search.timeStart.getFullYear()+'-'+(this.search.timeStart.getMonth()+1)+'-'+this.search.timeStart.getDate()
				}
				if(this.search.timeEnd){
					var endDate=this.search.timeEnd.getFullYear()+'-'+(this.search.timeEnd.getMonth()+1)+'-'+this.search.timeEnd.getDate()
				}
				getUserConById(window.sessionStorage.ApiUrl,{
					token:this.adminToken,
					page_start:page,
					page_size:20,
					user_name:this.search.userNameSearch,
					start_date:startDate,
					end_date:endDate
				}).then(res=>{
					if(res.data.status==200){					
						var tableD=res.data.data.list;
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
		        this.sels = sels;
		    },			
			toAddOpe(){
				this.$router.push('/addope')
			}
		},
		mounted(){
			if(window.localStorage.isAdminId=="2"){
				this.$router.push('/index')
			}
			this.downLoadURL=window.sessionStorage.DownLoadUrlH+ossDownBaseURL_g
			this.showData = this.tableData;
			this.adminToken=window.localStorage.getItem('adminToken')
			this.userName=window.localStorage.getItem('adminName')
			getUserConById(window.sessionStorage.ApiUrl,{
					token:this.adminToken,
					page_start:1,
					page_size:20
			}).then(res=>{
				if(res.data.status==200){					
					var tableD=res.data.data.list;
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
		data() {
			return {
				downLoadURL:'',
				pickerOptions0: {
					disabledDate: (time) => {
						if (this.search.timeEnd != "") {
							return time.getTime() > Date.now() || time.getTime() > this.search.timeEnd;
						} else {
							return time.getTime() > Date.now();
						}

					}
				},
				pickerOptions1: {
					disabledDate: (time) => {
						return time.getTime() < this.search.timeStart || time.getTime() > Date.now();
					}
				},
				search:{
					timeStart:'',
					timeEnd:'',
					userNameSearch:''
				},
				sels: [],
				currentPage4: 1,
				visible2:false,
				showData:[],
				form: {
					idcard:'',					
					password:'',
					name: '',
					tel:'',
					condition:true
				},
				showPages:0,
				tableData: [],
				loading:true,
				adminToken:'',
				userName:'',
				alertShow:{
					funParas:'',
					funResult:'',
					funName:'',
					funShow:false
				}
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