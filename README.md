===> gerenciador de documentos 

    [] criar registro do documento ( nome, descrição, data de vencimento, responsavel, )
    [] agendar vencimento de contrato com ( cron ) exibir e messagens no sistema e enviar messagen de alerta via whats ou email.
    [] criar status do documeto ( ativo, pendente )
    [] criar perfil de fiscal de contrato
    [] criar perfil de visualizador 
    
    [] home ===> Criar registro do documento ( nome, descricao, data vencimento, responsavel, documentos anexados, status  ), Visualizar documentos de acordo com perfil do usuario e ver status do documento.
    [] fiscal de contrato ===> criar contrato, deletar, editar, atualizar status.


===> FAQ 

    [ok] criar artigo.
    [ok] visualizar artigo.
    [ok] deletar artigos e categorias
    [ok] upload de icones.
    [ok] definir permissoes de acesso.
    [ok] resolver bug au deletar categoria.

===> Criar controle de material para sti

--> Home
    [] listar materiais 
    [] exibir graficos 
    [] formlulario especifico para cada item


===> MONITORAR IP E ENVIAR RESPOSTA VIA WHATSAPP 

    [] Criar menu no whatsapp com opção de (monitorar ip).
    [] perguntar qual ip deseja monitorar.  
    [] Monitorar IP selecionado.
    [] opção informar se cair ou informar se subir. 


===> AGENDA DE CONTATOS
    
    [X] home ===> visualizar contato de todos os militares cadastrados (nome , email, whatsap, tel)
    criar modal.


====> CONTRATOS  

    [] aviso 90 dias antes de vencer contrato, dar opcao de encerrar contrato ou adicionar novo aditivo.

    [OK] Avisar que fatura esta venciada ate cadastrar numero da Ob.

    [OK] Avisa 15 dias antes.

    [] tipo de contrato ( contrato por entrega ou prestacao de servico ) = se mensal apos data de entrada na tesouraria avisar proxima  (nao foi dada entrada na fatura do proximo mes)

    [] enviar Email, e alerta no sistema.

    [] definir permissoes  {
        GERENTE DE CONTRATOS = DEFINIR RESPONSAVEL POR CONTRATO .
        fiscal de contrato = criar contrato, ver seus contratos, definir data de vencimento.
        CMT = visualizar todos os contrados e verificar status.
    }

    [] verificar status do documneto PAGO, A VENCER, VENCIDO. 

    [] RECEBER NOTIFICAÇãO DO STATUS VIA WHATSAPP E EMAIL. 

    [] ANEXAR DOCUMENTOS = CONFIRMACAO DE PAGAMETO, DOCUMENTO EM PDF, OBS DO RESPONSAVEL .

    [OK] QUALQUER ALTERAÇAO DEVE SER ALTENTICADA.

    [] 

    ////

====> ATUALIZACAO CONTRATOS

[] 90 DIAS ANTES DE VENCER CONTRATO - MUDAR COR APOS ISSO

    PARA CONTRATOS MESAIS 
[] APOS insercao da 1 fatura 
    * [ok] alerta "falta entregar fatura xx na resouraria" - se nao preencher data entrega tesouraria
    * [ok] alerta "fatura xx vencida" apos data vencimeto
    * [ok] dois alertas acima so encerram apos preencher "NR OB"
    * [] alerta "falta fatura do proximo mes" todo dia 2 do mes ou apos 30 dias do vencimento da fatura anterior