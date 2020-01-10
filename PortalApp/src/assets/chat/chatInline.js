var chtfltLogado = false;
var chtfltAtendimento = null;
var src = chtfltUrl;
var frame = null;
var autenticar = true;
var debug = false;

function getScript(source, id, callback) {
    var script = document.createElement('script');
    var prior = document.getElementsByTagName('script')[0];
    script.async = 1;
    script.id = id;

    script.onload = script.onreadystatechange = function( _, isAbort ) {
        if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
            script.onload = script.onreadystatechange = null;
            script = undefined;

            if(!isAbort) { if(callback) callback(); }
        }
    };

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
	//$('#qnimate', window.parent.document).addClass("blue");

}

function closeIFrameChtflt(){
    document.getElementById('chatBot').style.display = 'none';
    document.getElementById('btnChatFlt').style.display = 'block';
    window.localStorage.setItem('chatBotPosition', 'close');
	$(parent.document).find('#qnimate').addClass("blue");
	
	var iframe = document.getElementById("iframeChatBot");
	if (iframe) {
	var iframeContent = (iframe.contentWindow || iframe.contentDocument);
 
   iframeContent.fecharTeste();
}
	
}

function openIFrameChtflt(){
    document.getElementById('chatBot').style.display = 'block';
    document.getElementById('btnChatFlt').style.display = 'none';
    window.localStorage.setItem('chatBotPosition', 'open');
}

function setCss() {
    document.getElementById('closeChatBot').style.display = 'block';
}

function atualizarSessaoChtflt() {
    var split = chtfltUrl.split('id/');
    var nomIdentificador = split[1];
    if (typeof chtfltLogin === 'undefined')
        chtfltLogin = {};
    chtfltLogin['id'] = nomIdentificador;
    chtfltLogin['position'] = window.localStorage.getItem('chatBotPosition');
    frame.contentWindow.postMessage({action: 'hideLogin'}, '*');
    frame.contentWindow.postMessage({action: 'autenticar', chtfltLogin: chtfltLogin}, '*');
}

function gerarAtendimentoChtflt() {
    frame.contentWindow.postMessage({action: 'reautenticar'}, '*');
}

function chtfltDeslogarSite() {
    frame.contentWindow.postMessage({action: 'logout'}, '*');
}

function chtfltLogarSite() {
    chtfltDeslogarSite();
}

function teste(){
	closeIFrameChtflt();
	$('#btnChatFlt').css("display", "block");
}

function iFrameLoaded() {

    if (debug) {
        console.log("=================Iframe carregado...");
        console.log("=================frame = " + frame);
    }

    if (frame == null) {
        var myEvent = window.attachEvent || window.addEventListener;
        var chkevent = window.attachEvent ? 'onmessage' : 'message';
        myEvent(chkevent, function (event) {

            if (event.data.action != 'resize' && debug) {
                console.log(event.data);
            }

            if (event.data.action == 'resize') {

                if (typeof event.data.origin !== 'undefined' && event.data.origin == 'login' && typeof chtfltLogin !== 'undefined') {
                    if (debug) console.log("=================Fechando Chat");
                    closeIFrameChtflt();
                    if (debug) console.log("=================Ocultando Login");
                    frame.contentWindow.postMessage({action: 'hideLogin'}, '*');
                    if (debug) console.log("=================chtfltLogado = false");
                    chtfltLogado = false;
                }
                /*else if (typeof event.data.origin !== 'undefined' && event.data.origin == 'login' && typeof ascLogin === 'undefined') {
                 }*/
            }

            if (event.data == 'errorLogin') {
                if (debug) console.log("=================autenticar = false");
                autenticar = false;
            }

            if (event.data == 'autenticar-inline') {
                if (debug) console.log("=================Fechando Chat");
                closeIFrameChtflt();
            }

            if (event.data == 'atualizar-sessao') {
                if (debug) console.log("=================Atualizando sessao");
                atualizarSessaoChtflt();
            }

            if (event.data.action == 'autenticar') {
                if (debug) console.log("=================Autenticado!");
                var response = event.data.response;
                if (typeof response.url !== 'undefined') {
                    if (debug) console.log("=================chtfltAtendimento = " + response.cod_atendimento);
                    chtfltAtendimento = response.cod_atendimento;
                }
                else {
                    if (debug) console.log("=================chtfltLogado = true");
                    chtfltLogado = true;
                }
            }
            else if (event.data.action == 'reautenticar') {
                if (debug) console.log("=================Reautenticado!");
                var response = event.data.response;
                if (debug) console.log("=================chtfltAtendimento = " + response.cod_atendimento);
                chtfltAtendimento = response.cod_atendimento;
            }

        });
    }

    setCss();
    frame = document.getElementById('iframeChatBot');
    frame.contentWindow.postMessage({action: "setCss", chtfltTema: chtfltTema}, '*');
    frame.style.display = 'block';
    document.getElementById('closeChatBot').style.display = 'block';

    var position = window.localStorage.getItem('chatBotPosition');
    if (debug) console.log("=================Checando login");
    frame.contentWindow.postMessage({action: 'checkLogin'}, '*');

    if (position) {
        if (position == 'open') {
            if (debug) console.log("=================Position = open => Abrindo Chat");
            openIFrameChtflt();
        } else {
            if (debug) console.log("=================Position = close => Fechando Chat");
            closeIFrameChtflt();
        }
    }
    else {
        if (debug) console.log("=================Position = null => Fechando Chat");
        closeIFrameChtflt();
    }

}

