$(document).ready(function() {
    $('#vistaCentros').dataTable();
    var $registerForm = $("#smart-form-centro").validate({
        rules: {
            ciudad: {required: true},
            descripcion: {required: true},
            tipo: {required: true}
        }, errorPlacement: function(error, element) {
            error.insertAfter(element.parent());
        }
    });
});
function nuevoCentro() {
    $('#frmCentrosModal').modal('show');
    limpiarFormularioCentro();
    $('#smart-form-pabellon >header').text('Registro Nuevo Centro')
    $('#IDcentro').val('');
}
function limpiarFormularioCentro() {
    $("#descripcion").val('');  /*Descripcion*/
    $("#telefono").val('');  /*Telefono*/
    $("#direccion").val('');  /*Direccion*/
    $('#ciudad').prop('selectedIndex', 0);/*Ciudad*/
    $('#tipo').prop('selectedIndex', 0);/*Ciudad*/
}
function guardarCentro() {
    var centro = $('#IDcentro').val();
    if (centro === '') {
        $.ajax({
            url: './includes/centros/centros_model.php?opcion=guardaDatosCentro',
            datetype: "json",
            type: 'POST',
            data: $("#smart-form-centro").serialize(),
            success: function(res) {
                if (res === '1') {
                    $.smallBox({
                        title: "Centro Almacenado",
                        content: "<i class='fa fa-clock-o'></i> <i>Pabellon Agregado correctamente...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                    limpiarFormularioCentro();
                    location.reload();
                }
            }
        });
    } else {
        $.ajax({
            url: './includes/centros/centros_model.php?opcion=actualizarDatosCentro',
            datetype: "json",
            type: 'POST',
            data: $("#smart-form-centro").serialize(),
            success: function(res) {
                if (res === '1') {
                    $.smallBox({
                        title: "Actualización",
                        content: "<i class='fa fa-clock-o'></i> <i>Centro Actualizado correctamente...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                    limpiarFormularioCentro();
                    location.reload();
                }
            }
        });
    }
    $('#frmCentrosModal').modal('hide');
}
function editarCentro(centro) {
    var url = './includes/centros/centros_model.php?opcion=enviarDatosCentro';
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {centro: centro},
        success: function(res) {
            var json_obj = $.parseJSON(res);
            limpiarFormularioPabellon();
            cargaDatosIncialesCentro(json_obj);
            $('#frmCentrosModal').modal('show');
            $('#smart-form-centro >header').text('Actualización de Datos del Centro')
            $('#IDcentro').val(centro);

        }
    });

}
function cargaDatosIncialesCentro(edt) {
    $("#descripcion").val(edt.datosCentro.CEN_DESCRIPCION);  /*Descripcion*/
    $("#telefono").val(edt.datosCentro.CEN_TELEFONO);  /*Telefono*/
    $("#direccion").val(edt.datosCentro.CEN_DIRECCION);  /*Direccion*/
    $('#ciudad').prop('selectedIndex', edt.datosCentro.CIU_COD);/*Ciudad*/
    $('#tipo').prop('selectedIndex', edt.datosCentro.CEN_TIPO);/*Tipo*/
}
function eliminarCentro(codPab, nomPab) {
    $.ajax({
        url: "./includes/centros/centros_model.php?opcion=consultaCentro",
        type: 'post',
        data: {codigo: codPab},
        success: function(respuesta) {
            if(respuesta!=='1'){
                $.SmartMessageBox({
                    title: "Confirmación!",
                    content: "Esta seguro de eliminar el Centro <span class='txt-color-orangeDark'><strong>" + nomPab + " </strong></span>?",
                    buttons: '[No][Si]'
                }, function(ButtonPressed) {
                    if (ButtonPressed === "Si") {
                        $.ajax({
                            url: "./includes/centros/centros_model.php?opcion=eliminarCentro",
                            type: 'post',
                            data: {codigo: codPab},
                            success: function(respuesta) {
                                if (respuesta === '1') {
                                    $('.' + codPab).parent('td').parent('tr').addClass('paraEliminarUsuario');
                                    $('.paraEliminarUsuario').fadeOut('tr');
                                    $.smallBox({
                                        title: 'Centro: '+nomPab,
                                        content: "<i class='fa fa-clock-o'></i> <i>Centro Eliminado...</i>",
                                        color: "#659265",
                                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                                        timeout: 4000
                                    });
                                }
                            }
                        });
                    }
                });
            }else{
                $.smallBox({
                    title: "Error..!!",
                    content: "<i class='fa fa-clock-o'></i> <i>El Centro "+nomPab+", contiene Pabellones, elimine sus dependencias antes de continuar </i>",
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 7000
                });
            }
        }
    });
}