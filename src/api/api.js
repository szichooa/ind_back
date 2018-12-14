import axios from 'axios';

// let allBaseURL='http://10.2.200.3';
// let ossDownBaseURL = 'http://10.2.200.4';//下载地址

let allBaseURL='';
let ossDownBaseURL = '';


// let fncBaseURL = localBaseURL;//函数
let fncBaseURL = allBaseURL+':8085';//函数
let modelBaseURL = allBaseURL+':8086';//模块
let userBaseURL = allBaseURL+':8084';//用户
let opeBaseURL = allBaseURL+':8083';//业务
let ossBaseURL = allBaseURL+':8087';//上传地址
let dataBaseURL = allBaseURL+':8081';//数据库


//================================================上传==========================================================================
export const ossBaseURL_g=ossBaseURL+'/oss/upload_fastdfs'+'?token='
export const ossDownBaseURL_g=ossDownBaseURL+"/"
//================================================登录==========================================================================
export const requestLogin =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${userBaseURL}/user/login`, params); };
//================================================用户==========================================================================
//获取用户列表
export const getUserList =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${userBaseURL}/user/get_user_list`, { params: params }); };
//删除用户
export const delUserById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${userBaseURL}/user/del_user_by_id`, { params: params }); };
//批量删除用户
export const delUserByIds =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${userBaseURL}/user/del_user_by_ids`, { params: params }); };
//获取用户信息
export const getUserById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${userBaseURL}/user/get_user_by_id`, { params: params }); };
//创建用户
export const insertUser =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${userBaseURL}/user/insert_user`, params); };
//编辑用户
export const editUserById =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${userBaseURL}/user/edit_user_by_id`, params); };

//获取系统日志
export const getUserConById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${userBaseURL}/user/get_user_log_list`, { params: params }); };

//================================================函数=======================================================================
//获取函数列表
export const getFncList =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${fncBaseURL}/fun/get_fun_list`, { params: params }); };
//删除函数
export const delFncById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${fncBaseURL}/fun/del_fun_by_id`, { params: params }); };
//获取函数信息
export const getFncById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${fncBaseURL}/fun/get_fun_by_id`, { params: params }); };
//新增函数信息
export const insertFnc =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${fncBaseURL}/fun/insert_fun`,  params); };
//编辑函数信息
//export const editFncById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${fncBaseURL}/fun/edit_fun`, { params: params }); };
export const editFncById =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${fncBaseURL}/fun/edit_fun`, params); };
//获取函数参数列表
export const getFncParaListById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${fncBaseURL}/fun_para/get_fun_para_list`, { params: params }); };
//编辑函数参数信息
export const editFncParaListById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${fncBaseURL}/fun_para/edit_fun_para_by_id`, { params: params }); };
//新增函数参数信息
export const insertFncParaListById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${fncBaseURL}/fun_para/insert_fun_para`, { params: params }); };
//删除函数参数信息
export const delFncParaListById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${fncBaseURL}/fun_para/del_fun_para_by_id`, { params: params }); };
//获取函数列表
export const getAllFncList =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${fncBaseURL}/fun/get_fun_list_by_token`, { params: params }); };
//创建、编辑函数关系
export const editFunFomFara =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${fncBaseURL}/fun_com_para/edit_fun_com_para`, params); };
//获取函数关系列表
export const getFncComParaList =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${fncBaseURL}/fun_com_para/get_list`, { params: params }); };



//================================================历史=======================================================================
//获取历史
export const getHistory =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${fncBaseURL}/fun_uselog/get_fun_uselog`, { params: params }); };
//删除历史
export const delHistory =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${fncBaseURL}/fun_uselog/del_fun_uselog`, { params: params }); };


//================================================模块=======================================================================
//添加模块
export const insertModular =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${modelBaseURL}/modular/insert_modular`, { params: params }); };
//获取模块列表
export const getModularList =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${modelBaseURL}/modular/get_list_modular`, { params: params }); };
//编辑模块
export const editModularById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${modelBaseURL}/modular/update_modular`, { params: params }); };
//删除模块
export const delModularById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${modelBaseURL}/modular/del_modular`, { params: params }); };
//通过模块id获取模块关联信息
export const getModFncById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${modelBaseURL}/modular_fun/get_modular_fun_by_modularid`, { params: params }); };
//删除模块关联函数
export const delModFncById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${modelBaseURL}/modular_fun/del_modular_fun`, { params: params }); };
//添加模块关联函数
export const insertModFncById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${modelBaseURL}/modular_fun/insert_modular_fun`, { params: params }); };
//获取模块关联函数的参数展示
export const getModFncParaShow =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${modelBaseURL}/modular_fun_para/get_modular_fun_para`, { params: params }); };
//获取所有模块列表
export const getAllModList =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${modelBaseURL}/modular/get_list_modular_by_token`, { params: params }); };
//上传参数展示项
export const editModFncParaShow =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${modelBaseURL}/modular_fun_para/edit_modular_fun_para`, params); };

