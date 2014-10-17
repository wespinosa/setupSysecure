$(document).ready(function() {
    $('#vistaparametros').dataTable();

});

function editarParametro(cod) {
    $('#vis' + cod).children('td').children('.txtVisDatos').hide();
    $('#vis' + cod).children('td').children('.visDatosGeneral').show();
    $('#vis' + cod).children('td').children('.visBtnGuardar').show();
    $('#vis' + cod).children('td').children('.visBtnDatos').hide();
}
function GuardarCambioParametro(cod) {
        var url = './includes/parametros/parametros_model.php?opcion=actualizaValorParametro';
        var codigo = cod;
        var valor = $('#vis' + cod).children('td').children('#VisValor').val();
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {parCod: codigo, valor: valor},
        success: function(res) {
            if(res==='1'){
                var json_obj = $.parseJSON(res);
                $('#vis' + cod).children('td').children('#VisValor').text(valor);
                $('#vis' + cod).children('td').children('.txtVisDatos').show();
                $('#vis' + cod).children('td').children('.visDatosGeneral').hide();
                $('#vis' + cod).children('td').children('.visBtnGuardar').hide();
                $('#vis' + cod).children('td').children('.visBtnDatos').show();
                $('#vis' + cod).addClass('success');
                
                $.smallBox({
                    title: "Actualización",
                    content: "<i class='fa fa-clock-o'></i> <i>Visitante Actualizado correctamente...</i>",
                    color: "#659265",
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            }else{
                $.smallBox({
                    title: "Error Servidor",
                    content: "<i class='fa fa-clock-o'></i> <i>Existe algun error al Actualizar el Registro Contacte con Sistemas</i>",
                    color: "#C46A69",
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            }
            }
            
            
        });
}