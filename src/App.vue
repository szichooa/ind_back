<template>
  <div class="apps">
    <router-view/>
  </div>
</template>

<script>
export default {
	name: 'App',
	mounted:function(){
		this.getConfigJson();
	}
}
</script>

<style>
	.apps {
		width: 100%;
		height: 100%;
		overflow: hidden;
		min-height: 768px;
		min-width:1280px;
	}
	.cell{
			text-align:center !important;
		}
	.el-table th{
		background:rgb(221, 221, 221);
	}
	.el-table th:nth-child(1){
		color:#000 !important;
		font-size:14px !important;
		font-weight:600 !important;
	}
	.el-table th:nth-child(2){
		color:#000 !important;
		font-size:14px !important;
		font-weight:600 !important;
	}
	.el-table th:nth-child(3){
		color:#000 !important;
		font-size:14px !important;
		font-weight:600 !important;
	}
	.gutter{
		background:rgb(221, 221, 221);
	}
	.el-input__inner,.el-textarea__inner{
		padding:0 5px !important;
		margin:0;
	}
	.el-checkbox__label {
    	display: inline;
	}
	input{
		padding-left:5px;
	}
	el-input{
		font-size: 12px;
	}
	html,
	body {
		position: relative;
		height:100%;
	}
	/* CSS Document */
	
	body,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	a,
	img,
	ul,
	li,
	ol,
	dl,
	dt,
	dd,
	figure,
	figcaption {
		padding: 0;
		margin: 0
	}
	
	img {
		display: block;
		border: 0;
		cursor: pointer;
	}
	
	input {
		outline: none;
		border: 0;
	}
	
	ul,
	ol {
		list-style: none;
	}
	
	body {
		font-size: 12px;
		font-family:  -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei;
		color: #3e3e3e;
	}
	textarea{
		font-family:  -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei;
	}
	a {
		text-decoration: none;
		color:  #3e3e3e;
		display: block;
		cursor:auto;
	}
	.el-checkbox+.el-checkbox {
		margin-left: 0px !important;
	}
	a:hover {
		color:  #3e3e3e;
	}
	.el-tooltip__popper{
		max-width:280px !important;
		background: #fff;
		color:#606266;
		border:1px solid #ccc;
		line-height:18px;
	}
	.el-input__prefix{
		left:120px !important;
	}
	
	header,
	footer,
	section,
	figure,
	figcaption,
	main,
	nav,
	aside,
	article {
		display: block;
	}
	
	.l {
		float: left;
	}
	
	.r {
		float: right;
	}
	
	.w {
		width: 1200px;
		margin: 0 auto;
	}
</style>