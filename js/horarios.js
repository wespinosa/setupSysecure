$(document).ready(function() {
//    $('#horaIngreso').timepicker({ timeFormat: 'HH:mm' });
    $('#horaIngreso').clockpicker({placement: 'top',donetext: 'Cancelar'});
    $('#horaSalida').clockpicker({placement: 'top',donetext: 'Cancelar'});
    var $cambioClaveForm = $("#smart-form-horarios").validate({
        rules: {
            dias: {required: true},
            descripcion: {required: true},
            horaIngreso: {required: true},
            horaSalida: {required: true},
            tipoVisitas: {required: true}
        },
        messages: {
            dias: {required: 'Por favor seleccione el Día de Visita'},
            descripcion: {required: 'Por favor, introduzca el nombre del Horario'},
            horaIngreso: {required: 'Por favor, Indique desde que hora la Visita'},
            horaSalida: {required: 'Por favor, Indique hasta que hora la Visita'},
            tipoVisitas: {required: 'Por favor, Indique que Tipos de Visita pueden Acceder en ese Horario'}
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent());
        }
    });
});
function mostrarHoraiosPabellon(pabellon) {
    $('#IDpabellon').val(pabellon);
    $('#IDpabellonFrm').val(pabellon);
    $('#listaPabellones').children('tbody').children('tr').each(function() {
        $(this).removeClass('info');
    });
    $('#' + pabellon).addClass('info');
    $.ajax({
        url: "./includes/horarios/horarios_model.php?opcion=buscarHorariosPabellon",
        type: 'post',
        data: {pabellon: pabellon},
        success: function(resultado) {
            $('#tbPabellonesHorarios >tbody').html(resultado);
        }
    });
}
function nuevoHorario() {
    var codPabellon = $('#IDpabellon').val();
    $('.checkbox').hide();
    if (codPabellon !== '') {
        
        $('#frmHorariosModal').modal('show');
        limpiarFormularioHorario();
        $('#smart-form-horarios >header').text('Registro Nuevo Horario')
        $('#IDhorario').val('');
        
    } else {
        $.smallBox({
            title: "Error..!!",
            content: "<i class='fa fa-clock-o'></i> <i>Seleccione un Pabellon</i>",
            color: "#C46A69",
            iconSmall: "fa fa-times fa-2x fadeInRight animated",
            timeout: 4000
        });
    }
}
function guardarHorario() {
    var horario = $('#IDhorario').val();
    var pabellon = $('#IDpabellon').val();
    if (horario === '') {
        $.ajax({
            url: './includes/horarios/horarios_model.php?opcion=guardaDatosHorario',
            datetype: "json",
            type: 'POST',
            data: $("#smart-form-horarios").serialize(),
            success: function(res) {
                if (res === '1') {
                    $.smallBox({
                        title: "Usuario Almacenado",
                        content: "<i class='fa fa-clock-o'></i> <i>Usuario Agregado correctamente...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                    limpiarFormularioHorario();
                    $('#frmHorariosModal').modal('hide');
                    $.ajax({
                        url: "./includes/horarios/horarios_model.php?opcion=buscarHorariosPabellon",
                        type: 'post',
                        data: {pabellon: pabellon},
                        success: function(resultado) {
                            $('#tbPabellonesHorarios >tbody').html(resultado);
                        }
                    });
                }
            }
        });
    } else {
        $.ajax({
            url: './includes/horarios/horarios_model.php?opcion=actualizarDatosHorario',
            datetype: "json",
            type: 'POST',
            data: $("#smart-form-horarios").serialize(),
            success: function(res) {
                if (res === '1') {
                    $.smallBox({
                        title: "Actualización",
                        content: "<i class='fa fa-clock-o'></i> <i>Usuario Actualizado correctamente...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                    limpiarFormularioHorario();
                    $('#frmHorariosModal').modal('hide');
                    $.ajax({
                        url: "./includes/horarios/horarios_model.php?opcion=buscarHorariosPabellon",
                        type: 'post',
                        data: {pabellon: pabellon},
                        success: function(resultado) {
                            $('#tbPabellonesHorarios >tbody').html(resultado);
                        }
                    });
                }
            }
        });
    }
    $('#frmUsuarioModal').modal('hide');
}
function editarHorario(horario) {
    var url = './includes/horarios/horarios_model.php?opcion=enviarDatosHorario';
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {horario: horario},
        success: function(res) {
            var json_obj = $.parseJSON(res);
            limpiarFormularioHorario();
            carga_DatosIncialesHorario(json_obj);
            $('#frmHorariosModal').modal('show');
            $(".checkbox").show();
            $('#smart-form-horarios >header').text('Actualización de Datos Horario')
            $('#IDhorario').val(horario);

        }
    });

}
function eliminarHorario(codPar, nomCod, codPab) {

    $.SmartMessageBox({
        title: "Confirmación!",
        content: "Esta seguro de eliminar al Horario <span class='txt-color-orangeDark'><strong>" + nomCod + " </strong></span>?",
        buttons: '[No][Si]'
    }, function(ButtonPressed) {
        if (ButtonPressed === "Si") {
            $.ajax({
                url: "./includes/horarios/horarios_model.php?opcion=eliminarHorario",
                type: 'post',
                data: {codigo: codPar},
                success: function(respuesta) {
                    if (respuesta === '1') {
                        $.ajax({
                            url: "./includes/horarios/horarios_model.php?opcion=buscarHorariosPabellon",
                            type: 'post',
                            data: {pabellon: codPab},
                            success: function(resultado) {
                                $('#tbPabellonesHorarios >tbody').html(resultado);
                            }
                        });
                        $.smallBox({
                            title: nomCod,
                            content: "<i class='fa fa-clock-o'></i> <i>Horario Eliminado...</i>",
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
function carga_DatosIncialesHorario(edt) {
    $("#descripcion").val(edt.datosHorario.HOR_DESCRIPCION);  /*Descripcion*/
    $("#horaIngreso").val(edt.datosHorario.HOR_HORA_ING);  /*Hora de Ingreso*/
    $("#horaSalida").val(edt.datosHorario.HOR_HORA_SAL);  /*Hora de Salida*/
    $('#tipoVisitas').prop('selectedIndex', edt.datosHorario.TPV_COD);
    $('#dias option[value="' + edt.datosHorario.HOR_DIAS + '"]').attr("selected", true);/*Tipo de Usuario*/
    edt.datosHorario.HOR_ESTADO == 'A' ? $("#estado").prop("checked", true) : $("#estado").prop("checked", false);

}
function limpiarFormularioHorario() {
    $('#dias').prop('selectedIndex', 0);  /*Dias*/
    $("#descripcion").val('');  /*Descripcion*/
    $("#horaIngreso").val('');  /*Hora de Ingreso*/
    $("#horaSalida").val('');  /*Hora de Salida*/
}