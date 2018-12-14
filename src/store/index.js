import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);//注册模块

const store = new Vuex.Store({


	state:{
		adminLoginname:"",
		adminToken:"", 
		editUserToken:"",
		editUser:[],
		editFncToken:"",
		editModelToken:"",
		fncTitle:"上传函数",
		fncNameD:"",
		search_login_name:'',
		search_fun_name:'',
		tableShowData:{},
		inputDataLocal:[]
	},

	actions:{
		
//		getCommingsoonList(store){
//			axios.get("/v4/api/film/coming-soon?page=1&count=7").then(res=>{
//				console.log(res.data);
//
//				store.commit("getCommingsoonListMutation",res.data.data.films);
//			})
//		}
	},

	mutations:{
		changeInputDataLocal(state,data){
			state.inputDataLocal=data
		},
		
		comTableShowData(state,data){
			state.tableShowData=data
		},
		myChangeSearchLoginName(state,name){
			state.search_login_name=name
		},
		myChangeSearchFncName(state,name){
			state.search_fun_name=name
		},
		myChangeAdminToken(state,payload){
			//接受commit 提交来的数据
			state.adminLoginname=payload.loginName;
			state.adminToken = payload.userToken;
		},
		myChangeEditForm(state,form){
			state.editUserToken=form.userToken;
			state.editUser = form;
		},
		myChangefncTitle(state,title){
			state.fncTitle=title
		},
		myChangeFncNameD(state,fnc){
			state.fncNameD=fnc
		}
	}
})
//store 一个“全局对象”

export default store;