//================================================模块=======================================================================
//添加业务流
export const addOperation =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${opeBaseURL}/work/insert_work`, { params: params }); };
//编辑业务流
export const editOperation =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${opeBaseURL}/work/edit_work`, { params: params }); };
//删除业务流
export const deleteOperation =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${opeBaseURL}/work/del_work`, { params: params }); };
//获取业务列表
export const getOperationList =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${opeBaseURL}/work/get_work_list`, { params: params }); };
//获取业务步骤信息
export const getOperationStepById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${opeBaseURL}/work_step/get_work_step_by_workid`, { params: params }); };
//删除步骤
export const delOperationStepById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${opeBaseURL}/work_step/del_work_step`, { params: params }); };
//添加步骤
export const insertOperationStepById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${opeBaseURL}/work_step/insert_work_step`, { params: params }); };
//编辑步骤
export const editOperationStepById =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${opeBaseURL}/work_step/edit_work_step`, { params: params }); };
//保存步骤与模块关系
export const insertOperationStepMod =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${opeBaseURL}/work_step_mod/insert_work_step_mod`, { params: params }); };
//删除步骤与模块关系
export const delOperationStepMod =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${opeBaseURL}/work_step_mod/del_work_step_mod`, { params: params }); };

//================================================计算数据库=======================================================================

//添加数据库
export const addDataListDB =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${dataBaseURL}/database/add_result_db`, params); };
//删除数据库
export const delDataListDB =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${dataBaseURL}/database/del_result_db`, { params: params }); };
//编辑数据库
export const editDataListDB =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${dataBaseURL}/database/edit_result_db`, params); };
//查询数据库
export const getDataListDB =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${dataBaseURL}/database/get_result_db`, { params: params }); };

//添加数据关系
export const addDataBind =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${dataBaseURL}/database_attr/add_result_db_attr`, params); };
//获取数据关系
export const getDataBind =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${dataBaseURL}/database_attr/get_result_db_attr`, { params: params }); };

//获取数据库内容
export const getResultDBData =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${dataBaseURL}/database_data/get_result_db_data`, { params: params }); };
//删除数据库内容
export const delResultDBData =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${dataBaseURL}/database_data/client/del_result_db_data`, { params: params }); };
//分析数据库
export const getResultDBDataCom =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${dataBaseURL}/database_data/client/get_result_db_data_compare`, { params: params }); };

//================================================本地数据库=======================================================================

//添加数据库
export const addDataListDBLocal =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${dataBaseURL}/local_database/add_local_db`, params); };
//删除数据库
export const delDataListDBLocal =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${dataBaseURL}/local_database/del_local_db`, { params: params }); };
//编辑数据库
export const editDataListDBLocal =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${dataBaseURL}/local_database/edit_local_db`, params); };
//查询数据库
export const getDataListDBLocal =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${dataBaseURL}/local_database/get_local_db`, { params: params }); };

//添加数据表-表头数据
export const addDataBindLocal =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${dataBaseURL}/local_database_attr/add_local_db_attr`, params); };
//获取数据表-表头数据
export const getDataBindLocal =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${dataBaseURL}/local_database_attr/get_local_db_attr`, { params: params }); };


//添加数据库内容
export const addResultDBDataLocal =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${dataBaseURL}/local_database_data/add_local_db_data`, params); };
//删除数据库内容
export const delResultDBDataLocal =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${dataBaseURL}/local_database_data/del_local_db_data`, { params: params }); };
//编辑数据库内容
export const editResultDBDataLocal =(baseUrlHere,params)=> { return axios.post(baseUrlHere+`${dataBaseURL}/local_database_data/edit_local_db_data`, params); };
//获取数据库内容
export const getResultDBDataLocal =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${dataBaseURL}/local_database_data/get_local_db_data`, { params: params }); };



//分析数据库
export const getResultDBDataComLocal =(baseUrlHere,params)=> { return axios.get(baseUrlHere+`${dataBaseURL}/database_data/client/get_result_db_data_compare`, { params: params }); };
