<template>
	<div class="content-views" v-loading="loading">
		<div class="content-views-nav">
			<p class="title-view">参数描述</p>
			<div class="mbanav-r">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/model' }">模块管理</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/model/addmodel/'+paraShowModelId }">参数展示</el-breadcrumb-item>
					<el-breadcrumb-item>参数描述</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="content-views-body">
			<div class="content-views-body-name">
				<h4>参数基本信息</h4>
				<div class="content-views-body-name-cont">
					<div class="cont-r" v-if="paraShowImg">
						<p>参数说明图：</p>
						<img :src="downLoadImgBaseUrl+paraShowImg">
					</div>
					<div class="cont-l">
						<p>参数名字：<span class="para-name-pad-r">{{paraShowName}}</span>简称：<span>{{paraShowNameCn}}</span></p>
						<p>参数描述：<span>{{paraShowDes}}</span></p>
						<p>参数示例：<span>{{paraShowExample}}</span></p>
					</div>
				</div>				
			</div>
			<div class="content-views-body-fnc">
				<h4>参数名字：{{paraShowName}}</h4>
				<h4 class="h-para-show">参数展示项</h4>	
				<div class="form-cont" v-for="showForm,indexA in paraShow" :key="showForm.id">
					<!--后台页面操作-->
					<div class="cont-l">
						<div class="cont-l-title"><span style="margin-right:4px;">二级标题：</span><el-input :inline="true" style="width:150px" size='small' v-model="showForm.title"></el-input>
							<input type="text" v-if="showForm.typeA==='text'" v-model:value="showForm.valueA" placeholder="描述">
							<input type="text" v-if="showForm.typeA==='value'" v-model:value="showForm.valueA" placeholder="值">
							<input type="text" v-if="showForm.typeA==='value'" v-model:value="showForm.unitA" placeholder="单位">
							<el-button type="primary" v-if="showForm.typeA==='button'" icon="create-showForm-item-add" size="mini">导入数据</el-button>
							<input type="text" v-if="showForm.typeA==='button1'" v-model:value="showForm.valueA" placeholder="读取值">
							<el-button type="primary" v-if="showForm.typeA==='button1'" icon="create-showForm-item-add" size="mini">读取</el-button>							
							<el-radio v-model="showForm.radioA" label="1" v-if="showForm.typeA === 'special'">是</el-radio>
  							<el-radio v-model="showForm.radioA" label="0" v-if="showForm.typeA === 'special'">否</el-radio>	
							</br>标题描述：
							<el-input :inline="true" style="width:60%;" v-model="showForm.describleA" placeholder="描述信息（选填）" size="small"></el-input>
							<!-- <input type="text" v-model:value="showForm.describleA" placeholder="描述信息（选填）" style="width:50%;"> -->
						</div>
						<div class="cont-l-add">
							<!-- <el-button type="primary" icon="create-showForm-item-add" size="mini" v-if="showForm.typeA!=='special'">更改标题</el-button> -->
							<div class="cont-l-add-show">
								<p @click="addTitleTypeNull(indexA)">默认标题</p>
								<p @click="addTitleTypeDes(indexA)">添加文字描述</p>
								<p @click="addTitleTypeValue(indexA)">添加变量和单位</p>
								<p @click="addTitleTypeBtn(indexA)">添加导入数据按钮</p>
								<p @click="addTitleTypeBtn1(indexA)">添加读取数据按钮</p>
							</div>
						</div>
						<!--  特殊模版  -->
						<el-form ref="showForm" :model="showForm" label-width="0" size="mini" class="create-showForm" v-if="showForm.typeA==='special'">
							<!--  特殊模版   是选项 -->
							<div v-for="(item, indexS) in showForm.showFormCreate" :key="indexS" class="create-showForm-item" :id="item.typeI" v-if="showForm.radioA!=='0'">
								<el-form-item v-if="item.typeI === 'img'">
									<el-upload class="avatar-uploader"
									:action="uploadUrl"
									:show-file-list="false"
									:on-success="handleSuccess"
									:before-upload="beforeAvatarUpload" list-type="picture">
										<img v-if="item.imageUrl" :src="downLoadImgBaseUrl+item.imageUrl" class="avatar" @click="saveItemIndex(indexS,indexA)">
										<i v-else class="el-icon-plus avatar-uploader-icon" @click="saveItemIndex(indexS,indexA)"></i>
									</el-upload>
									<el-button type="text" @click="delForm(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
								</el-form-item >
								<el-form-item v-if="item.typeI === 'paraCheck'" class="showForm-paraCheck">
									<div style="text-align:left;">
										<el-input :inline="true" style="width:45%;text-align:left;" v-model="item.titleI" placeholder="区间函数名字"></el-input>
										<el-input :inline="true" v-model="item.describleI" placeholder="函数描述（选填）" style="width:45%;"></el-input>
									</div>
									<div class="paraCheck-h">
										<span class="paraCheck-h-t">L</span>
										<span class="paraCheck-h-t">Dο</span>
										<span class="paraCheck-h-t">dο</span>
										<span class="paraCheck-h-t">Kσ</span>
										<span class="paraCheck-h-t">Kτ</span>
										<span class="paraCheck-h-t">εσ</span>
										<span class="paraCheck-h-t">ετ</span>
										<span class="paraCheck-h-t">Ψσ</span>
										<span class="paraCheck-h-t">Ψτ</span>
										<span class="paraCheck-h-t">β</span>
									</div>
									<div class="paraCheck-b" v-for="fnc,indexF in item.valueI" :key="indexF">
										<!-- <span class="paraCheck-b-t">截面</span> -->
										<input :inline="true" v-model="fnc.labelI" placeholder="" class="paraCheck-b-t"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number.number="fnc.valueI1"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number.number="fnc.valueI2"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number.number="fnc.valueI3"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number.number="fnc.valueI4"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number.number="fnc.valueI5"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number.number="fnc.valueI6"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number.number="fnc.valueI7"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number.number="fnc.valueI8"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number.number="fnc.valueI9"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number.number="fnc.valueI10"></input>
									</div>
									<el-button type="text" @click="addFncList(fnc,indexA,indexS)" class="paraCheck-btn1" icon="el-icon-circle-plus-outline"></el-button>
									<el-button type="text" @click="delFncList(fnc,indexA,indexS)" class="paraCheck-btn2" icon="el-icon-remove-outline"></el-button>
								</el-form-item>
								<el-form-item v-if="item.typeI === 'itvFnc'" class="showForm-itvFnc">
									<el-input :inline="true" style="width:45%;text-align:left;" v-model="item.titleI" placeholder="区间函数名字"></el-input>
									<el-input :inline="true" v-model="item.describleI" placeholder="函数描述（选填）" style="width:45%;"></el-input>
									<div v-for="fnc,indexF in item.valueI" :key="indexF">
											<el-input :inline="true" style="width:10%;" v-model="fnc.labelI" placeholder="函数名"></el-input>
											<el-input :inline="true" style="width:30%;" v-model="fnc.valueI1" placeholder="函数方程"></el-input><b>X</b>∈
											<el-input :inline="true" style="width:16%;" v-model.number="fnc.valueI2" placeholder="区间值"></el-input>-
											<el-input :inline="true" style="width:16%;" v-model.number="fnc.valueI3" placeholder="区间值"></el-input>																					
									</div>
									<el-button type="text" @click="addFncList(fnc,indexA,indexS)" class="showForm-itvFnc-btn1" icon="el-icon-circle-plus-outline"></el-button>
									<el-button type="text" @click="delFncListF(fnc,indexA,indexS)" class="showForm-itvFnc-btn2" icon="el-icon-remove-outline"></el-button>
									<el-button type="text" @click="delForm(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
								</el-form-item >
							</div>
							<!--  特殊模版   否选项 -->
							<div v-for="(item, indexS) in showForm.showFormCreateN" :key="indexS" class="create-showForm-item" :id="item.typeI" v-if="showForm.radioA==='0'">
								<el-form-item v-if="item.typeI === 'img'" >
									<el-upload class="avatar-uploader"
									:action="uploadUrl"
									:show-file-list="false"
									:on-success="handleSuccessN"
									:before-upload="beforeAvatarUpload" list-type="picture">
										<img v-if="item.imageUrl" :src="downLoadImgBaseUrl+item.imageUrl" class="avatar" @click="saveItemIndex(indexS,indexA)">
										<i v-else class="el-icon-plus avatar-uploader-icon" @click="saveItemIndex(indexS,indexA)"></i>
									</el-upload>
									<el-button type="text" @click="delFormN(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
								</el-form-item >
								<el-form-item v-if="item.typeI === 'paraCheck'" class="showForm-paraCheck">
									<div style="text-align:left;">
										<el-input :inline="true" style="width:45%;text-align:left;" v-model="item.titleI" placeholder="区间函数名字"></el-input>
										<el-input :inline="true" v-model="item.describleI" placeholder="函数描述（选填）" style="width:45%;"></el-input>
									</div>
									<div class="paraCheck-h">
										<span class="paraCheck-h-t">L</span>
										<span class="paraCheck-h-t">Dο</span>
										<span class="paraCheck-h-t">dο</span>
										<span class="paraCheck-h-t">Kσ</span>
										<span class="paraCheck-h-t">Kτ</span>
										<span class="paraCheck-h-t">εσ</span>
										<span class="paraCheck-h-t">ετ</span>
										<span class="paraCheck-h-t">Ψσ</span>
										<span class="paraCheck-h-t">Ψτ</span>
										<span class="paraCheck-h-t">β</span>
									</div>
									<div class="paraCheck-b" v-for="fnc,indexF in item.valueI" :key="indexF">
										<!-- <span class="paraCheck-b-t">截面</span> -->
										<input :inline="true" v-model="fnc.labelI" placeholder="" class="paraCheck-b-t"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI1"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI2"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI3"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI4"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI5"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI6"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI7"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI8"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI9"></input>
										<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI10"></input>
									</div>
									<el-button type="text" @click="addFncListN(fnc,indexA,indexS)" class="paraCheck-btn1" icon="el-icon-circle-plus-outline"></el-button>
									<el-button type="text" @click="delFncListN(fnc,indexA,indexS)" class="paraCheck-btn2" icon="el-icon-remove-outline"></el-button>
									<el-button type="text" @click="delFormN(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
								</el-form-item>
								<el-form-item v-if="item.typeI === 'itvFnc'" class="showForm-itvFnc">
									<el-input style="width:100%;" v-model="item.titleI" placeholder="轮廓曲线方程"></el-input>
									<div v-for="fnc,indexF in item.valueI" :key="indexF">
											<el-input :inline="true" style="width:10%;" v-model="fnc.labelI" placeholder="函数名"></el-input>
											<el-input :inline="true" style="width:30%;" v-model="fnc.valueI1" placeholder="函数方程"></el-input><b>X</b>∈
											<el-input :inline="true" style="width:16%;" v-model.number="fnc.valueI2.number" placeholder="区间值"></el-input>-
											<el-input :inline="true" style="width:16%;" v-model.number="fnc.valueI3.number" placeholder="区间值"></el-input>																					
									</div>
									<el-button type="text" @click="addFncListN(fnc,indexA,indexS)" class="showForm-itvFnc-btn1" icon="el-icon-circle-plus-outline"></el-button>
									<el-button type="text" @click="delFncListNF(fnc,indexA,indexS)" class="showForm-itvFnc-btn2" icon="el-icon-remove-outline"></el-button>
									<el-button type="text" @click="delFormN(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
								</el-form-item >
							</div>
							<div class="create-showForm-item"></div>
						</el-form>
						<!--   普通模版   -->
						<el-form ref="showForm" :model="showForm" label-width="0" size="mini" class="create-showForm" v-if="showForm.typeA!=='special'">
							<div v-for="(item, indexS) in showForm.showFormCreate" :key="indexS" class="create-showForm-item" :id="item.typeI">
								<!--  单行文本-->
								<el-form-item v-if="item.typeI === 'text'" >
									<el-input :inline="true" style="width:50%;" v-model="item.labelI" placeholder="变量名"></el-input>
									<el-input :inline="true" style="width:20%;" v-model.number="item.valueI" placeholder="前端输入值"></el-input>
									<el-input :inline="true" style="width:25%;" v-model="item.unitI" placeholder="单位"></el-input>
									<el-button type="text" @click="delForm(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
									</br>
									<span style="font-size:12px;">变量描述：</span>
									<el-input :inline="true" style="width:60%;" v-model="item.describleI" placeholder="变量描述（选填）"></el-input>
									</br>
									<span style="font-size:12px;">是否必填：</span>
									<el-select v-model="item.status" placeholder="请选择">
										<el-option label="必传项(数字)" value="0"></el-option>
										<el-option label="必传项(任意值)" value="1"></el-option>
										<el-option label="非必传项" value="2"></el-option>
									</el-select>	
								</el-form-item >
								<el-form-item v-if="item.typeI === 'textD'" >
									<el-input :inline="true" style="width:50%;" v-model="item.labelI" placeholder="变量名"></el-input>
									<el-input :inline="true" style="width:20%;" disabled v-model.number="item.valueI.number" placeholder="前端输入值"></el-input>
									<el-input :inline="true" style="width:25%;" v-model="item.unitI" placeholder="单位"></el-input>
									<el-button type="text" @click="delForm(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
									</br>
									<span style="font-size:12px;">变量描述：</span>
									<el-input :inline="true" style="width:60%;" v-model="item.describleI" placeholder="变量描述（选填）"></el-input>
								</el-form-item >
								<!--  图片-->
								<el-form-item v-if="item.typeI === 'img'" >
									<el-upload class="avatar-uploader"
									:action="uploadUrl"
									:show-file-list="false"
									:on-success="handleSuccess"
									:before-upload="beforeAvatarUpload" list-type="picture">
										<img v-if="item.imageUrl" :src="downLoadImgBaseUrl+item.imageUrl" class="avatar" @click="saveItemIndex(indexS,indexA)">
										<i v-else class="el-icon-plus avatar-uploader-icon" @click="saveItemIndex(indexS,indexA)"></i>
									</el-upload>
									<br>
									<span style="font-size:12px;">图片描述：</span>
									<el-input :inline="true" style="width:60%;" v-model="item.describleI" placeholder="图片描述（选填）"></el-input>
									<el-button type="text" @click="delForm(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
								</el-form-item >
								<!--  单行行内文本-->
								<el-form-item  v-if="item.typeI === 'text2'">
									<el-input :inline="true" style="width:30%;" v-model="item.labelI" placeholder="变量名"></el-input>
									<el-input :inline="true" style="width:30%;" v-model.number="item.valueI" placeholder="输入值"></el-input>
									<el-input :inline="true" style="width:26%;" v-model="item.unitI" placeholder="单位"></el-input>
									<el-button type="text" @click="delForm(indexA,item)" class="create-showForm-item-btn create-showForm-item-btn2" icon="el-icon-delete"></el-button>
									<br>
									<span style="font-size:12px;">变量描述：</span>
									<el-input :inline="true" style="width:60%;" v-model="item.describleI" placeholder="变量描述（选填）"></el-input>
									</br>
									<span style="font-size:12px;">是否必填：</span>
									<el-select v-model="item.status" placeholder="请选择">
										<el-option label="必传项(数字)" value="0"></el-option>
										<el-option label="必传项(任意值)" value="1"></el-option>
										<el-option label="非必传项" value="2"></el-option>
									</el-select>
								</el-form-item >
								<!--  区间文本-->
								<el-form-item  v-if="item.typeI === 'text1'">
									<el-input :inline="true" style="width:40%;" v-model="item.labelI" placeholder="变量名"></el-input>
									<el-input :inline="true" style="width:15%;" v-model.number="item.valueI" placeholder="区间值1"></el-input>
									<el-input :inline="true" style="width:15%;" v-model.number="item.valueI2" placeholder="区间值2"></el-input>
									<el-input :inline="true" style="width:25%;" v-model="item.unitI" placeholder="单位"></el-input>
									<el-button type="text" @click="delForm(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
									<br>
									<span style="font-size:12px;">变量描述：</span>
									<el-input :inline="true" style="width:60%;" v-model="item.describleI" placeholder="变量描述（选填）"></el-input>
									</br>
									<span style="font-size:12px;">是否必填：</span>
									<el-select v-model="item.status" placeholder="请选择">
										<el-option label="必传项(数字)" value="0"></el-option>
										<el-option label="必传项(任意值)" value="1"></el-option>
										<el-option label="非必传项" value="2"></el-option>
									</el-select>
								</el-form-item >
								<el-form-item  v-if="item.typeI === 'text1D'">
									<el-input :inline="true" style="width:40%;" v-model="item.labelI" placeholder="变量名"></el-input>
									<el-input :inline="true" style="width:15%;" v-model.number="item.valueI" placeholder="区间值1"></el-input>
									<el-input :inline="true" style="width:15%;" v-model.number="item.valueI2" placeholder="区间值2"></el-input>
									<el-input :inline="true" style="width:25%;" v-model="item.unitI" placeholder="单位"></el-input>
									<el-button type="text" @click="delForm(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
									<br>
									<span style="font-size:12px;">变量描述：</span>
									<el-input :inline="true" style="width:60%;" v-model="item.describleI" placeholder="变量描述（选填）"></el-input>
								</el-form-item >
								<!--  多行文本-->
								<el-form-item v-if="item.typeI === 'textarea'" class="showForm-textarea">
									<el-input v-model="item.labelI" class="select-label" placeholder="变量名"></el-input>
									<el-input type="textarea" v-model="item.valueI"class="textarea-value" placeholder="多行文本描述"></el-input>
									<el-button type="text" @click="delForm(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
									<br>
									<span style="font-size:12px;">变量描述：</span>
									<el-input :inline="true" style="width:60%;" v-model="item.describleI" placeholder="变量描述（选填）"></el-input>
								</el-form-item >
								<!--  下拉菜单文本-->
								<el-form-item  v-if="item.typeI === 'select'" v-model="item.valueI" :placeholder="item.labelI" class="showForm-select">
									<el-input v-model="item.labelI" class="select-label" placeholder="菜单名"></el-input>
									<el-input :inline="true" v-model="item.describleI" placeholder="变量描述（选填）" style="width:80%;position:absolute;top:-32px;left:60px;"></el-input>
									<div class="select-list" v-for="para,indexL in showForm.showFormCreate[indexS].valueForm">
										<el-input
										v-model="para.labelL"
										:key="indexL"
										placeholder="菜单列表">
										</el-input>
									</div>
									<el-button type="text" @click="addSelectOption(indexA,indexS)" class="create-showForm-item-add" icon="el-icon-circle-plus-outline"></el-button>
									<el-button type="text" @click="delSelectOption(indexA,indexS,indexL)" class="create-showForm-choose-del" icon="el-icon-remove-outline"></el-button>
									<el-button type="text" @click="delForm(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
								</el-form-item >		
								<!--  多选框-->		
								<el-form-item v-if="item.typeI === 'checkbox'">
									<el-checkbox-group v-model="item.valueI">
										<div class="showForm-choose">
											<el-input v-model="item.labelI" class="choose-label" placeholder="变量名"></el-input>
											<el-input :inline="true" v-model="item.describleI" placeholder="标题描述（选填）" style="width:80%;position:absolute;top:0px;left:60px;"></el-input>
											<el-checkbox v-for="para,indexL in showForm.showFormCreate[indexS].valueForm"
											:label="indexL"
											:key="indexL"
											:name="item.typeI+indexS"
											class="create-showForm-choose"
											:id="para.typeL">
												<!--文本选择-->
												<input v-if="para.typeL==='text'" type="text" class="create-showForm-choose-input" v-model:value="para.labelL">
												<!--上传图片选择-->
												<el-upload
												v-if="para.typeL==='img'"
												class="avatar-uploader"
												:action="uploadUrl"
												:show-file-list="false"
												:on-success="handleAvatarSuccess"
												:before-upload="beforeAvatarUpload" list-type="picture">
												<img v-if="para.imageUrl" :src="downLoadImgBaseUrl+para.imageUrl" class="avatar" @click="saveParaIndex(indexS,indexA,indexL)">
												<i v-else class="el-icon-plus avatar-uploader-icon" @click="saveParaIndex(indexS,indexA,indexL)"></i>
												</el-upload>
												<!--文本带小弟选择-->
												<div v-if="para.typeL==='textDes'" class="create-showForm-choose-textD">
													<input type="text" v-model:value="para.labelL">
													<el-form class="choose-textD-list" v-model="showForm.showFormCreate[indexS].valueForm" size="mini">
														<el-form-item v-for="parades,indexD in para.listL" :key="indexD" class="list-detial">
															<el-input :inline="true" style="width:30%;" v-model="parades.labelD" placeholder="变量名"></el-input>
															<el-input :inline="true" style="width:30%;" v-model.number="parades.valueD" placeholder="值"></el-input>
															<el-input :inline="true" style="width:30%;" v-model="parades.unitD" placeholder="单位"></el-input>
														</el-form-item>
													</el-form>													
												</div>	
												<!--读取按钮-->
												<div v-if="para.typeL==='uploadBtn'" class="create-showForm-choose-btn">
													<input type="text" v-model:value="para.labelL">
													<input type="text" disabled placeholder="读取值">
													<el-button size="mini" type="primary">读取</el-button>
												</div>											
												<el-button type="text" @click="delChooseRadio(indexA,indexS,indexL)" class="create-showForm-choose-del" icon="el-icon-remove-outline"></el-button>
											</el-checkbox>
											<el-button type="text" @click="addChooseRadioText(indexA,indexS)" style="margin-left:60px;">添加文本</el-button>
											<el-button type="text" @click="addChooseRadioBtn(indexA,indexS)">添加读取按钮</el-button>
											<el-button type="text" @click="addChooseRadioImg(indexA,indexS)">添加图片</el-button>
											<el-button type="text" @click="addChooseRadioDetial(indexA,indexS)">添加附加变量文本</el-button>
										</div>
									</el-checkbox-group>
									<el-button type="text" @click="delForm(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
								</el-form-item >		
								<!--  单选框-->
								<el-form-item v-if="item.typeI === 'radio'" >
									<el-radio-group v-model="item.valueI">
										<div class="showForm-choose">
											<el-input v-model="item.labelI" class="choose-label" placeholder="变量名"></el-input>
											<el-input :inline="true" v-model="item.describleI" placeholder="标题描述（选填）" style="width:80%;position:absolute;top:0px;left:60px;"></el-input>
											<el-radio v-for="para,indexL in showForm.showFormCreate[indexS].valueForm"
											:label="indexL"
											:key="indexL"
											:name="item.typeI+indexS"
											class="create-showForm-choose"
											:id="para.typeL">
												<!--文本选择-->
												<input v-if="para.typeL==='text'" type="text" class="create-showForm-choose-input" v-model:value="para.labelL">
												<!--上传图片选择-->
												<el-upload
												v-if="para.typeL==='img'"
												class="avatar-uploader"
												:action="uploadUrl"
												:show-file-list="false"
												:on-success="handleAvatarSuccess"
												:before-upload="beforeAvatarUpload" list-type="picture">
												<img v-if="para.imageUrl" :src="downLoadImgBaseUrl+para.imageUrl" class="avatar" @click="saveParaIndex(indexS,indexA,indexL)">
												<i v-else class="el-icon-plus avatar-uploader-icon" @click="saveParaIndex(indexS,indexA,indexL)"></i>
												</el-upload>
												<!--文本带小弟选择-->
												<div v-if="para.typeL==='textDes'" class="create-showForm-choose-textD">
													<input type="text" value="" v-model:value="para.labelL">
													<el-form class="choose-textD-list" v-model="showForm.showFormCreate[indexS].valueForm" size="mini">
														<el-form-item v-for="parades,indexD in para.listL" :key="indexD" class="list-detial">
															<el-input :inline="true" style="width:30%;" v-model="parades.labelD" placeholder="变量名"></el-input>
															<el-input :inline="true" style="width:30%;" v-model.number="parades.valueD" placeholder="值"></el-input>
															<el-input :inline="true" style="width:30%;" v-model="parades.unitD" placeholder="单位"></el-input>
														</el-form-item>
													</el-form>
												</div>
												<div v-if="para.typeL==='uploadBtn'" class="create-showForm-choose-btn">
													<input type="text" v-model:value="para.labelL">
													<input type="text" disabled placeholder="读取值">
													<el-button size="mini" type="primary">读取</el-button>
												</div>	
												<el-button type="text" @click="delChooseRadio(indexA,indexS,indexL)" class="create-showForm-choose-del" icon="el-icon-remove-outline"></el-button>
											</el-radio>
											<el-button type="text" @click="addChooseRadioText(indexA,indexS)" style="margin-left:60px;">添加文本</el-button>
											<el-button type="text" @click="addChooseRadioBtn(indexA,indexS)">添加读取按钮</el-button>
											<el-button type="text" @click="addChooseRadioImg(indexA,indexS)">添加图片</el-button>
											<el-button type="text" @click="addChooseRadioDetial(indexA,indexS)">添加附加变量文本</el-button>
										</div>					
									</el-radio-group>	
									<el-button type="text" @click="delForm(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
								</el-form-item >							
								<!--  特殊item-->
								<el-form-item v-if="item.typeI === 'itvFnc'" class="showForm-itvFnc">
									<el-input :inline="true" style="width:45%; text-align:left;" v-model="item.titleI" placeholder="区间函数名字"></el-input>
									<el-input :inline="true" v-model="item.describleI" placeholder="函数描述（选填）" style="width:45%;"></el-input>
									<div v-for="fnc,indexF in item.valueI" :key="indexF">
											<el-input :inline="true" style="width:10%;" v-model="fnc.labelI" placeholder="函数名"></el-input>
											<el-input :inline="true" style="width:30%;" v-model="fnc.valueI1" placeholder="函数方程"></el-input><b>X</b>∈
											<el-input :inline="true" style="width:16%;" v-model.number="fnc.valueI2" placeholder="区间值"></el-input>-
											<el-input :inline="true" style="width:16%;" v-model.number="fnc.valueI3" placeholder="区间值"></el-input>																					
									</div>
									<el-button type="text" @click="addFncList(fnc,indexA,indexS)" class="showForm-itvFnc-btn1" icon="el-icon-circle-plus-outline"></el-button>
									<el-button type="text" @click="delFncListF(fnc,indexA,indexS)" class="showForm-itvFnc-btn2" icon="el-icon-remove-outline"></el-button>
									<el-button type="text" @click="delForm(indexA,item)" class="create-showForm-item-btn" icon="el-icon-delete"></el-button>
								</el-form-item >
							</div>
						</el-form>
					</div>
					<!--前台页面展示-->
					<div class="cont-r">
						<p>
							<el-tooltip effect="light" :content="showForm.describleA" placement="top-start" v-if="showForm.describleA">
								<span v-if="showForm.title">{{showForm.title}}:</span>
							</el-tooltip>
							<span v-if="!showForm.describleA&&showForm.title">{{showForm.title}}:</span>
							<span v-if="showForm.typeA==='text'">{{showForm.valueA}}</span>
							<input type="text" v-if="showForm.typeA==='value'" v-model:value="showForm.valueA" placeholder="值">
							<span v-if="showForm.typeA==='value'">{{showForm.unitA}}</span>
							<el-button type="primary" v-if="showForm.typeA==='button'" icon="create-showForm-item-add" size="mini">导入数据</el-button>
							<el-radio v-model="showForm.radioA" label="1" v-if="showForm.typeA === 'special'">是</el-radio>
  							<el-radio v-model="showForm.radioA" label="0" v-if="showForm.typeA === 'special'">否</el-radio>	
						</p>
						<div class="cont-r-showForm">
							<el-form ref="showForm" :model="showForm" size="mini" class="create-showForm" label-position="right">
								<div v-for="(item, indexS) in showForm.showFormCreate" :key="indexS" class="create-showForm-item" :id="item.typeI" v-if="showForm.radioA !== '0'">
									<el-form-item v-if="item.typeI === 'text'" :label="item.labelI" label-width="40%" >									
										<el-input :inline="true" style="width:66%;" v-model.number="item.valueI" placeholder="前端输入值"></el-input>	
										<span style="width:15%;" v-model="item.unitI">{{item.unitI}}</span>
										<el-tooltip effect="light" :content="item.describleI" placement="top-end" v-if="item.describleI">
											<i class="el-icon-question" style="position:absolute;right:3px;line-height:30px;color:#409EFF"></i>
										</el-tooltip>
									</el-form-item >
									<el-form-item v-if="item.typeI === 'textD'" :label="item.labelI" label-width="40%" >									
										<el-input :inline="true" style="width:66%;" disabled v-model.number="item.valueI" placeholder="前端输入值"></el-input>	
										<span style="width:15%;" v-model="item.unitI">{{item.unitI}}</span>
										<el-tooltip effect="light" :content="item.describleI" placement="top-end" v-if="item.describleI">
											<i class="el-icon-question" style="position:absolute;right:3px;line-height:30px;color:#409EFF"></i>
										</el-tooltip>
									</el-form-item >
									<!--  单行行内文本-->
									<el-form-item  v-if="item.typeI === 'text2'" label-width="40%" :label="item.labelI" :inline="true" style="width:100%;overflow:hidden;">									
										<el-input :inline="true" style="float:left;width:60%;" v-model.number="item.valueI" placeholder="输入值"></el-input>
										<span style="width:38%;float:left;" v-model="item.unitI">{{item.unitI}}</span>	
										<el-tooltip effect="light" :content="item.describleI" placement="top-end" v-if="item.describleI">
											<i class="el-icon-question" style="position:absolute;right:3px;line-height:30px;color:#409EFF"></i>
										</el-tooltip>							
									</el-form-item >
									<el-form-item v-if="item.typeI === 'img'" >
										<el-tooltip effect="light" :content="item.describleI" placement="top-end" v-if="item.describleI">
											<img v-if="item.imageUrl" :src="downLoadImgBaseUrl+item.imageUrl" alt="" style="border:1px dashed #ccc;max-width:80%;max-height:400px;">
											<img src="" alt="示例图片" v-if="!item.imageUrl" width="120" height="80" style="border:1px dashed #ccc;">
										</el-tooltip>
										<div v-if="!item.describleI">
											<img v-if="item.imageUrl" :src="downLoadImgBaseUrl+item.imageUrl" alt="" style="border:1px dashed #ccc;max-width:80%;max-height:400px;">
											<img src="" alt="示例图片" v-if="!item.imageUrl" width="120" height="80" style="border:1px dashed #ccc;">	
										</div>
									</el-form-item >
									<!--  区间文本-->
									<el-form-item  v-if="item.typeI === 'text1'" label-width="75px" :label="item.labelI">
										<el-input :inline="true" style="width:33%;" v-model.number="item.valueI" placeholder="区间值1"></el-input>
										<span>-</span>
										<el-input :inline="true" style="width:33%;" v-model.number="item.valueI2" placeholder="区间值2"></el-input>										
										<span style="width:15%;" v-model="item.unitI">{{item.unitI}}</span>
										<el-tooltip effect="light" :content="item.describleI" placement="top-end" v-if="item.describleI">
											<i class="el-icon-question" style="position:absolute;right:3px;line-height:30px;color:#409EFF"></i>
										</el-tooltip>
									</el-form-item >
									<el-form-item  v-if="item.typeI === 'text1D'" label-width="75px" :label="item.labelI">
										<el-input :inline="true" style="width:33%;" disabled v-model.number="item.valueI" placeholder="区间值1"></el-input>
										<span>-</span>
										<el-input :inline="true" style="width:33%;" disabled v-model.number="item.valueI2" placeholder="区间值2"></el-input>										
										<span style="width:15%;" v-model="item.unitI">{{item.unitI}}</span>
										<el-tooltip effect="light" :content="item.describleI" placement="top-end" v-if="item.describleI">
											<i class="el-icon-question" style="position:absolute;right:3px;line-height:30px;color:#409EFF"></i>
										</el-tooltip>
									</el-form-item >
									<!--  多行文本-->
									<el-form-item v-if="item.typeI === 'textarea'" class="showForm-textarea" label-width="75px" :label="item.labelI">
										<el-input type="textarea" v-model="item.valueI" class="textarea-value" placeholder="多行文本描述" style="margin:0;"></el-input>	
										<el-tooltip effect="light" :content="item.describleI" placement="top-end" v-if="item.describleI">
											<i class="el-icon-question" style="position:absolute;right:3px;line-height:30px;color:#409EFF"></i>
										</el-tooltip>									
									</el-form-item >
									<!--  下拉菜单文本-->
									<el-form-item  v-if="item.typeI === 'select'" class="showForm-select" label-width="30%" :label="item.labelI">
										<el-select v-model="item.valueI" placeholder="请选择" >
											<el-option v-for="para,indexL in showForm.showFormCreate[indexS].valueForm"
											:label="para.labelL"
											:value="para.labelL"
											:key="indexL">
											</el-option> 
										</el-select>
										<el-tooltip effect="light" :content="item.describleI" placement="top-end" v-if="item.describleI">
											<i class="el-icon-question" style="position:absolute;right:3px;line-height:30px;color:#409EFF"></i>
										</el-tooltip>
									</el-form-item >		
									<!--  多选框-->		
									<el-form-item v-if="item.typeI === 'checkbox'" label-width="75px" :label="item.labelI">
										<el-tooltip effect="light" :content="item.describleI" placement="top-end" style="z-index:999" v-if="item.describleI">
											<i class="el-icon-question" style="position:absolute;right:3px;line-height:30px;color:#409EFF"></i>
										</el-tooltip>
										<el-checkbox-group v-model="item.valueI">
												<el-checkbox v-for="para,indexL in showForm.showFormCreate[indexS].valueForm"
												:label="indexL"
												:key="indexL"
												:name="item.typeI+indexS"
												class="create-showForm-choose"											
												style="width:100%;"
												>
													<span v-if="para.typeL==='text'">{{para.labelL}}</span>
													<span v-if="para.typeL==='textDes'">{{para.labelL}}</span>
													<img :src="downLoadImgBaseUrl+para.imageUrl" alt="" width="120" height="100" v-if="para.typeL==='img'" style="border:1px dashed #ccc;">
													<el-form class="choose-textD-list"
													v-model="showForm.showFormCreate[indexS].valueForm"
													size="mini"
													label-width="75px"
													v-if="para.typeL==='textDes'"
													style="width:200px;margin-left:50px;">
														<el-form-item v-for="parades,indexD in para.listL" :key="indexD" class="list-detial" :label="parades.labelD">
															<el-input :inline="true" style="width:80px;" v-model.number="parades.valueD" placeholder="值"></el-input>
															<a style="display:inline">{{parades.unitD}}</a>
														</el-form-item>
													</el-form>
													<span v-if="para.typeL==='uploadBtn'">{{para.labelL}}</span>
													<input v-if="para.typeL==='uploadBtn'" type="text" disabled placeholder="读取值" style="height:24px;line-height: 24px;border:1px solid #dcdfe6;border-radius:4px;width:50px;">
													<el-button v-if="para.typeL==='uploadBtn'" size="mini" type="primary">读取</el-button>
												</el-checkbox>											
										</el-checkbox-group>								
									</el-form-item >		
									<!--  单选框-->
									<el-form-item v-if="item.typeI === 'radio'" :label="item.labelI">	
										<el-tooltip effect="light" :content="item.describleI" placement="top-end" style="z-index:999" v-if="item.describleI">
											<i class="el-icon-question" style="position:absolute;right:3px;line-height:30px;color:#409EFF"></i>
										</el-tooltip>	
										<el-radio-group v-model="item.valueI" class="showForm-choose">										
												<el-radio v-for="para,indexL in showForm.showFormCreate[indexS].valueForm"
												:label="indexL"
												:key="indexL"
												:name="item.typeI+indexS"
												class="create-showForm-choose"											
												style="width:100%;">
													<span v-if="para.typeL==='text'" >{{para.labelL}}</span>
													<span v-if="para.typeL==='textDes'">{{para.labelL}}</span>
													<img :src="downLoadImgBaseUrl+para.imageUrl" alt="图片示例" width="120" height="100" v-if="para.typeL==='img'" style="border:1px dashed #ccc;">
													<el-form class="choose-textD-list" v-model="showForm.showFormCreate[indexS].valueForm" size="mini" label-width="75px" v-if="para.typeL==='textDes'" style="width:200px;margin-left:50px;">
														<el-form-item v-for="parades,indexD in para.listL" :key="indexD" class="list-detial" :label="parades.labelD" v-if="item.valueI===para.labelL">
															<el-input :inline="true" style="width:80px;" v-model.number="parades.valueD" placeholder="值"></el-input>
															<a style="display:inline">{{parades.unitD}}</a>
														</el-form-item>
														<el-form-item v-for="parades,indexD in para.listL" :key="indexD" class="list-detial" :label="parades.labelD" v-if="item.valueI!==para.labelL">
															<el-input :inline="true" style="width:80px;" v-model.number="parades.valueD" placeholder="值" disabled></el-input>
															<span>{{parades.unitD}}</span>
														</el-form-item>
													</el-form>
													<span v-if="para.typeL==='uploadBtn'">{{para.labelL}}</span>
													<input v-if="para.typeL==='uploadBtn'" type="text" disabled placeholder="读取值" style="height:24px;line-height: 24px;border:1px solid #dcdfe6;border-radius:4px;width:50px;">
													<el-button v-if="para.typeL==='uploadBtn'" size="mini" type="primary">读取</el-button>
												</el-radio>	
										</el-radio-group>	
									</el-form-item >							
									<!--  特殊item-->
									<el-form-item v-if="item.typeI === 'itvFnc'" class="showForm-itvFnc">
										<el-tooltip effect="light" :content="item.describleI" placement="top-end" style="z-index:999" v-if="item.describleI">
											<i class="el-icon-question" style="position:absolute;right:3px;line-height:30px;color:#409EFF"></i>
										</el-tooltip>
										<div><b>{{item.titleI}}</b></div>
										<div v-for="fnc,indexF in item.valueI" :key="indexF" class="showForm-itvFnc-cont">
											<b>{{fnc.labelI}}</b>
											<el-input :inline="true" style="width:30%;" v-model="fnc.valueI1" placeholder="函数方程"></el-input><b>X</b>∈
											<el-input :inline="true" style="width:16%;" v-model.number="fnc.valueI2" placeholder="区间值"></el-input>-
											<el-input :inline="true" style="width:16%;" v-model.number="fnc.valueI3" placeholder="区间值"></el-input>									
										</div>
										<el-button type="text" @click="addFncList(fnc,indexA,indexS)" class="showForm-itvFnc-btn1" icon="el-icon-circle-plus-outline"></el-button>
										<el-button type="text" @click="delFncListF(fnc,indexA,indexS)" class="showForm-itvFnc-btn2" icon="el-icon-remove-outline"></el-button>	
									</el-form-item >
									<el-form-item v-if="item.typeI === 'paraCheck'" class="showForm-paraCheck">
										<div style="text-align:left"><b>{{item.titleI}}</b></div>
										<div class="paraCheck-h">
											<span class="paraCheck-h-t">L</span>
											<span class="paraCheck-h-t">Dο</span>
											<span class="paraCheck-h-t">dο</span>
											<span class="paraCheck-h-t">Kσ</span>
											<span class="paraCheck-h-t">Kτ</span>
											<span class="paraCheck-h-t">εσ</span>
											<span class="paraCheck-h-t">ετ</span>
											<span class="paraCheck-h-t">Ψσ</span>
											<span class="paraCheck-h-t">Ψτ</span>
											<span class="paraCheck-h-t">β</span>
										</div>
										<div class="paraCheck-b" v-for="fnc,indexF in item.valueI" :key="indexF">
											<span class="paraCheck-b-t" style="border:0;">截面</span>
											<!-- <input :inline="true" v-model="fnc.labelI" placeholder="" class="paraCheck-b-t"></input> -->
											<input class="paraCheck-b-c" v-model.number="fnc.valueI1"></input>
											<input class="paraCheck-b-c" v-model.number="fnc.valueI2"></input>
											<input class="paraCheck-b-c" v-model.number="fnc.valueI3"></input>
											<input class="paraCheck-b-c" v-model.number="fnc.valueI4"></input>
											<input class="paraCheck-b-c" v-model.number="fnc.valueI5"></input>
											<input class="paraCheck-b-c" v-model.number="fnc.valueI6"></input>
											<input class="paraCheck-b-c" v-model.number="fnc.valueI7"></input>
											<input class="paraCheck-b-c" v-model.number="fnc.valueI8"></input>
											<input class="paraCheck-b-c" v-model.number="fnc.valueI9"></input>
											<input class="paraCheck-b-c" v-model.number="fnc.valueI10"></input>
										</div>
										<el-button type="text" @click="addFncList(fnc,indexA,indexS)" class="paraCheck-btn1" icon="el-icon-circle-plus-outline"></el-button>
										<el-button type="text" @click="delFncList(fnc,indexA,indexS)" class="paraCheck-btn2" icon="el-icon-remove-outline"></el-button>
									</el-form-item>
								</div>
								<!--否选项-->
								<div v-for="(item, indexS) in showForm.showFormCreateN" :key="indexS" class="create-showForm-item" :id="item.typeI" v-if="showForm.radioA === '0'">
									<el-form-item v-if="item.typeI === 'img'" >
										<img v-if="item.imageUrl" :src="downLoadImgBaseUrl+item.imageUrl" alt="示例图片" style="border:1px dashed #ccc;max-width:80%;max-height:400px;">
										<img v-if="!item.imageUrl" src="" alt="示例图片" width="120" height="100" style="border:1px dashed #ccc;">
									</el-form-item >
									<!--  特殊item-->
									<el-form-item v-if="item.typeI === 'paraCheck'" class="showForm-paraCheck">
										<div style="text-align:left"><b>{{item.titleI}}</b></div>
										<div class="paraCheck-h">
											<span class="paraCheck-h-t">L</span>
											<span class="paraCheck-h-t">Dο</span>
											<span class="paraCheck-h-t">dο</span>
											<span class="paraCheck-h-t">Kσ</span>
											<span class="paraCheck-h-t">Kτ</span>
											<span class="paraCheck-h-t">εσ</span>
											<span class="paraCheck-h-t">ετ</span>
											<span class="paraCheck-h-t">Ψσ</span>
											<span class="paraCheck-h-t">Ψτ</span>
											<span class="paraCheck-h-t">β</span>
										</div>
										<div class="paraCheck-b" v-for="fnc,indexF in item.valueI" :key="indexF">
											<span class="paraCheck-b-t">截面</span>
											<!-- <input :inline="true" v-model="fnc.labelI" placeholder="" class="paraCheck-b-t"></input> -->
											<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI1"></input>
											<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI2"></input>
											<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI3"></input>
											<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI4"></input>
											<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI5"></input>
											<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI6"></input>
											<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI7"></input>
											<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI8"></input>
											<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI9"></input>
											<input :inline="true" class="paraCheck-b-c" v-model.number="fnc.valueI10"></input>
										</div>
										<el-button type="text" @click="addFncListN(fnc,indexA,indexS)" class="paraCheck-btn1" icon="el-icon-circle-plus-outline"></el-button>
										<el-button type="text" @click="delFncListN(fnc,indexA,indexS)" class="paraCheck-btn2" icon="el-icon-remove-outline"></el-button>
									</el-form-item>
								</div>
							</el-form>
						</div>
					</div>
					<!--页面操作控制栏-->
					<div class="cont-c-showForm" v-if="showForm.typeA!=='special'">
						<el-button type="" @click="addFormInput(indexA)" class="create-showForm-item-input" icon="el-icon-circle-plus-outline" size="mini">单行文本</el-button>
						<el-button type="" @click="addFormInputD(indexA)" class="create-showForm-item-input" icon="el-icon-circle-plus-outline" size="mini">单行文本(禁用)</el-button>
						<el-button type="" @click="addFormInput2(indexA)" class="create-showForm-item-input" icon="el-icon-circle-plus-outline" size="mini">行内文本</el-button>
						<el-button type="" @click="addFormInput1(indexA)" class="create-showForm-item-input" icon="el-icon-circle-plus-outline" size="mini">区间文本</el-button>
						<el-button type="" @click="addFormInput1D(indexA)" class="create-showForm-item-input" icon="el-icon-circle-plus-outline" size="mini">区间文本(禁用)</el-button>
						<el-button type="" @click="addFormImg(indexA)" class="create-showForm-item-input" icon="el-icon-circle-plus-outline" size="mini">图片</el-button>							
						<el-button type="" @click="addFormTextarea(indexA)" class="create-showForm-item-input" icon="el-icon-circle-plus-outline" size="mini">多行文本</el-button>							
						<el-button type="" @click="addFormSelect(indexA)" class="create-showForm-item-input" icon="el-icon-circle-plus-outline" size="mini">下拉菜单</el-button>							
						<el-button type="" @click="addFormCheckbox(indexA)" class="create-showForm-item-input" icon="el-icon-circle-plus-outline" size="mini">多选框</el-button>					
						<el-button type="" @click="addFormRadio(indexA)" class="create-showForm-item-input" icon="el-icon-circle-plus-outline" size="mini">单选框</el-button>
						<el-button type="" @click="addFormInvFnc(indexA)" class="create-showForm-item-input" icon="el-icon-circle-plus-outline" size="mini">区间函数</el-button>
						<el-button type="danger" @click="delShowForm(indexA)" class="create-showForm-item-input" icon="el-icon-delete" size="mini">删除本项</el-button>						
					</div>
					<div class="cont-c-showForm" v-if="showForm.typeA==='special'">
						<el-button type="danger" @click="delShowForm(indexA)" class="create-showForm-item-input" icon="el-icon-delete" size="mini">删除本项</el-button>						
					</div>
				</div>		
				<div class="cont-contorl">
					<el-button type="primary" @click="addShowForm" class="create-showForm-item-btn" icon="el-icon-circle-plus-outline" size="mini">空白模版</el-button>	
					<el-button type="primary" @click="addSpecialForm" class="create-showForm-item-btn" icon="el-icon-circle-plus-outline" size="mini">特殊模版</el-button>						
				</div>
				<div class="pos-btn" >
						<el-button type="primary" @click="onSubmit()" size="small">提交</el-button>
						<el-button @click="backAddModel" size="small">返回</el-button>
				</div>			
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import ichooarouter from "../../../router"
import {getModFncParaShow,editModFncParaShow,ossBaseURL_g,ossDownBaseURL_g} from '../../../api/api';
    export default {
    	data() {
       		return {
				loading:false,
				fnc:'',
				downLoadImgBaseUrl:'',
				adminToken:'',
				imgItemIndexL:'',
				imgItemIndexA:'',
				imgItemIndexS:'',
				imgItemCont:{},
				paraShowImg:'',
				uploadUrl:'',
				paraShowModelId:'',
				paraShowName:'',
				paraShowNameCn:'',
				paraShowDes:'',
				paraShowExample:'',
				isSpecialForm:false,
				createId:10,
				paraShow:[]
			}
		},
		mounted(){
			this.downLoadImgBaseUrl=window.sessionStorage.DownLoadUrlH+ossDownBaseURL_g
			this.adminToken=window.localStorage.getItem('adminToken')
			this.uploadUrl=window.sessionStorage.ApiUrl+ossBaseURL_g+this.adminToken
			this.paraShowImg=window.sessionStorage.getItem('parpShowImg')
			this.paraShowModelId=window.sessionStorage.getItem('paraShowModelId')
			this.paraShowName=window.sessionStorage.getItem('paraShowName')
			this.paraShowNameCn=window.sessionStorage.getItem('paraShowNameCn')
			this.paraShowDes=window.sessionStorage.getItem('paraShowDes')
			this.paraShowExample=window.sessionStorage.getItem('paraShowExample')
			if(window.localStorage.isAdminId=="2"){
				this.$router.push('/index')
			}
			getModFncParaShow(window.sessionStorage.ApiUrl,{
				token:this.adminToken,
				mod_id:  this.paraShowModelId,
				fun_para_id: this.$route.params.id					
			}).then(res=>{
				if(res.data.status==200&&res.data.data[0]){
					var paraData=res.data.data[0].funParaDesc
					this.paraShow=JSON.parse(paraData)
		    	}else if(res.data.status == 201){
					this.$message({
						type: 'info',
						message: 'token失效，为保障账户安全，请重新登陆'
					});						 
					window.localStorage.clear()
					window.window.sessionStorage.setItem('isLogin','0')
					this.$router.push('/login'); 
				}else if(res.data.status!==200&&res.data.status!==201){
		     		this.$message({
					type: 'info',
					message: '获取函数列表失败!'
					});
		       	}	
			}).catch();
		},
		methods: {
			saveParaIndex(indexS,indexA,indexL){
				this.imgItemIndexA=indexA
				this.imgItemIndexS=indexS
				this.imgItemIndexL=indexL
			},
			saveItemIndex(indexS,indexA){				
				this.imgItemIndexA=indexA
				this.imgItemIndexS=indexS
			},
			//添加标题描述
			addTitleTypeNull(indexA){
				this.paraShow[indexA].typeA=""
			},
			addTitleTypeDes(indexA){
				this.paraShow[indexA].typeA="text"
			},
			addTitleTypeValue(indexA){
				this.paraShow[indexA].typeA="value"
			},
			addTitleTypeBtn(indexA){
				this.paraShow[indexA].typeA="button"
			},
			addTitleTypeBtn1(indexA){
				this.paraShow[indexA].typeA="button1"
			},
			//删除展示项
			delShowForm(indexA){
				this.paraShow.splice(indexA, 1)
			},
			//添加展示项
			addSpecialForm(){
					this.paraShow.push(
					{
						title:'是否计算刚度',
						valueA:'',
						radioA:'1',
						typeA:'special',
						describleA:'',
						showFormCreate:[
							{
								id:0,
								typeI:'img',
								valueI:'',
								labelI:'',
								describleI:'',
								imageUrl:''
							},
							{
								id:1,
								typeI:'paraCheck',
								titleI:'校核参数',
								describleI:'',
								valueI:[
									{
										valueI1:'',
										valueI2:'',
										valueI3:'',
										valueI4:'',
										valueI5:'',
										valueI6:'',
										valueI7:'',
										valueI8:'',
										valueI9:'',
										valueI10:'',
										labelI:'截面'
									},
									{
										valueI1:'',
										valueI2:'',
										valueI3:'',
										valueI4:'',
										valueI5:'',
										valueI6:'',
										valueI7:'',
										valueI8:'',
										valueI9:'',
										valueI10:'',
										labelI:'截面'
									}
								]
							},
							{
								id:2,
								typeI:'itvFnc',
								titleI:'轮廓曲线方程(外径)',
								describleI:'',
								valueI:[
									{
										valueI1:'',
										valueI2:'',
										valueI3:'',
										labelI:'f(x)='
									}
								]
							},
							{
								id:3,
								typeI:'itvFnc',
								titleI:'轮廓曲线方程(内径)',
								describleI:'',
								valueI:[
									{
										valueI1:'',
										valueI2:'',
										valueI3:'',
										labelI:'g(x)='
									}
								]
							}
						],
						showFormCreateN:[
							{
								id:0,
								typeI:'img',
								valueI:'',
								labelI:'',
								describleI:'',
								imageUrl:''
							},
							{
								id:1,
								typeI:'paraCheck',
								titleI:'校核参数',
								describleI:'',
								valueI:[
									{
										valueI1:'',
										valueI2:'',
										valueI3:'',
										valueI4:'',
										valueI5:'',
										valueI6:'',
										valueI7:'',
										valueI8:'',
										valueI9:'',
										valueI10:'',
										labelI:'截面'
									},
									{
										valueI1:'',
										valueI2:'',
										valueI3:'',
										valueI4:'',
										valueI5:'',
										valueI6:'',
										valueI7:'',
										valueI8:'',
										valueI9:'',
										valueI10:'',
										labelI:'截面'
									}
								]
							}

						]
					}
				);
			},
			addShowForm(){
				this.paraShow.push({
					id:Date.now(),
					title:'展示项'+(this.paraShow.length+1),
					typeA:'',
					valueA:'',
					unitA:'',
					describleA:'',
					showFormCreate:[]
				});
			},
			//页面图片上传
			handleSuccess(res, file,fileList){
				this.paraShow[this.imgItemIndexA].showFormCreate[this.imgItemIndexS].imageUrl=res.data.all_path
			},
			handleSuccessN(res, file,fileList){
				this.paraShow[this.imgItemIndexA].showFormCreateN[this.imgItemIndexS].imageUrl=res.data.all_path
			},
			//选择框图片上传
			handleAvatarSuccess(res, file) {
				this.paraShow[this.imgItemIndexA].showFormCreate[this.imgItemIndexS].valueForm[this.imgItemIndexL].imageUrl=res.data.all_path
			},
			beforeAvatarUpload(file) {
				
			},
			backAddModel(){
				ichooarouter.push('/model/addmodel/'+this.paraShowModelId);
			},
			//提交
			onSubmit() {
				this.loading=true;
				var params = new URLSearchParams();
				params.append('token', this.adminToken);       //你要传给后台的参数值 key/value
				params.append('mod_id', this.paraShowModelId);
				params.append('fun_para_id', this.$route.params.id);
				params.append('fun_para_desc', JSON.stringify(this.paraShow));
				editModFncParaShow(window.sessionStorage.ApiUrl,params).then(res=>{
					if(res.data.status==200){
						this.$message({
						type: 'success',
						message: '上传成功!'
						});
						ichooarouter.push('/model/addmodel/'+this.paraShowModelId);
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
						message: '提交失败!'
						});
					}
				}).catch(err=>{
						
					this.$message({
						type: 'info',
						message: '提交失败!'
					})
				});
			},
			//特殊函数
			addFncList(fnc,indexA,indexS){
				this.paraShow[indexA].showFormCreate[indexS].valueI.push({
					valueI1:'',
					valueI2:'',
					valueI3:'',
					valueI4:'',
					valueI5:'',
					valueI6:'',
					valueI7:'',
					valueI8:'',
					valueI9:'',
					valueI10:'',
					describleI:'',
					labelI:this.paraShow[indexA].showFormCreate[indexS].valueI[0].labelI
				})
			},
			addFncListN(fnc,indexA,indexS){
				this.paraShow[indexA].showFormCreateN[indexS].valueI.push({
					valueI1:'',
					valueI2:'',
					valueI3:'',
					valueI4:'',
					valueI5:'',
					valueI6:'',
					valueI7:'',
					valueI8:'',
					valueI9:'',
					valueI10:'',
					describleI:'',
					labelI:this.paraShow[indexA].showFormCreate[indexS].valueI[0].labelI
				})
			},
			delFncList(fnc,indexA,indexS){		
				if(this.paraShow[indexA].showFormCreate[indexS].valueI.length>2){
					this.paraShow[indexA].showFormCreate[indexS].valueI.pop()
				}	
			},
			delFncListF(fnc,indexA,indexS){	
				if(this.paraShow[indexA].showFormCreate[indexS].valueI.length>1){
					this.paraShow[indexA].showFormCreate[indexS].valueI.pop()
				}	
			},
			delFncListNF(fnc,indexA,indexS){	
				if(this.paraShow[indexA].showFormCreateN[indexS].valueI.length>1){
					this.paraShow[indexA].showFormCreateN[indexS].valueI.pop()
				}		
			},
			delFncListN(fnc,indexA,indexS){
				if(this.paraShow[indexA].showFormCreateN[indexS].valueI.length>2){
					this.paraShow[indexA].showFormCreateN[indexS].valueI.pop()
				}		
			},
			//添加内容
			addFormInput(indexA){
				this.paraShow[indexA].showFormCreate.push({
					id: Date.now(),
					typeI:'text',
					valueI:'',
					labelI:'',
					describleI:'',
					status:'0',
					unitI:''					
				});
			},
			addFormInputD(indexA){
				this.paraShow[indexA].showFormCreate.push({
					id: Date.now(),
					typeI:'textD',
					valueI:'',
					labelI:'',
					describleI:'',
					unitI:''					
				});
			},
			addFormInvFnc(indexA){				
				this.paraShow[indexA].showFormCreate.push({
					id: Date.now(),
					typeI:'itvFnc',
					titleI:'轮廓曲线方程(外径)',
					describleI:'',
					valueI:[
						{
							valueI1:'',
							valueI2:'',
							valueI3:'',
							labelI:'f(x)='
						}
					]				
				});
			},
			addFormInput1(indexA){
				this.paraShow[indexA].showFormCreate.push(	{
					id:Date.now(),
					typeI:'text1',
					valueI:'',
					valueI2:'',
					labelI:'',
					describleI:'',
					status:'0',
					unitI:''					
				});
			},
			addFormInput1D(indexA){
				this.paraShow[indexA].showFormCreate.push(	{
					id:Date.now(),
					typeI:'text1D',
					valueI:'',
					valueI2:'',
					labelI:'',
					describleI:'',
					unitI:''					
				});
			},
			addFormInput2(indexA){		
				this.paraShow[indexA].showFormCreate.push(	{
					id:Date.now(),
					typeI:'text2',
					valueI:'',
					labelI:'',
					describleI:'',
					status:'0',
					unitI:''			
				});
			},
