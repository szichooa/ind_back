<template>
	<div id="content">
		<div id="header">
			<div class="l">
				<h1 @click="backHome()">
					<img src="../assets/logo.png"/>
					<p class="title-logo">风机主轴系统优化设计计算平台&nbsp;—&nbsp;后台管理系统</p>					
				</h1>				
				<!-- <div class="btn-nav" @click="isShowNAv">
					<i class="iconfont icon-menu"></i>
				</div> -->
			</div>
			<div class="r">
				<div class="login">					
					<p @click="toLogin">&nbsp;&nbsp;退出登录</p>
					<p @click="toEditAdminUser">|&nbsp;&nbsp;更改个人信息&nbsp;&nbsp;|</p>
					<p @click="backHome">{{adminName}}&nbsp;&nbsp;</p>
				</div>
			</div>
		</div>
		<div id="views">
			<transition name="bounce">
				<div id="navbar" v-show="isShow" :style="navWidth">
					<ul class="nav-menu">
						<router-link to="/index" tag="li" class="nav-menu-list" active-class="active"><i class="iconfont icon-home"></i>首页</router-link>
						<router-link to="/fnc" tag="li" class="nav-menu-list" active-class="active" v-if="userManagement==1"><i class="iconfont icon-tubiao-hanshu"></i>函数管理</router-link>
						<router-link to="/model" tag="li" class="nav-menu-list" active-class="active" v-if="userManagement==1"><i class="iconfont icon-mokuaiguanli"></i>模块管理</router-link>
						<router-link to="/operation" tag="li" class="nav-menu-list" active-class="active" v-if="userManagement==1"><i class="iconfont icon-yewumokuai"></i>业务管理</router-link>
						<router-link to="/datal" tag="li" class="nav-menu-list" active-class="active" v-if="userManagement==1"><i class="iconfont icon-data-base"></i>本地数据库</router-link>	
						<router-link to="/data" tag="li" class="nav-menu-list" active-class="active" v-if="userManagement==1"><i class="iconfont icon-shujukushenji"></i>计算数据库</router-link>
						<router-link to="/users" tag="li" class="nav-menu-list" active-class="active"><i class="iconfont icon-user"></i>用户管理</router-link>	
						<router-link to="/history" tag="li" class="nav-menu-list" active-class="active" v-if="userManagement==1"><i class="iconfont icon-history"></i>历史记录</router-link>
						<router-link to="/usercon" tag="li" class="nav-menu-list" active-class="active" v-if="userManagement==1"><i class="iconfont icon-xitongrizhiguanli"></i>系统日志</router-link>
					</ul>
				</div>
			</transition>
			<div class="view-cont"><router-view></router-view></div>
			
		</div>
	</div>

</template>

<script>
import ichooarouter from "../router"	
	export default {
		data() {
			return {
				userManagement:true,
				navWidth:'width:200px;',
				adminName:'',
				isCollapse: false,
				isShow:true
			};
		},
		methods: {
			isShowNAv(){
				if(this.navWidth==="width:200px;"){
					return this.navWidth='width:0px;'
				}else{
					this.navWidth="width:200px;"
				}	
			},
			toLogin(){
				this.$router.push('/login');  
				window.localStorage.clear()
				window.window.sessionStorage.setItem('isLogin','0')
			},
			toUsers(){
				this.$router.push('/users');   
			},
			toFnc(){
				this.$router.push('/fnc');   
			},
			toModel(){
				this.$router.push('/model');   
			},
			toOperation(){
				this.$router.push('/operation');   
			},
			toHistory(){
				this.$router.push('/history');   
			},
			handleOpen(key, keyPath) {
			
			},
			handleClose(key, keyPath) {
				
			},
			backHome(){
				this.$router.push('/index')
			},
			toEditAdminUser(){
				let adminId=window.localStorage.getItem('adminId')
				window.localStorage.setItem('statusDisabled',"0")
				window.localStorage.setItem('isSelfChange',"1")
				ichooarouter.push('/users/userCblank/' + adminId)
			}
		},
		mounted(){
			this.adminName=window.localStorage.getItem('adminName')
			let isAdminID=parseInt(window.localStorage.getItem('isAdminId'))
			this.userManagement=isAdminID
		},
		computed: {
			defaultActive: function() {
				return this.$route.path.replace('/', '');
			}
		}
	
	}
