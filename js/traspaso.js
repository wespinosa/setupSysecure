function aplicarTraspaso(cod, ppl) {
    var url = './includes/traspaso/traspaso_model.php?opcion=enviarDatosPabellon';
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {codigo: cod,ppl:ppl},
        success: function(res) {
            var json_obj = $.parseJSON(res);
            var valorFinal;
            $('#pabellonActual').html('<strong>Pabellon actual:</strong> Pabellon ' + json_obj.datosPabellon.PAB_DESCRIPCION);
            $('#IDpabellon').val(json_obj.datosPabellon.PAB_COD);
            $('#fechaUltimoTras').html(json_obj.datosAntiguoPabellon.HIS_FECHA);
            $('#pabellonUltimoTras').html(json_obj.datosAntiguoPabellon.PAB_DESCRIPCION);
            listarPabellones(cod);
            $('#IDppl').val(ppl);
            $('#frmAplicarTraspaso').modal('show');
            $('#smart-form-register >header').text('Traspaso realizado con exito');
            $.each(json_obj.datosHistoriaPpl,function(index, value){
                                        valorFinal +='<tr>'+
                                                        '<td>'+value.USU_USUARIO+'</td>'+
                                                        '<td>'+value.PAB_DESCRIPCION+'</td>'+
                                                        '<td>'+value.HIS_FECHA+'</td>'+
                                                        '<td>'+value.HIS_MOTIVO+'</td>'+
                                                    '</tr>';
            });
            $('#datosHistoriaPpl >tbody').html(valorFinal);
        }
    });
 


}

function listarPabellones(cod) {
    var url = './includes/traspaso/traspaso_model.php?opcion=enviarDatosPabellones';
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {codigo: cod},
        success: function(res) {
            $("#nuevoPabellon").html(res);
        }
    });
}


function guardarTraspaso() {
    var url = './includes/traspaso/traspaso_model.php?opcion=guardarTraspaso';
    var ppl = $('#IDppl').val();
    var pabellon = $('#nuevoPabellon').val();
    var motivo = $('#motivo').val();
    var anterior = $('#IDpabellon').val();
    
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {codigo: ppl, codigoPabellon: pabellon, motivo: motivo,anterior:anterior},
        success: function(res) {

            if (res === '1') {

                $.smallBox({
                    title: "Traspaso realizado",
                    content: "<i class='fa fa-clock-o'></i> <i>Traspaso realizado correctamente...</i>",
                    color: "#659265",
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000

                });


                location.reload();

            }

        }

    });


}