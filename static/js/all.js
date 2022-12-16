/**
 * 
 * Página de integração simples que consome REST do PagTesouro, 
 * desenvolvido pelos militares 1º Ten Brum (ritex 2035 3391) - 
 * DGO e 3º SGT Augusto (ritex 2035 3156) - SEF.
 * 
 * Customização: 3º SGT Malliotti (ritex 830 1248) - 3º RCG
 * 
 */
$(function(){
    
    window.addEventListener("message", receiveMessage, false);   
    function receiveMessage(event) {
        // ================================================================
        //
        // Ambiente de Homologação: https://valpagtesouro.tesouro.gov.br
        // Ambiente de Produção: https://pagtesouro.tesouro.gov.br
        //
        // ================================================================
        if (event.origin !== "https://pagtesouro.tesouro.gov.br"){
            return;
        }

        // Evento disparado pelos botões Fechar/Concluir.
        if (event.data === "EPAG_FIM"){
            $("#dialog").dialog( "close" );            
        }            
    }

    //se os campos estiverem vázios seto zero.
    function verifica_campos_vazios(){
        //var _campos_nao_preenchidos= [];
        //var _cont=0;

        $('input').each(function(index, value) {        
            if ( $('#'+ this.id).val() == "") {
                //_campos_nao_preenchidos[_cont] = this.id;
                //_cont++;
                $('#'+ this.id).focus();
                $('#'+ this.id).val("0");
            }
        });
    }

    $('#form_principal').submit(function(_evt){
        _evt.preventDefault();
        verifica_campos_vazios();
        $.ajax({
            // -------------------------------------------
            // url DEV: https://valpagtesouro.tesouro.gov.br/api/gru/solicitacao-pagamento
            // url PRD: https://pagtesouro.tesouro.gov.br/api/gru/solicitacao-pagamento
            // -------------------------------------------
            url: "https://pagtesouro.tesouro.gov.br/api/gru/solicitacao-pagamento",
            crossDomain: true,
            type: "POST",
            headers: {
                // -------------------------------------------
                //Chave de autorização correspondente à OM
                // -------------------------------------------
                "Authorization": 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNjczNDMifQ.U5K7TmV0ouA48UFPoGxqRytjiP7Fx8ivm7FoiLi3QD3t9K8xTH61XOfgiCht3s6UL4Z62aexQJrt7P2SA6JWxSkOszYiK50jHi9lDLhPDRcmXX9VlSUmtrM4kz8fCKmZ7R0hUBLb_w9mNxO_BHMaHFHKfiSAvpqdeRkOxPoxaNc2gc7pZ7YkBSnG9HyjAuZuIaf-bVDbrAPnQ2FA9a-hjw0qao74YHtp5ic_45GgL77WYwOkDMAmsjzVeuyHL3tXVVI1o3kh2KlvVotVEdltACDQOW9Rt9kU8Emb-eRvuPKi6JJ4xrods0rezPm6YSCIuzSNkd1_umdBdiuUibTm0A'},
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ 
                "codigoServico": $('#input_codigoServico').val(),
                "referencia": $('#input_referencia').val(),
                "competencia": $('#input_competencia').val(),
                "vencimento": $('#input_vencimento').val(),
                "cnpjCpf": $('#input_cnpjCpf').val(),
                "nomeContribuinte": $('#input_nomeContribuinte').val(),
                "valorPrincipal": $('#input_valorPrincipal').val(),
                "valorDescontos": $('#input_valorDescontos').val(),
                "valorOutrasDeducoes": $('#input_valorOutrasDeducoes').val(),
                "valorMulta": $('#input_valorMulta').val(),
                "valorJuros": $('#input_valorJuros').val(),
                "valorOutrosAcrescimos": $('#input_valorOutrosAcrescimos').val(),
                "modoNavegacao": $('#input_modoNavegacao').val(),
                "urlNotificacao": $('#input_urlNotificacao').val()
            }),            
            success: function(_resposta){
                console.log(_resposta);
                //var json = JSON.parse(_resposta);
                //alert(_resposta.length); 
                $( "#dialog" ).dialog({width: 800,height: 800});
                $( ".iframe-epag" ).attr('src',_resposta.proximaUrl);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status = 400){
                    resposta = jQuery.parseJSON(jqXHR.responseText);
                    var toastHTML = '<span><br><h7>ERROR: ' + resposta[0].codigo + '</h7><hr>' + resposta[0].descricao + '</span>';
                    M.toast({html: toastHTML});  
                                      
                }
            }     
        });
    });
    iFrameResize({ heightCalculationMethod: "documentElementOffset" }, ".iframe-epag");    
});