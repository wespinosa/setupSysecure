$(document).ready(function() {
    var myTable = $('#listaAcceso4').dataTable({
        "bServerSide": true,
        "sAjaxSource": "includes/controles/acceso4/acceso4_dataTable.php",
        "oLanguage": {
            "sEmptyTable": "No hay datos disponibles en la tabla",
            "sInfo": "Existen _TOTAL_ registros en total, mostrando (_START_ a _END_)",
            "sInfoEmpty": "No hay entradas para mostrar",
            "sInfoFiltered": " - Filtrado de registros _MAX_",
            "sZeroRecords": "No hay registros que mostrar"
        }
    });
    $('#listaAcceso4').on('click', 'tr', function(event) {
        var cod = $(this).find("td").eq(0).children('input').val();
        colocarDatosFinalizar(cod);
    });

//    $('#listaAcceso4').children('tbody').children('tr').addClass('terminarVisita');

    var interval = setInterval(function() {
        intervaloTranscurrido();
    }, 1000);
});

function intervaloTranscurrido(interval) {
    $('#listaAcceso4 >tbody >tr').each(function() {
        var cod = $(this).find("td").eq(0).children('input').val();
        $.ajax({
            url: "./includes/controles/acceso4/acceso4_model.php?opcion=intervalo",
            type: 'post',
            data: {codigo: cod},
            success: function(numero) {
                var valor = Math.round(numero);
                if (valor === 100) {
                    $("#progresoTiempo" + cod).html('100 %');
                    $("#progresoTiempo" + cod).removeClass('bg-color-yellow');
                    $("#progresoTiempo" + cod).addClass('bg-color-redLight');
                    $("#progresoTiempo" + cod).css({"width": ("100%")});
                } else {
                    if (valor <= 0) {
                        $("#progresoTiempo" + cod).html('0 %');
                        $("#progresoTiempo" + cod).removeClass('bg-color-redLight');
                        $("#progresoTiempo" + cod).addClass('progress-bar-success');
                        $("#progresoTiempo" + cod).css({"width": ("0 %")});
                    } else {
                        if (valor >= 90) {
                            $("#progresoTiempo" + cod).html(valor + ' %');
                            $("#progresoTiempo" + cod).removeClass('progress-bar-success');
                            $("#progresoTiempo" + cod).addClass('bg-color-yellow');
                            $("#progresoTiempo" + cod).css({"width": (valor + "%")});
                        } else {
                            $("#progresoTiempo" + cod).html(valor + ' %');
                            $("#progresoTiempo" + cod).css({"width": (valor + "%")});
                        }
                    }
                }
            }
        });

    });

}

function colocarDatosFinalizar(cod) {
    
    $.ajax({
        url: "./includes/controles/acceso4/acceso4_model.php?opcion=traerdatosFin",
        type: 'post',
        data: {visCod: cod},
        success: function(respuesta) {
            var json_obj = $.parseJSON(respuesta);
            colocarInformacionVisita(json_obj);
            $('#frmTerminarModal').modal('show');
        }
    });
}

function colocarInformacionVisita(edt) {
    
    $("#valCodVisita").val(edt.datosVisita.VISG_COD);  /*Nombre*/
    $("#valCodVisitante").val(edt.datosVisita.VIS_COD);  /*Nombre*/
    $("#txtSancion").html(edt.datosVisita.VISG_MENSAJE);  /*Nombre*/
    $("#valSancion").val(edt.datosVisita.VISG_SANCION);  /*Nombre*/
    $("#txtNombre").text(edt.datosVisita.VIS_NOMBRE);  /*Nombre*/
    $("#valNombre").val(edt.datosVisita.VIS_NOMBRE);  /*Nombre*/
    $("#txtApellido").text(edt.datosVisita.VIS_APELLIDO);  /*Apellido*/
    $("#valApellido").val(edt.datosVisita.VIS_APELLIDO);  /*Nombre*/
    $("#txtCedula").text(edt.datosVisita.VIS_CEDULA);  /*Usuario*/
    $("#valcedula").val(edt.datosVisita.VIS_CEDULA);  /*Nombre*/
    $("#txtHoraIng").text(edt.datosVisita.VISG_HORA_INGRESO);  /*E-Mail*/
    $("#valhoraIng").val(edt.datosVisita.VISG_HORA_INGRESO);  /*Nombre*/
    $("#txtHoraSal").text(edt.datosVisita.VISG_HORA_SALIDA);  /*Nombre*/
    $("#valhoraSal").val(edt.datosVisita.VISG_HORA_SALIDA);  /*Nombre*/
    $("#txtHoraTrans").text(edt.datosVisita.VISG_TRANSCURRIDO);  /*E-Mail*/
    $("#valtranscurrido").val(edt.datosVisita.VISG_TRANSCURRIDO);  /*Nombre*/
    $("#valexceso").val(edt.datosVisita.VISG_EXCESO);  /*Nombre*/
    $("#txtLugarCedula").text(edt.datosVisita.VISG_POSCHAR + edt.datosVisita.VISG_POSNUM);  /*E-Mail*/
    $("#txtPPLNombre").text(edt.datosVisita.PPL_NOMBRE + ' ' + edt.datosVisita.PPL_APELLIDO);  /*E-Mail*/
    
    
    
}

function guardarFinVisita() {
    var codVisita=$("#valCodVisita").val();
    var sancion=$("#valSancion").val();
    var transcurrido=$("#valtranscurrido").val();
    var codVisitante=$("#valCodVisitante").val();
    var exceso=$("#valexceso").val();
    $.ajax({
        url: "./includes/controles/acceso4/acceso4_model.php?opcion=finVisita",
        type: 'post',
        data: {codVisita: codVisita,sancion:sancion,transcurrido:transcurrido,codVisitante:codVisitante,exceso:exceso},
        success: function(respuesta) {
            if(respuesta==='1'){
                $.smallBox({
                    title : "Visita Finalizada",
                    content : "<i class='fa fa-clock-o'></i> <i>transacción Exitosa ...</i>",
                    color : "#296191",
                    iconSmall : "fa fa-thumbs-up bounce animated",
                    timeout : 4000
                });
                $('#frmTerminarModal').modal('hide');
                $('#cod_'+codVisita).parent('td').parent('tr').remove();
            }
        }
    });
}
