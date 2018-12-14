import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)




import Login from "../pages/login"

import Home from "../pages/home"
import Indexx from "../pages/manage/index"


//function
import FncM from "../pages/manage/fncManagement"

import UploadFnc from "../pages/manage/function/uploadFnc"
import ParaEdit from "../pages/manage/function/paraEdit"
import AddParaB from "../pages/manage/function/addParaB"
//model
import Model from "../pages/manage/model"

import AddModel from "../pages/manage/model/addModel"
import ParaInd from "../pages/manage/model/paraInd"
import EditModelPara from "../pages/manage/model/editModelPara"
import Modelblank from "../pages/manage/model/modelblank"

//operation
import Operation from "../pages/manage/operation"

import OperationBlank from "../pages/manage/operation/opeblank"
import AddOperation from "../pages/manage/operation/addOperation"
import EditOperation from "../pages/manage/operation/editOperation"
//users
import Users from "../pages/manage/users"

import Usercon from "../pages/manage/usercon"

import Datan from "../pages/manage/datan"
import Datal from "../pages/manage/datal"

import CreateUser from "../pages/manage/user/createUser"
import Userblank from "../pages/manage/user/userblank"
import UserCblank from "../pages/manage/user/userCblank"
//import Userst from "../pages/manage/userst"
import History from "../pages/manage/history"
import Hisblank from "../pages/manage/user/hisblank"

//data

import UseFnc from "../pages/manage/datan/useFnc"
import DataBindL from "../pages/manage/datan/dataLBind"
import DataShowN from "../pages/manage/datan/dataShow"
import DataShowL from "../pages/manage/datan/dataShowl"

export default new Router({
  routes: [
  
	{
    	path:"/",
    	component:Home,
			// meta:["个人账户"],
			// meta:{auth: true},
    	children:[
				{
				  path:"/",
				  component:Indexx,
					// meta:["首页"]
					meta:{auth: true}
				},
    		{
				  path:"/index",
				  component:Indexx,
					meta:{auth: true}
				},
		    {
		    	path:"/history",
		    	component:History,
					// meta:["历史查询"]
					meta:{auth: true}
		    },
		    {
		    	path:"/users",
		    	component:Users,
					// meta:["用户管理"],
					meta:{auth: true},
					children:[]
				},
				{
		    	path:"/data",
		    	component:Datan,
					// meta:["计算数据管理"],
					meta:{auth: true},
					children:[]
				},
				{
		    	path:"/datal",
		    	component:Datal,
					// meta:["本地数据管理"],
					meta:{auth: true},
					children:[]
				},
				{
		    	path:"/data/datashow/:id",
		    	component:DataShowN,
					// meta:["查看计算数据"],
					meta:{auth: true}
				},
				{
		    	path:"/datal/datashowl/:id",
		    	component:DataShowL,
					// meta:["查看本地数据"],
					meta:{auth: true}
				},
				{
		    	path:"/usercon",
		    	component:Usercon,
					// meta:["系统日志"],
					meta:{auth: true},
					children:[]
		    },
		    {
		    	path:"/operation",
		    	component:Operation,
					// meta:["业务管理"]
					meta:{auth: true}
				},
				{
		    	path:"/opeblank",
		    	component:OperationBlank,
					// meta:["业务刷新"]
					meta:{auth: true}
		    },
		    {
		    	path:"/model",
		    	component:Model, 
					// meta:["模块管理"]
					meta:{auth: true}
		    },
		    {
		    	path:"/fnc",
		    	component:FncM,
					// meta:["函数管理"],
					meta:{auth: true}
    		},
    		{
				  path:"/fnc/uploadfnc/:id",
				  component:UploadFnc,
					// meta:["上传函数"]
					meta:{auth: true}
				},
    		{
				  path:"/data/bind/:id",
				  component:UseFnc,
					// meta:["绑定数据"]
					meta:{auth: true}
				},
				{
				  path:"/datal/bindl/:id",
				  component:DataBindL,
					// meta:["绑定数据"]
					meta:{auth: true}
				},
    		{
				  path:"/paraedit",
				  component:ParaEdit,
					// meta:["编辑参数"]
					meta:{auth: true}
				},
				{
				  path:"/fnc/addParaB/:id",
				  component:AddParaB,
					// meta:["编辑参数刷新"]
					meta:{auth: true}
				},
    		{
				  path:"/model/addmodel/:id",
				  component:AddModel,
					// meta:["添加模块关联函数"]
					meta:{auth: true}
				},
				{
				  path:"/model/editmodpara/:id",
				  component:EditModelPara,
					// meta:["添加模块参数描述"]
					meta:{auth: true}
				},
				{
				  path:"/modelblank",
				  component:Modelblank,
					// meta:["刷新模块"]
					meta:{auth: true}
				},
    		{
				  path:"/model/paraind/:id",
				  component:ParaInd,
					// meta:["参数描述"]
					meta:{auth: true}
				},
    		{
				  path:"/operation/addope/:id",
				  component:AddOperation,
					// meta:["新增业务"]
					meta:{auth: true}
				},
    		{
				  path:"/operation/editope/:id",
				  component:EditOperation,
					// meta:["编辑业务"]
					meta:{auth: true}
				},
    		{
				  path:"/users/createuser/:id",
				  component:CreateUser,
					//meta:["创建用户"]
					meta:{auth: true}
				},
    		{
				  path:"/userblank",
				  component:Userblank,
					// meta:["用户刷新"]
					meta:{auth: true}
				},
				{
				  path:"/hisblank",
				  component:Hisblank,
					// meta:["用户刷新"]
					meta:{auth: true}
				},
    		{
				  path:"/users/userCblank/:id",
				  component:UserCblank,
					// meta:["用户刷新"]
					meta:{auth: true}
				}
    	]
    },
    {
		  path:"/login",
			component:Login,
		},
		{
		  path:"/",
			component:Home,
		},
    {
    	path:"*",
			redirect:"/",
    }
  ]
})