function init() {

    if (debug) console.log('=================Construindo iframe...');

    var userAgent = window.navigator.userAgent;

    var classe = "";
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
        classe = "chtflt_safari_only";
    }

    var mainDiv = '<div id="abaChatBot" style="height:100px; display:block">'+
        '<div class="chtflt-box">'+
        '<div class="chtflt-box-title" onclick="closeIFrameChtflt()" id="chatBotCollapse" style="cursor:pointer">'+
        '<span>Chat on-line</span>'+
        '<div class="chtflt-box-tool">'+
		'<a href="javascript:void(0);" data-id="" id="closeChatBot"><i class="icon_close"></i></a>'+
        '</div>'+
        '</div>'+
        '<div id="bodyIframe" class="'+classe+'">'+
        '<iframe id="iframeChatBot" class="'+classe+'" src="'+src+'" onload="iFrameLoaded()" style="display:none"></iframe>'+
        '</div>'+
        '</div>'+
        '</div>';

    var divBtn = '<button id="btnChatFlt" style="display:none"> '+ ( ( typeof chtfltUrlImg !== "undefined" && chtfltUrlImg != "" ) ? 
	'<img src="'+chtfltUrlImg+'" width="22" height="22" />' : '') + '<span>' + chtfltTitulo+'</span></button>';

    var content = document.createElement('div');
    content.setAttribute("id", "chatBot");
    content.setAttribute("class", chtfltTema);
    content.setAttribute("style", 'display:none');
    content.innerHTML = mainDiv;
    document.body.appendChild(content);

    if (debug) console.log("=================Iframe criado!");

    var contentButton = document.createElement('div');
    contentButton.setAttribute('id', 'divBtnChtflt');
    contentButton.setAttribute('class', chtfltTema);
    contentButton.innerHTML = divBtn;
    document.body.appendChild(contentButton);

    var bol_robo = chtfltRobo;

    if (bol_robo == 1 && typeof chtfltLogin !== 'undefined') {
        if (debug) console.log("=================Redimensionando chat para robo");
        document.getElementById("chatBot").style.width = '415px';
    }

    var abreChat = function (e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        if (debug) console.log("=================Abrindo Chat");
        openIFrameChtflt();

        if (autenticar && typeof chtfltLogin !== 'undefined' && chtfltLogado && chtfltAtendimento == null) {
            if (debug) console.log("=================Gerando atendimento");
            gerarAtendimentoChtflt();
        }
        else if(autenticar && typeof chtfltLogin !== 'undefined' && !chtfltLogado){
            if (debug) console.log("=================Atualizando sessao SAC");
            atualizarSessaoChtflt();
        }
    };

    if ( document.getElementById('btnChatFlt').addEventListener ) {
        document.getElementById('btnChatFlt').addEventListener('click', abreChat);
    } else {
        document.getElementById('btnChatFlt').attachEvent('onclick', abreChat);
    }

    var myEvent = window.attachEvent || window.addEventListener;
    var chkevent = window.attachEvent ? 'onmessage' : 'message';
    myEvent(chkevent, function(event){
        event = event || window.event;
        if (event.data.action == 'resize') {

            if (debug) console.log(event.data);

            if (debug) console.log("=================Redimensionando tela");
            document.getElementById("chatBot").style.width = event.data.width + 'px';

            if (typeof event.data.chtfltLogado !== 'undefined') {
                if (debug) console.log("=================Contato ja logado no SAC");
                chtfltLogado = true;
            }

            if (typeof event.data.chtfltAtendimento !== 'undefined') {
                if (debug) console.log("=================Atendimento existente");
                chtfltAtendimento = event.data.chtfltAtendimento;
            }

            if (typeof event.data.origin !== 'undefined' && event.data.origin == 'pesquisa' && typeof chtfltLogin !== 'undefined') {
                if (debug) console.log("=================Tela de pesquisa => Atendimento ja finalizado.");
                chtfltAtendimento = null;
            }
        }
    });
}




init();