//=============================================================================================================================================================			
			addFormImg(indexA){				
				this.paraShow[indexA].showFormCreate.push(	{
					id:Date.now(),
					typeI:'img',
					valueI:'',
					labelI:'',
					describleI:'',
					imageUrl:''			
				});
			},
			addFormTextarea(indexA){				
				this.paraShow[indexA].showFormCreate.push(	{
					id:Date.now(),
					typeI:'textarea',
					valueI:'',
					labelI:'',	
					status:'0',
					describleI:''			
				});
			},
			addFormSelect(indexA){				
				this.paraShow[indexA].showFormCreate.push(
						{
							id:Date.now(),
							typeI:'select',
							labelI:'',
							valueI:'',
							describleI:'',
							valueForm:[
								{
									labelL:'0',
									valueL:''
								
								},{
									labelL:'1',
									valueL:''
								},{
									labelL:'2',
									valueL:''
								}
							]
						}
				)
			},
			addFormCheckbox(indexA){
				this.paraShow[indexA].showFormCreate.push(
					{
						id:Date.now(),
						typeI:'checkbox',
						valueI:[],
						labelI:'多选标题',
						describleI:'',
						valueForm:[
							{
								typeL:'text',
								labelL:'0',
								unitL:'',
								listL:[]								
							},
							{
								typeL:'uploadBtn',
								labelL:'0',
								unitL:'',
								valueL:'',
								listL:[]								
							},
							{
								typeL:'textDes',
								labelL:'2',
								unitL:'',
								listL:[
									{
										typeD:'text',
										labelD:'最小体积',
										valueL:'',
										unitD:'m³'
									},
									{
										typeD:'text',
										labelD:'最大体积',
										valueL:'',
										unitD:'m³'
									}
								]									
							},
							{
								typeL:'img',
								labelL:'3',
								imageUrl: ''
							}
						]
					}
				)
			},
			addFormRadio(indexA){			
				this.paraShow[indexA].showFormCreate.push(
						{
							id:Date.now(),
							typeI:'radio',
							valueI:'',
							labelI:'单选标题',
							describleI:'',
							valueForm:[						
								{
									typeL:'text',
									labelL:'1',
									unitL:'',
									listL:[]								
								},
								{
									typeL:'uploadBtn',
									labelL:'0',
									valueL:'',
									unitL:'',
									listL:[]								
								},
								{
									typeL:'textDes',
									labelL:'示例',
									unitL:'',
									listL:[
										{
											typeD:'text',
											labelD:'最小体积',
											valueL:'',
											unitD:'m³'
										},
										{
											typeD:'text',
											labelD:'最大体积',
											valueL:'',
											unitD:'m³'
										}
									]									
								},
								{
									typeL:'img',
									labelL:'2',
									imageUrl: ''
								}
							]
						}
				)
			},
			addChooseRadioText(indexA,indexS){
				var radioC=this.paraShow[indexA].showFormCreate[indexS].valueForm
				radioC.push({
					typeL:'text',
					labelL:radioC.length,
					unitL:'',
					listL:[]								
				})
			},
			addChooseRadioBtn(indexA,indexS){
				var radioC=this.paraShow[indexA].showFormCreate[indexS].valueForm
				radioC.push({
					typeL:'uploadBtn',
					labelL:radioC.length,
					valueL:'',
					unitL:'',
					listL:[]								
				})
			},
			addChooseRadioImg(indexA,indexS){
				var radioC=this.paraShow[indexA].showFormCreate[indexS].valueForm
				radioC.push({
					typeL:'img',
					labelL:radioC.length,
					imageUrl: '',
					unitL:'',
					listL:[]
				})
			},
			addChooseRadioDetial(indexA,indexS){
				var radioC=this.paraShow[indexA].showFormCreate[indexS].valueForm
				radioC.push({
					typeL:'textDes',
					labelL:radioC.length,
					unitL:'',
					listL:[
						{
							typeD:'text',
							labelD:'',
							valueD:'',
							unitD:''
						},
						{
							typeD:'text',
							labelD:'',
							valueD:'',
							unitD:''
						}
					]									
				})
			},
			addSelectOption(indexA,indexS){
				let radioC=this.paraShow[indexA].showFormCreate[indexS].valueForm
				radioC.push({
					labelL:'',
					valueL:''
				})
			},
			delSelectOption(indexA,indexS,indexL){
				if (indexL !== -1) {
					this.paraShow[indexA].showFormCreate[indexS].valueForm.splice(this.paraShow[indexA].showFormCreate[indexS].valueForm.length-1, 1)
				}
			},
			delChooseRadio(indexA,indexS,indexL){
				if (indexL !== -1) {
					this.paraShow[indexA].showFormCreate[indexS].valueForm.splice(indexL, 1)
				}
			},
			delForm(indexA,item){
				var index = this.paraShow[indexA].showFormCreate.indexOf(item)
				if (index !== -1) {
				this.paraShow[indexA].showFormCreate.splice(index, 1)
				}
			},
			delFormN(indexA,item){
				var index = this.paraShow[indexA].showFormCreateN.indexOf(item)
				if (index !== -1) {
					this.paraShow[indexA].showFormCreateN.splice(index, 1)
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
		.content-views-nav{
			border-bottom: 1px solid #909290;
			flex:0 0 20px;
			line-height:20px;
			padding: 10px 15px 0;
			font-size: 12px;
			min-width:990px;
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
	}
		.content-views-body{
			padding:0 10px 0;
			flex:1;
			height:100%;
			overflow-y:auto;
			overflow-x:hidden;
			min-width:1000px;
			.content-views-body-fnc{				
				background: #fff;
				display:flex;
				margin:10px 0;
				padding:100px 10px 120px;
				border:1px solid #dcdfe6;
				border-radius:4px;
				position: relative;
				flex-direction: column;
				justify-content:space-around;
				overflow-x: hidden;
				h4{
					position: absolute;
					top:0;
					left:10px;
					height:38px;
					line-height: 40px;
					font-size: 16px;
					margin:10px 20px 10px;
					input{
						height: 32px;
						border-radius:4px;
						border:1px solid #dcdfe6;
						padding:0 10px;
					}
				}
				.h-para-show{
					top:50px;
					left:20px;
					font-size: 14px;
				}
				.cont-contorl{
					position: absolute;
					bottom:80px;
					left:0;
					width:100%;
					text-align: center;
				}
				.form-cont{
					display:flex;
					margin:10px;
					padding:0 0 90px 0;
					position: relative;
					.cont-l{
						flex:1;
						min-width:400px;
						padding: 90px 10px 20px;
						border:1px solid #dcdfe6;
						border-radius:4px;
						margin:10px 30px;
						position: relative;
						.cont-l-title{						
							position: absolute;
							top:0;
							height:74px;
							line-height: 40px;
							font-size: 14px;
							margin:10px 20px 10px;
							left:20px;
							font-weight: 600;
							width:350px;
							input{
								width:200px;
								height: 26px;
								border-radius:4px;
								border:1px solid #dcdfe6;
							}	
									
						}
						.cont-l-add{
							position: absolute;
							right:0;
							top:0px;
							line-height: 40px;
							height:40px;
							margin:10px 10px 10px;
							.cont-l-add-show{
								position: absolute;
								display:none;
							}
						}	
						.cont-l-add:hover{
							.cont-l-add-show{
								position: absolute;
								display:block;
								z-index:8;
								background: #fff;
								border-radius:4px;
								border:1px solid #dcdfe6;
								width:100px;
								p{
									text-align: center;
									height:28px;
									line-height: 28px;
									cursor: pointer;
								}
								p:hover{
									color:#66b1ff;
								}
							}
						}
						.create-showForm{
							width:92%;
							min-height: 60px;
							.showForm-textarea{
								position: relative;
								width:100%;
								.select-label{
									position: absolute;
									top:0px;
									left:0px;
									width:55px;
								}
								.textarea-value{
									margin-left:60px;
									width:80%;
								}
							}
							.showForm-paraCheck{
								width:100%;
								position: relative;
								text-align: center;
								
								.paraCheck-btn1{
									position: absolute;
									top:58px;
									right: 20px;
								}
								.paraCheck-btn2{
									position: absolute;
									top:58px;
									right: 0px;
								}
								.paraCheck-h{
									padding:0 50px 0 32px;
									display: flex;
									.paraCheck-h-t{
										flex:1;
									}
								}
								.paraCheck-b{
									height:28px;
									line-height: 28px;
									display: flex;
									padding:0 50px 0 32px;
									position: relative;
									.paraCheck-b-t{
										position: absolute;
										left:0;
										height:26px;
										line-height: 28px;
										width: 30px;
										padding:0;
										border-radius:4px;
										border:1px solid #dcdfe6;
									}
									.paraCheck-b-c{
										display: inline-block;										
										margin: 0px;
										max-width:10%;
										border-radius:4px;
										border:1px solid #dcdfe6;
										box-sizing: border-box;
									}
								}
								
							}
							.showForm-itvFnc{
								width:100%;
								position: relative;
								.showForm-itvFnc-cont{
									width:100%;
								}
								.showForm-itvFnc-btn1{
									position: absolute;
									right:35px;
									top:30px;
								}
								.showForm-itvFnc-btn2{
									position: absolute;
									right:15px;
									top:30px;
								}
							}
							.showForm-select{
								padding-top:32px;
								position: relative;
								width:100%;
								min-height: 60px;
								.select-label{
									position: absolute;
									top:-32px;
									left:0px;
									width:55px;
								}
								.select-list{
									margin-left:60px;
								}
								.create-showForm-item-add{
									position: absolute;
									top:32px;
									left:20px;
								}
								
								.create-showForm-choose-del{
									position: absolute;
									top:32px;
									right:-20px;
								}
							}
							#text2{
								width: 49%;							
							}
							.create-showForm-item{
								float: left;
								position: relative;
								width: 100%;
								.create-showForm-item-btn{
								
									position: absolute;
									top:0;
									right:-20px;
								}
								.create-showForm-item-btn2{
									position: absolute;
									top:0;
									right:2px;
								}
								.create-showForm-item-input{
									position: absolute;
									top:0;
									left:-65px;
									width:60px;
								}
								.showForm-choose{
									position: relative;
									padding-top:32px;
									width:100%;
									.choose-label{
										position: absolute;
										top:0px;
										left:0px;
										width:55px;
									}
									.create-showForm-item-add{
										position: absolute;
										top:32px;
										left:20px;
									}
									.create-showForm-choose-del{
										position: absolute;
										top:1px;
										left:208px;
									}
									#textDes{
										height:120px;
										.create-showForm-choose-textD{
											position: absolute;
											top:2px;
											left:24px;
											height:24px;
											line-height: 24px;
											border-radius:4px;
											width:170px;
											input{
												height:24px;
												line-height: 24px;
												border:1px solid #dcdfe6;
												border-radius:4px;
												width:170px;
											}
											.choose-textD-list{
												z-index: 3;
												position:absolute;
												top:24px;
												left:30px;
												width:170px;
												padding-top: 10px;
												.list-detial{
													height:26px;
													line-height: 26px;
													margin-bottom: 10px;
												}
											}
										} 
									}
									.create-showForm-choose{
										width:90%;
										margin-left:60px;
										line-height: 30px;	
										.create-showForm-choose-btn{
											position: absolute;
											top:2px;
											left:24px;
											height:24px;
											line-height: 24px;
											width:170px;
											input{
												height:24px;
												line-height: 24px;
												border:1px solid #dcdfe6;
												border-radius:4px;
												width:50px;
											}
										}								
										.create-showForm-choose-input{
											position: absolute;
											top:2px;
											left:24px;
											height:24px;
											line-height: 24px;
											border:1px solid #dcdfe6;
											border-radius:4px;
											width:170px;
										
										}
									}
								}
								
							}
						}
					}
					.cont-r{
						flex:1;
						max-width:500px;
						min-width:400px;
						padding: 70px 10px 20px 30px;
						border:1px solid #dcdfe6;
						border-radius:4px;
						margin:10px 30px;
						position: relative;
						font-size:12px !important;
						p{						
							position: absolute;
							top:0;
							height:40px;
							line-height: 40px;
							font-size: 14px;
							margin:10px 20px 10px;
							left:20px;
							font-weight: 600;
							input{
								width:60px;
								height: 26px;
								border-radius:4px;
								border:1px solid #dcdfe6;
							}				
						}
						.create-showForm{
							width:92%;
							.showForm-textarea{
								position: relative;
								width:100%;
								.select-label{
									position: absolute;
									top:0px;
									left:0px;
									width:55px;
								}
								.textarea-value{
									margin-left:60px;
									width:80%;
								}
							}
							.showForm-paraCheck{
								width:100%;
								position: relative;
								text-align: center;
								.paraCheck-btn1{
									position: absolute;
									top:58px;
									right: 20px;
								}
								.paraCheck-btn2{
									position: absolute;
									top:58px;
									right: 0px;
								}
								.paraCheck-h{
									padding:0 50px 0 32px;
									display: flex;
									.paraCheck-h-t{
										flex:1;
									}
								}
								.paraCheck-b{
									height:28px;
									line-height: 28px;
									display: flex;
									padding:0 50px 0 32px;
									position: relative;
									.paraCheck-b-t{
										position: absolute;
										left:0;
										height:26px;
										line-height: 28px;
										width: 30px;
 										padding:0;
										border-radius:4px;
										border:1px solid #dcdfe6;
									}
									.paraCheck-b-c{
										display: inline-block;										
										margin: 0px;
										max-width:10%;
										border-radius:4px;
										border:1px solid #dcdfe6;
										box-sizing: border-box;
									}
								}
							}
							.showForm-itvFnc{
								width:100%;
								position: relative;
								.showForm-itvFnc-cont{
									width:100%;
								}
								.showForm-itvFnc-btn1{
									position: absolute;
									right:35px;
									top:30px;
								}
								.showForm-itvFnc-btn2{
									position: absolute;
									right:15px;
									top:30px;
								}
							}
							.showForm-select{
								position: relative;
								width:100%;
								.select-label{
									position: absolute;
									top:0px;
									left:0px;
									width:55px;
								}
								.select-list{
									margin-left:60px;
								}
								.create-showForm-item-add{
									position: absolute;
									top:32px;
									left:20px;
								}
								.create-showForm-choose-del{
									position: absolute;
									top:32px;
									right:-20px;
								}
							}
							#text2{
								width: 50%;
								margin:0;
							}
							
							.create-showForm-item{
								float: left;
								position: relative;
								width: 100%;
								.create-showForm-item-btn{
								
									position: absolute;
									top:0;
									right:-20px;
								}
								.create-showForm-item-btn2{
									
									position: absolute;
									top:0;
									right:2px;
								}
								.create-showForm-item-input{
									position: absolute;
									top:0;
									left:-65px;
									width:60px;
									
								}
								.showForm-choose{
									position: relative;
									width:100%;
									.choose-label{
										position: absolute;
										top:0px;
										left:0px;
										width:55px;
									}
									.create-showForm-item-add{
										position: absolute;
										top:32px;
										left:20px;
									}
									.create-showForm-choose-del{
										position: absolute;
										top:1px;
										left:208px;
									}
									.create-showForm-choose{
										width:100%;
										margin-left:60px;
										line-height: 30px;
										
										.create-showForm-choose-input{
											position: absolute;
											top:2px;
											left:24px;
											height:24px;
											line-height: 24px;
											border:1px solid #dcdfe6;
											border-radius:4px;
											width:170px;
										
										}	
									}
								}
								
							}
						}
					}
					.cont-c-showForm{
						position:absolute;
						bottom:0px;
						left:0;
						width: 100%;
						height: 80px;
						line-height:40px;
						padding:70px 0px 0;
						overflow: hidden;
						text-align: center;
						.create-showForm-item-input{
							margin:0px;
						}		
					}
				}			
				.pos-btn{
					position:absolute;
					bottom:20px;
					right:30px;
					width: 200px;
					text-align: right;
				}
				
			}
			.content-views-body-name{
				border:1px solid #dcdfe6;
				background: #fff;
				display:flex;
				margin-top:10px;
				padding:60px 10px 10px;
				border-radius:4px;
				position: relative;
				h4{
					position: absolute;
					top:0;
					left:10px;
					height:38px;
					line-height: 40px;
					font-size: 16px;
					margin:10px 20px 10px;
				}
				.content-views-body-name-cont{
					display: flex;
					min-height:140px;
					flex-direction: row-reverse;
					font-size: 14px;
					border-radius:4px;
					border:1px solid #dcdfe6;
					width:100%;
					margin: 10px 20px 10px;
					padding:15px 0;
					.cont-l{
						flex:auto;
						width:100%;
						margin:10px 40px;
						p{
							max-width: 600px;
							line-height: 36px;
							font-size: 14px;
							font-weight: 600;
							.para-name-pad-r{
								margin-right: 90px;
							}
							span{
								font-weight: 500;
							}
						}
					}
					.cont-r{
						margin: 10px 20px 10px;
						position: absolute;
						left:680px;
						width:300px;
						.el-form-item__content{
							font-size: 12px;
						}
						p{
							height:36px;
							line-height: 36px;
							font-size: 14px;
							font-weight: 600;
						}
						img{
							width:140px;
							height:100px;
							margin-left:90px;
							margin-top:-25px;
						}
					}
				}
			}
		}
		.avatar-uploader{
			width: 120px;
			border: 1px dashed #ccc;
		.el-upload {
			border: 1px dashed #ccc;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}
		.el-upload:hover {
			border-color: #409EFF;
		}
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 120px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}
	.avatar {
		width: 120px;
		height: 100px;
		display: block;
	}
</style>
