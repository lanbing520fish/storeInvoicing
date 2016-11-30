$(document).ready(function(){
	$('.zh-lg .change').click(function(){
		$(this).parents('.zh-lg').hide();
		$('.tel-lg').show();
	})
	$('.tel-lg .change').click(function(){
		$(this).parents('.tel-lg').hide();
		$('.zh-lg').show();
	})
	var wait=60; 
	function time(o) { 
		if (wait == 0) { 
			o.removeAttribute("disabled"); 
			o.value="重新获取验证码"; 
			wait = 60; 
		} else { 
			o.setAttribute("disabled", true); 
			o.value="重新发送(" + wait + ")"; 
			wait--; 
			setTimeout(function() { 
				time(o) 
				}, 
			1000) 
		} 
	} 
	$("#btn").click(function(){
		time(this);
	}) 
})