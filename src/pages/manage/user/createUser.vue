<template>
	<div class="content-views">
		<div class="content-views-nav">
			<p class="title-view">{{ruleForm2.title}}</p>
			<div class="mbanav-r">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/users' }">用户管理</el-breadcrumb-item>
					<el-breadcrumb-item>{{ruleForm2.title}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="content-views-body">
			<h2 class="create-users">
				{{ruleForm2.title}}
			</h2>
			<div class="content-views-body-form form-create" v-if="ruleForm2.isShow">
				<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
					<el-form-item prop="loginName" label="用户名">
						<el-input v-model="ruleForm2.loginName" size="small" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="pass">
						<el-input :type="ruleForm2.pwdType" v-model="ruleForm2.pass" auto-complete="off" size="small" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass">
						<el-input :type="ruleForm2.pwdType" v-model="ruleForm2.checkPass" auto-complete="off" size="small" placeholder="请再次输入密码"></el-input>
					</el-form-item>
					<el-form-item label="姓名" prop="name">
						<el-input v-model="ruleForm2.name" size="small" placeholder="请输入姓名"></el-input>
					</el-form-item>
					<el-form-item label="电话" prop="tel">
						<el-input v-model.number="ruleForm2.tel" size="small" placeholder="请输入11位电话号码"></el-input>
					</el-form-item>
					<el-form-item label="用户状态" size="small">
						<el-switch v-model="ruleForm2.condition" active-color="#13ce66" inactive-color="#ff4949" size="small" disabled active-icon-class="el-icon-circle-check"
						    inactive-icon-class="el-icon-circle-close">
						</el-switch>
					</el-form-item>
					<el-form-item label="管理员权限" size="small">
						<el-switch v-model="ruleForm2.isUserAdmin" active-color="#13ce66" inactive-color="#ff4949" size="small" disabled @change="changeUserAdmin" active-icon-class="el-icon-circle-check"
						    inactive-icon-class="el-icon-circle-close">
						</el-switch>
					</el-form-item>
					<el-form-item label-width="36px" style="text-align:center">
						<el-button type="primary" @click="submitForm('ruleForm2')" size='small'>创建</el-button>
						<el-button @click="backUsers" size='small'>取消</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="content-views-body-form form-edit" v-if="!ruleForm2.isShow">
				<el-form :model="ruleForm2" v-loading="ruleForm2.loading" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
				    class="demo-ruleForm">
					<el-form-item prop="loginName" label="用户名">
						<el-input v-model="ruleForm2.loginName" size="small" placeholder="用户名" value="ruleForm2.loginName"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="pass" v-if="!editUserPwdIsShow" class="is-show-pwd">
						<el-input :type="ruleForm2.pwdType" v-model="ruleForm2.pass" auto-complete="off" size="small" placeholder="请输入密码"></el-input>
						
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass" v-if="!editUserPwdIsShow" class="is-show-pwd">
						<el-input :type="ruleForm2.pwdType" v-model="ruleForm2.checkPass" auto-complete="off" size="small" placeholder="请再次输入密码"></el-input>
					</el-form-item>
					<el-form-item label="* 密码" v-if="editUserPwdIsShow" class="is-show-pwd">
						<el-input type="password" size="small" value="123456" disabled></el-input>
						
					</el-form-item>
					<el-form-item label="姓名" prop="name">
						<el-input v-model="ruleForm2.name" size="small" placeholder="请输入姓名"></el-input>
					</el-form-item>
					<el-form-item label="电话" prop="tel">
						<el-input v-model.number="ruleForm2.tel" size="small" placeholder="请输入11位电话号码"></el-input>
					</el-form-item>
					<el-form-item label="用户状态" size="small" prop="condition" v-if="isSelfChange!='1'">
						<el-switch v-model="ruleForm2.condition" active-color="#13ce66" inactive-color="#ff4949" size="small" active-icon-class="el-icon-circle-check"
						    inactive-icon-class="el-icon-circle-close">
						</el-switch>
					</el-form-item>
					<el-form-item label="管理员权限" size="small" v-if="isSelfChange!='1'">
						<el-switch v-model="ruleForm2.isUserAdmin" active-color="#13ce66" inactive-color="#ff4949" size="small" disabled @change="changeUserAdmin" active-icon-class="el-icon-circle-check"
						    inactive-icon-class="el-icon-circle-close">
						</el-switch>
					</el-form-item>
					<el-form-item label-width="36px" style="text-align:center">
						<el-button type="primary" @click="submitForm2('ruleForm2')" size='small'>保存</el-button>
						<el-button @click="backUsers" size='small'>取消</el-button>
					</el-form-item>				
				</el-form>
				<el-button class="show-pwd" type="text" v-if="!editUserPwdIsShow" @click="editUserPwd" size='small'>取消</el-button>
				<el-button class="show-pwd" type="text" v-if="editUserPwdIsShow" @click="editUserPwd" size='small'>更改</el-button>
			</div>

		</div>
	</div>
</template>

<script>
import { getUserById ,insertUser,editUserById} from '../../../api/api';
	export default {
		computed: {
			reversedCondition: function (con) {
				return this.ruleForm2.conditionN = this.ruleForm2.condition ? 1 : 0
			}
		},
		data() {
			var checkTel = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('手机号不能为空'));
				} else {
					const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
					if (reg.test(value)) {
						callback();
					} else {
						return callback(new Error('请输入正确的手机号'));
					}
				}
			};
			var validatePass = (rule, value, callback) => {
				const reg = /^\w{6,14}$/
				if (value === '') {
					callback(new Error('请输入6-14位字母或数字组合'));
				} else if (reg.test(value)) {
					if (this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				} else {
					return callback(new Error('请输入6-14位字母或数字组合'));
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm2.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm2: {
					title: '创建账户',
					butTon: '保存',
					name: '',
					pass: '',
					checkPass: '',
					condition: true,
					loginName: '',
					pwdType: 'password',
					conditionN: 1,
					editItem: [],
					isShow: true,
					loading: true,
					tel: '',
					isUserAdmin:true,
					editForm: {}
				},
				rules2: {
					pass: [{
							validator: validatePass,
							trigger: 'blur'
						},
						{
							min: 6,
							max: 14,
							message: '密码长度在6 到 14 个字符',
							trigger: 'blur'
						},
						{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						}
					],
					checkPass: [{
							validator: validatePass2,
							trigger: 'blur'
						},
						{
							min: 6,
							max: 14,
							message: '长度在6 到 14 个字符',
							trigger: 'blur'
						},
						{
							required: true,
							message: '请再次输入密码',
							trigger: 'blur'
						}
					],
					loginName: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 5,
							max: 11,
							message: '长度在5 到 11 个字符',
							trigger: 'blur'
						}
					],
					tel: [{
						required: true,
						validator: checkTel,
						trigger: 'blur'
					}, ],
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				adminToken:'',
				editUserToken:'',
				editUserPwdIsShow:true,
				userAdminNum:'',
				isAdminID:'',
				isSelfChange:''
			}
		},
		created() {
			this.adminToken=window.localStorage.getItem('adminToken')
			this.editUserToken=window.localStorage.getItem('editUserToken')
			let adminID=window.localStorage.getItem('adminId')
			this.isAdminID=parseInt(window.localStorage.getItem('isAdminId'))
			if(window.localStorage.isSelfChange){
				this.isSelfChange=window.localStorage.isSelfChange;
			}
			if(this.isAdminID==1){
				this.userAdminNum=2;
				this.ruleForm2.isUserAdmin=true;
			}else if(this.isAdminID==2){
				this.userAdminNum=0;
				this.ruleForm2.isUserAdmin=false;
			}
			if (this.$route.params.id != 9999&&this.$route.params.id!=adminID) {
				getUserById(window.sessionStorage.ApiUrl,{
					"is_admin":this.isAdminID,
					'id': this.$route.params.id,
					'token': this.editUserToken
				}).then(res => {
					if (res.data.status == 200) {
						this.ruleForm2.editForm = res.data.data;
						this.ruleForm2.loginName = this.ruleForm2.editForm.loginName
						this.ruleForm2.tel = this.ruleForm2.editForm.userPhone
						this.ruleForm2.name = this.ruleForm2.editForm.userName
						this.ruleForm2.condition = Boolean(this.ruleForm2.editForm.userStatus)
						this.ruleForm2.loading = false
					}else if(res.data.status == 201){
						this.$message({
							type: 'info',
							message: 'token失效，为保障账户安全，请重新登陆'
						});						 
						window.localStorage.clear()
						window.window.sessionStorage.setItem('isLogin','0')
						this.$router.push('/login'); 
					}else if(res.data.status == 400){
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
					}				
				}).catch(err => {
					this.ruleForm2.loading = false
				})
			}else{
				this.ruleForm2.loading = false
			}
		},
		mounted() {
			let adminID=window.localStorage.getItem('adminId')
			if (this.$route.params.id == 9999) {
				this.ruleForm2.butTon = "创建";
				this.ruleForm2.isShow = true;
				if(window.localStorage.isAdminId=="1"){
					this.ruleForm2.title = "创建账户管理员";
				}else if(window.localStorage.isAdminId=="2"){
					this.ruleForm2.title = "创建普通账户";
				}
			} else if(this.$route.params.id==adminID){
				this.ruleForm2.title = "编辑账户信息";
				this.ruleForm2.butTon = "保存";
				this.ruleForm2.isShow = false
				this.ruleForm2.loginName = window.localStorage.getItem('loginName')
				this.ruleForm2.tel = window.localStorage.getItem('adminPhone')
				this.ruleForm2.name = window.localStorage.getItem('adminName')
			}else{
				this.ruleForm2.butTon = "保存";
				this.ruleForm2.isShow = false;
				if(window.localStorage.isAdminId=="1"){
					this.ruleForm2.title = "编辑账户管理员";
				}else if(window.localStorage.isAdminId=="2"){
					this.ruleForm2.title = "编辑普通账户";
				}
			}
		},
		methods: {
			changeUserAdmin(){
				if(this.ruleForm2.isUserAdmin==true){
					this.userAdminNum=2
				}else if(this.ruleForm2.isUserAdmin==false){
					this.userAdminNum=0
				}
			},
			changeConditionN() {
				if (this.ruleForm2.condition) {
					return this.ruleForm2.conditionN = 1
				} else {
					return this.ruleForm2.conditionN = 0
				};
			},
			editUserPwd() {
				this.editUserPwdIsShow = !this.editUserPwdIsShow
			},
			//创建请求处理
			submitForm(formName) {
				let adminID=window.localStorage.getItem('adminId')
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$confirm('请您确认创建操作', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							//确认后执行函数
							var params = new URLSearchParams();
							params.append('login_name',  this.ruleForm2.loginName);
							params.append('login_pwd',this.ruleForm2.pass);
							params.append('user_phone', this.ruleForm2.tel);
							params.append('user_name',this.ruleForm2.name);
							params.append('token',this.adminToken);	
							params.append('is_admin',this.userAdminNum);
							insertUser(window.sessionStorage.ApiUrl,params).then(res => {								
								if (res.data.status == 200) {
									this.$message({
										type: 'success',
										message: '创建成功!'
									});
									this.$router.push('/users');
								}else if(res.data.status == 201){
									this.$message({
										type: 'info',
										message: 'token失效，为保障账户安全，请重新登陆'
									});						 
									window.localStorage.clear()
									window.window.sessionStorage.setItem('isLogin','0')
									this.$router.push('/login'); 
								} else if (res.data.status == 401) {
									this.$message({
										type: 'info',
										message: '该用户名已拥有,请更改用户名'
									});
								} else {
									this.$message({
										type: 'info',
										message: '创建失败'
									});
								}
							}).catch(err => {
								this.$message({
									type: 'info',
									message: '创建失败'
								});
							})
						}).catch();
					} else {
						this.$message({
							type: 'info',
							message: '请确认填写内容是否符合验证规则'
						});
					}
				});
			},
			//编辑请求处理
			submitForm2(formName) {
				this.changeConditionN()
				let adminID=window.localStorage.getItem('adminId')
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$confirm('请您确认编辑操作', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							//确认后执行函数
							var params = new URLSearchParams();
							params.append('id', this.$route.params.id);
							params.append('login_name',  this.ruleForm2.loginName);
							params.append('login_pwd',this.ruleForm2.pass);
							params.append('user_phone', this.ruleForm2.tel);
							params.append('user_name',this.ruleForm2.name);
							params.append('user_status',  this.ruleForm2.conditionN);
							params.append('token',this.adminToken);
							if(window.localStorage.isSelfChange!='1'){
								params.append('is_admin',this.userAdminNum);
							}
							editUserById(window.sessionStorage.ApiUrl,params).then(res => {
								if (res.data.status == 200) {
									if(this.$route.params.id==adminID){
										this.$message({
											type: 'success',
											message: '保存成功，请重新登录账户！'
										});	
										this.$router.push('/login');  
										window.localStorage.clear()
										window.window.sessionStorage.setItem('isLogin','0')
									}else{
										this.$router.push('/users');
										this.$message({
											type: 'success',
											message: '保存成功!'
										});	
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
										message: '保存失败'
									});
								}
							}).catch(err => {
								this.$message({
									type: 'info',
									message: '保存失败'
								});
							});
						}).catch();
					} else {
						this.$message({
							type: 'info',
							message: '请确认内容是否全部填写正确'
						});
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			backUsers() {
				this.$router.push('/users')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-views {
		display: flex;
		flex-direction: column;
		height: 100%;
		.content-views-body {
			padding: 10px 10px 0;
			flex: 1;
			height: 100%;
			overflow-y: auto;
			/*background: #fff;*/
			position: relative;

			.create-users {
				padding-left: 15px;
				margin-bottom: 20px;
			}
			.content-views-body-form {
				border-radius: 5px;
				border: 1px solid #ccc;
				background: #fff;
				width: 350px;
				padding: 40px 55px 10px 30px;
				position: relative;
				left: 50%;
				margin-left: -220px;
				.show-pwd {
					position: absolute;
					top: 103px;
					right: 50px;
					height:40px;
				}
				.is-show-pwd{
					position: relative;
					padding-right:50px;
					
				}
			}
		}
		.content-views-nav {
			border-bottom: 1px solid #909290;
			flex: 0 0 20px;
			line-height: 20px;
			padding: 10px 15px 0;
			font-size: 12px;
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
	}
</style>
