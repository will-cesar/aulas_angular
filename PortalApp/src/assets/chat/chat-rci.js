  $(function(){
$("#btnChatFlt").click(function () {
          $('#qnimate').addClass('popup-box-on');
		  document.getElementById("btnChatFlt").style.visibility = "hidden";
            });
          
            $("#removeClass").click(function () {
          $('#qnimate').removeClass('popup-box-on');
		   document.getElementById("btnChatFlt").style.visibility = "visible";
            });
			
			  $("#minimizarClass").click(function () {
          $('#qnimate').removeClass('popup-box-on');
		   document.getElementById("btnChatFlt").style.visibility = "visible";
            });
			
  })