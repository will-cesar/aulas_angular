$(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
		$this.parents('.panel').find('.panel-footer').hide();
        $this.addClass('panel-collapsed');
		 $( ".panel-footer" ).hide();
		   $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
        // $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
		$this.parents('.panel').find('.panel-footer').slideUp();
        $this.removeClass('panel-collapsed');
		 $( ".panel-footer" ).show();
        // $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
		 $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    }
});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('click', '#new_chat', function (e) {
    var size = $( ".chat-window:last-child" ).css("margin-left");
     size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
    clone.css("margin-left", size_total);
});
$(document).on('click', '.icon_close', function (e) {
    //$(this).parent().parent().parent().parent().remove();
    $( "#chatbox" ).hide();
});

// send function start
  $(function(){
	    var $this = $(this);
	   // $this.parents('.panel').find('.panel-body').slideUp();
		// $this.parents('.panel').find('.panel-footer').hide();
        // $this.addClass('panel-collapsed');
		 $this.removeClass('panel-collapsed');
		 $( ".panel-body" ).hide();
		 $( ".panel-footer" ).hide();
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
	  
  });

function send(){
	var chat = $("#btn-input").val(); 
var dt = new Date();
var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

if (chat =="") {
    alert('Enter Message');
} else
{
var body =                       '<div class="row msg_container base_sent">' +
						'<div class="col-md-10 col-xs-10 ">' +
                            '<div class="messages msg_sent">' +
                                '<p>'+ chat + '</p>'+
                             
                            '</div>' +
                        '</div>' +
                       
					'</div>';
}
$(body).appendTo("#messagebody");
$('#btn-input').val('');
$("#messagebody").animate({ scrollTop: $("#messagebody")[0].scrollHeight}, 'slow');
}


// send function end




$( "#btn-chat" ).click(function() {
send()
});

$('#btn-input').keypress(function (e) {
  if (e.which == 13) {
    send()
  }
});




