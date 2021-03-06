$(function(){
	//获取字典数据
	var columns = [[
	                {field:'view',title:'操作',width:200,align:'center',formatter:operateData},
					{field:'userId',title:'用户名',width:150,align:'center',sortable:true},
					{field:'realName',title:'真实姓名',width:150,align:'center',sortable:true},
					{field:'certNo',title:'身份证',width:150,align:'center',sortable:true},
					{field:'position',title:'职位',width:150,align:'center',sortable:true},
					{field:'mobile',title:'手机号',width:150,align:'center'},
					{field:'email',title:'邮箱',width:150,align:'center'}
//					{field:'userLevelName',title:'用户等级',width:100,align:'center',sortable:true},
//					{field:'leadAuthStateName',title:'状态',width:80,align:'center'}
				]];
	$('#userTable').datagrid({
		url: path + "/userAuth/getLeadApplyList.html",
		columns: columns,
		rownumbers : true,
		singleSelect: true,
		height:bodyHeight-230,
		pagination: true
	});
	
	//查询按钮事件
    $("#searchBtn").click(function(){
//    	$.ajax({
//			type : "POST",
//			url : path + '/userAuth/getLeadApplyList.html',
//			success : function() {
//				
//			}
//		});
    	
    	queryToGrid("userTable", "list_search");
    });
});

/**
 * 修改状态
 * @param userId
 * @param status
 */
function auditAuth(id,status){
	var msg ='';
	if (status=='passed') {
		msg='您确定要审核通过吗?';
	}else{
		msg='您确定要审核拒绝吗?';
	}
	$.messager.confirm('提示', msg, function(r) {
		if (r) {
			$.ajax({
				type : "POST",
				url : path + '/userAuth/auditLeadorAuth.html',
				data : {
					'id' : id,
					'investAuthState' : status
				},
				success : function() {
					queryToGrid("userTable", "list_search");
				}
			});
		}
	});
}
