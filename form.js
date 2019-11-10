var dadosValidados=[];

function habilitaRedeSocial(){
    if(document.getElementById('sim').checked == true){
      document.getElementById('facebook').disabled = false;
      document.getElementById('linkedin').disabled = false;
      document.getElementById('instagram').disabled = false;
    }
    if(document.getElementById('nao').checked == true){
        //limpa o que tiver sido marcado
        document.getElementById('facebook').checked = false;
        document.getElementById('linkedin').checked = false;
        document.getElementById('instagram').checked = false;
        //desabilita marcações
        document.getElementById('facebook').disabled = true;
        document.getElementById('linkedin').disabled = true;
        document.getElementById('instagram').disabled = true;
    }
}

function validaDados(){
    var dadosValidados = {};

    //validando o nome e sobrenome
    var padraoNome = /[A-Za-z].* [A-Za-z].*/;
    var nome = document.getElementById('nome').value;
    if(!padraoNome.test(nome) || nome.lenght==0){
        alert('Digite o nome e sobrenome.');
        document.getElementById('nome').focus();
        return false;
    }else{
        dadosValidados.nome = nome;
    }

    //validando o telefone
    var padraoTelefone = /^\d{2}-\d{8}$/;
    var telefone = document.getElementById('telefone').value;
    if(!padraoTelefone.test(telefone) || telefone.lenght==0){
        alert('Digite o telefone no padrão xx-xxxxxxxx.');
        document.getElementById('telefone').focus();
        return false;
    }else{
        dadosValidados.telefone = telefone;
     }

    //validando como nos conheceu
    var comoConheceu = document.getElementById('comoConheceu').value;
    if(comoConheceu == "selecione"){
        alert('Marque como nos conheceu.');
        dados.comoConheceu.focus();
        return false;
    }else{
        dadosValidados.comoConheceu = comoConheceu;
    }

    //validando redes sociais
    if (document.dados.opcao[0].checked == false && document.dados.opcao[1].checked == false){
        alert('Marque sim ou não.');
        return false;
    }else{
        if (document.dados.opcao[0].checked == true){
            dadosValidados.possuiRedeSocial = 'sim';
        }else{
            dadosValidados.possuiRedeSocial = 'nao';
        }
    }

    //redes sociais selecionadas
    var redesSociais = [];
    if(document.dados.opcao[0].checked == true){
        if(document.getElementById('facebook').checked == true){
            redesSociais.push("Facebook");
        }
        if(document.getElementById('linkedin').checked == true){
            redesSociais.push("LinkedIn"); 
        }
        if(document.getElementById('instagram').checked == true){
            redesSociais.push("Instagram");
        }
        if(redesSociais.length==0){
            alert('Selecione suas redes sociais.');
            return false
        }
        dadosValidados.redesSociais = redesSociais;
    }
    mandaDados(dadosValidados);
}

function mandaDados(dadosForm){
         document.getElementById('botao-enviar').disabled = true;
        $.ajax({
        method: 'POST',
        url: 'http://localhost:8080',
        data: JSON.stringify(dadosForm),
        dataType: 'json',
        success: function() {            
            alert('Sucesso');            
        },
        error: function() {
            alert('Erro ao enviar dados');
        },
    });
}