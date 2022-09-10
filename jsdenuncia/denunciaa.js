html_tpl = "<b><font>ID da Denúncia:</font></b><br>$7 <br><br><b><font>Nick do Denunciante:</font></b><br>$1 <br><br><b><font>Nick do Acusado:</font></b><br>@$4 <br><br><b><font>Motivo da Denúncia:</font></b><br>$2<br><br><b><font>Organização do Acusado:</font></b><br>$6 <br><br><b><font>Provas da Acusação:</font></b><br>$3 <br><br><b><font>Tentou resolver in-game:</font></b><br>$9";
bbcode_tpl = "[b]ID da Denúncia:[/b]\n$7 \n\n[b]Nick do Denunciante:[/b]\n$1 \n\n[b]Nick do Acusado:[/b]\n@$4 \n\n[b]Motivo da Denúncia:[/b]\n$2 \n\n[b]Organização do Acusado:[/b]\n$6  \n\n[b]Provas da Acusação:[/b]\n$3 \n\n[b]Tentou resolver in-game:[/b]\n$9";
$(document).ready(function() {
    $('#bt-apagar').click(function() {
        $('#denunciante, #motivo, #comprovante, #endereco, #organizacao, #date, #valor, #contato, #ocorrido, #bt-selecciona-forum').val('');
        $('input[name="f"]').val($(this).val());
        Swal.fire({
            title: 'Limpando...',
            showConfirmButton: false,
            icon: 'info',
            allowOutsideClick: false,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
                },
            timer: 1500,
            color: '#22beed',
            timerProgressBar: true,
            backdrop: `rgba(24, 40, 70, 0.6)`
            });
    });
    $('#bt-selecciona-forum').change(function() {
        if ($(this).val() !== "") {
            $('input[name="f"]').val($(this).val());
        } else {
            $('input[name="f"]').val($(this).val());
        }
    });
    $('#bt-pr-questao').click(function() {
        tpl = html_tpl;
        tpl = tpl.replace("$1", $('#denunciante').val());
        tpl = tpl.replace("$2", $('#motivo').val());
        tpl = tpl.replace("$3", $('#comprovante').val());
        tpl = tpl.replace("$4", $('#endereco').val());
        tpl = tpl.replace("$5", $('#date').val());
        tpl = tpl.replace("$6", $('#organizacao').val());
        tpl = tpl.replace("$7", id);
        tpl = tpl.replace("$8", $('#valor').val());
      tpl = tpl.replace("$9", $('#contato').val());
        $('#html-questao').html(tpl);
    });

    /* Script do Formulário */
    // Obtém a data/hora atual
    var data = new Date();

    // Guarda cada pedaço em uma variável    	
    var dia = data.getDate(); // 1-31
    var dia_sem = data.getDay(); // 0-6 (zero=domingo)
    var mes = data.getMonth() + 1; // 0-11 (zero=janeiro)
    var ano2 = data.getYear(); // 2 dígitos
    var ano4 = data.getFullYear(); // 4 dígitos
    var hora = data.getHours(); // 0-23
    var min = data.getMinutes(); // 0-59
    var seg = data.getSeconds(); // 0-59
    var mseg = data.getMilliseconds(); // 0-999
    var tz = data.getTimezoneOffset(); // em minutos
  var id = (mseg * seg + hora) * min;

    $('#bt-enviar').click(function() {
        tpl = bbcode_tpl;
        if ($('#denunciante').val() !== '' && $('#motivo').val() !== '' && $('#endereco').val() !== '' && $('#organizacao').val() !== '' && $('#ocorrido').val() !== '' && $('#comprovante').val() !== '' && $('#contato').val() !== '' && $('#bt-selecciona-forum').val() !== '' && $('#flexSwitchCheckChecked').prop('checked') == true) {
            tpl = tpl.replace("$1", $('#denunciante').val());
            tpl = tpl.replace("$2", $('#motivo').val());
            tpl = tpl.replace("$3", $('#comprovante').val());
            tpl = tpl.replace("$4", $('#endereco').val());
            tpl = tpl.replace("$5", $('#date').val());
            tpl = tpl.replace("$6", $('#organizacao').val());
            tpl = tpl.replace("$7", id);
            tpl = tpl.replace("$8", $('#valor').val());
            tpl = tpl.replace("$9", $('#contato').val());
            $('input[name="message"]').val(tpl);
            $('input[name="subject"]').val('[' + dia + '/' + mes + '/' + ano4 + '] Denúncia: [' + $('#organizacao').val() + '] ' + $('#endereco').val() + ' - ' + $('#motivo').val() + ' #' + id);
            Swal.fire({
                title: 'Ei, você é um robô?',
                confirmButtonColor: '#eb2055',
                confirmButtonText: 'Prosseguir',
                backdrop: `rgba(24, 40, 70, 0.6)`,
                allowOutsideClick: false,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                html: '<div id="recaptcha"></div>',
                didOpen: () => {
                  grecaptcha.render('recaptcha', {
                    'sitekey': '6LfZ7eshAAAAANgu-PaGKn1ovSAjKg-hYGfAQAn1'
                  })
                },
                preConfirm: function () {
                  if (grecaptcha.getResponse().length === 0) {
                    Swal.showValidationMessage(`Por favor, nos confirme o reCaptcha`)
                  } else {
                    Swal.fire({
                        title: 'Denúncia Publicada',
                        showConfirmButton: false,
                        icon: 'success',
                        allowOutsideClick: false,
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                          },
                        timer: 3000,
                        timerProgressBar: true,
                        backdrop: `rgba(24, 40, 70, 0.6)`
                    });
                    setTimeout(function(){
                        $('#bt-enviar-e').click();
                    }, 3000);
                  }
                }
              })
        } else {
            Swal.fire({
                title: 'Ocorreu um erro',
                text: 'Você não preencheu todas as informações!',
                allowOutsideClick: false,
                showConfirmButton: false,
                icon: 'error',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                timer: 2000,
                timerProgressBar: true,
                backdrop: `rgba(24, 40, 70, 0.6)`,
                color: '#f27474'
            });
        }
    });
    $('#tema').click(function() {
        if ($('#tema').val() == 'Cole aqui o link ou código da imagem, do download.') {
            $('#tema').val('');
        }
    });
    $('#tema').blur(function() {
        if ($('#tema').val() == '') {
            $('#tema').val('Cole aqui o link ou código da imagem, do download.');
        }
    });
    $('#designer').click(function() {
        if ($('#designer').val() == 'Qualquer') {
            $('#designer').val('');
        }
    });

    $('#designer').blur(function() {
        if ($('#designer').val() == '') {
            $('#designer').val('Qualquer');
        }
    });
    $('#borda').click(function() {
        if ($('#borda').val() == 'R$ (in-game)') {
            $('#borda').val('');
        }
    });
    $('#borda').blur(function() {
        if ($('#borda').val() == '') {
            $('#borda').val('R$ (in-game)');
        }
    });
    $('#nicks').click(function() {
        if ($('#nicks').val() == 'Coloque todos os nicks que já usou.') {
            $('#nicks').val('');
        }
    });
    $('#nicks').blur(function() {
        if ($('#nicks').val() == '') {
            $('#nicks').val('Coloque todos os nicks que já usou.');
        }
    });
    $('#mais-infos').click(function() {
        if ($('#mais-infos').val() == 'Alguma outra informação sobre o seu conteúdo') {
            $('#mais-infos').val('');
        }
    });
    $('#mais-infos').blur(function() {
        if ($('#mais-infos').val() == '') {
            $('#mais-infos').val('Alguma outra informação sobre o seu conteúdo');
        }
    });
    if (VarGET('f') !== '') {
        $('input[name="f"]').val(VarGET('f'));
        $('#bt-selecciona-forum').val(VarGET('f'));
    }
});