</script>

<style type="text/css" lang="scss" scoped>
#content{
	height:100%;
	display: flex;
	flex-direction: column;
	#header {
		flex:0 0 60px;
		z-index: 800;
		height: 60px;
		width: 100%;
		min-width:600px;
		background: #3c8dbc;
		
		.l {
			height: 60px;
			line-height: 60px;
			width: 600px;
			h1 {
				cursor: pointer;
				position: relative;
				z-index: 801;
				color: #fff;
				width: 480px;
				float: left;
				height: 60px;
				line-height: 60px;	
				text-align: left;
				text-indent: 20px;
				font-size: 16px;
				img{
					height:40px;
					margin-top:10px;
					margin-left:10px;
				}
				.title-logo{
					position: absolute;
					height:40px;
					line-height: 40px;
					top:10px;
					right:40px;
				}
			}
			.btn-nav{
				cursor: pointer;
				float:left;
				color: #fff;
				text-align: left;
				text-indent: 20px;
				height: 60px;
				line-height: 60px;
				width: 70px;
				font-size: 18px;
				
			}
			
		}
		.r {
			height: 60px;
			line-height: 60px;
			text-align: right;
			padding-right: 10px;
			.login {
				height: 60px;
				float: right;
				.routers {
					height: 60px;
					display: inline-block;
					color: #fff;
					margin: 0 5px 0;
				}
				p {
					cursor: pointer;
					height: 60px;
					float:right;
					color: #fff;
				}
			}
		}
	}
	#views{
		flex:1;
		display: flex;
		background:#eee;
		overflow-y: auto;
	}
	#navbar {
		
		transition: .5s linear width;
		height: 100%;
		left:0px;
		background: #222d32;
		overflow: hidden;
		ul {
			width:200px;
			background: #000;	
			overflow: hidden;
			.nav-menu-list{
				height:60px;
				line-height: 60px;
				font-size: 14px;
				text-align: left;
				text-indent: 18px;
				background: #222d32;
				position: relative;
				color:#b8c7ce;
				left: 0;
				cursor: pointer;	
				transition: .5s linear all;			
				i{
					display:block;
					height:60px;
					line-height: 60px;
					float: left;
					padding-left:30px;				
				}
			}
			.nav-menu-list:hover{
				background-color:rgb(27,36,40);
				left:6px;
				border-radius: 0 5px 5px 0;
				z-index: 11;
				transition: .5s linear all;	
			}
			.active{
				background-color:rgb(27,36,40);
				color:#fff;
			}	
			.navbtn{	
				width: 12px;
				overflow: hidden;
				position: absolute;
				bottom: 50%;
				transform: translateY(50%);
				z-index: 3;
				right: -6px;
				border: 1px solid #ccc;
				border-radius: 4px;				
			}
			.navbtn .el-radio-group {
				margin: 0 !important;
				position: relative;
				left:-22px;
				.el-radio-button {
					.el-radio-button__inner {
						background: #f00 !important;
					}
				}
				.el-radio-button:last-child .el-radio-button__inner {
					border-radius: 0 !important;
				}
			}
		}
	}
	.view-cont{
		transition: .5s linear all;
		flex:1;
		overflow-y:auto;
		background: #eee;
		height:100%;
		z-index: 10;
	}
	.el-menu-vertical-demo>.is-active{
		background-color:rgb(27,36,40) !important;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 100%;
	}
}

	
	
	.bounce-enter-active {
	  animation: bounce-in .5s linear;
	}
	.bounce-leave-active {
	  animation: bounce-in .5s linear;
	}
	@keyframes bounce-in {
	  0% {
		width: 0;
	    transform:translateX(-100%);
	    opacity: 0;
	  }
	  100% {
		  width:200px;
	    transform:translateX(0px);
	    opacity: 1;
	  }
	}
</style>