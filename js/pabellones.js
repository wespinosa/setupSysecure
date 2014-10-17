$(document).ready(function() {
    var $registerForm = $("#smart-form-pabellon").validate({
        rules: {
            nivel: {required: true},
            ala: {required: true},
            descripcion: {required: true}
        },messages: {
            nivel: {required: 'Seleecione el Nivel del Pabellon'},
            ala: {required: 'Indique el Ala en el que se encuentra'},
            descripcion: {required: 'Coloque una descripción Valida'}
        },errorPlacement: function(error, element) {
            error.insertAfter(element.parent());
        }
    });
});
function nuevoPabellon() {
    $('#frmPabellonModal').modal('show');
    limpiarFormularioPabellon();
    $('#smart-form-pabellon >header').text('Registro Nuevo Pabellon')
    $('#IDpabellon').val('');
}
function limpiarFormularioPabellon() {
    $("#ala").val('');  /*Ala*/
    $("#descripcion").val('');  /*Descripcion*/
    $("#capacidad").val('');  /*Capacidad*/
    $("#detalles").val('');  /*Detalles*/
    $('#nivel').prop('selectedIndex', 0);/*Nivel*/
}
function guardarPabellon() {
    var pabellon = $('#IDpabellon').val();
    if (pabellon === '') {
        $.ajax({
            url: './includes/pabellones/pabellon_model.php?opcion=guardaDatosPabellon',
            datetype: "json",
            type: 'POST',
            data: $("#smart-form-pabellon").serialize(),
            success: function(res) {
                if (res === '1') {
                    $.smallBox({
                        title: "Pabellon Almacenado",
                        content: "<i class='fa fa-clock-o'></i> <i>Pabellon Agregado correctamente...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                    limpiarFormularioPabellon();
                    location.reload();
                }
            }
        });
    } else {
        $.ajax({
            url: './includes/pabellones/pabellon_model.php?opcion=actualizarDatosPabellon',
            datetype: "json",
            type: 'POST',
            data: $("#smart-form-pabellon").serialize(),
            success: function(res) {
                if (res === '1') {
                    $.smallBox({
                        title: "Actualización",
                        content: "<i class='fa fa-clock-o'></i> <i>Pabellon Actualizado correctamente...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                    limpiarFormularioPabellon();
                    location.reload();
                }
            }
        });
    }
    $('#frmPabellonModal').modal('hide');
}
function editarPabellon(pabellon) {
    var url = './includes/pabellones/pabellon_model.php?opcion=enviarDatosPabellon';
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {pabellon: pabellon},
        success: function(res) {
            var json_obj = $.parseJSON(res);
            limpiarFormularioPabellon();
            carga_DatosIncialesPabellon(json_obj);
            $('#frmPabellonModal').modal('show');
            $('#smart-form-pabellon >header').text('Actualización de Datos Pabellon')
            $('#IDpabellon').val(pabellon);

        }
    });

}
function carga_DatosIncialesPabellon(edt) {
    $("#ala").val(edt.datosPabellon.PAB_ALA);  /*Nombre*/
    $("#descripcion").val(edt.datosPabellon.PAB_DESCRIPCION);  /*Apellido*/
    $("#capacidad").val(edt.datosPabellon.PAB_CAPACIDAD);  /*Usuario*/
    $("#detalles").val(edt.datosPabellon.PAB_DETALLES);  /*E-Mail*/
    $('#nivel').prop('selectedIndex', edt.datosPabellon.NVL_COD);
}
function eliminarPabellon(codPab, nomPab) {

    $.SmartMessageBox({
        title: "Confirmación!",
        content: "Esta seguro de eliminar el Pabellon <span class='txt-color-orangeDark'><strong>" + nomPab + " </strong></span>?",
        buttons: '[No][Si]'
    }, function(ButtonPressed) {
        if (ButtonPressed === "Si") {
            $.ajax({
                url: "./includes/pabellones/pabellon_model.php?opcion=eliminarPabellon",
                type: 'post',
                data: {codigo: codPab},
                success: function(respuesta) {
                    if (respuesta === '1') {
                        $('.' + codPab).parent('td').parent('tr').addClass('paraEliminarUsuario');
                        $('.paraEliminarUsuario').fadeOut('tr');
                        $.smallBox({
                            title: 'Pabellon: '+nomPab,
                            content: "<i class='fa fa-clock-o'></i> <i>Pabellon Eliminado...</i>",
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 4000
                        });
                    }
                }
            });

        }
        if (ButtonPressed === "No") {
        }
    });
}