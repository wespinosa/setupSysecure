$(document).ready(function() {
$('#listaTipoSanciones').dataTable({
        "bServerSide": true,
        "sAjaxSource": "includes/sanciones/mantenimiento/sancion_dataTable.php",
        "oLanguage": {
            "sEmptyTable": "No hay datos disponibles en la tabla",
            "sInfo": "Existen _TOTAL_ registros en total, mostrando (_START_ a _END_)",
            "sInfoEmpty": "No hay entradas para mostrar",
            "sInfoFiltered": " - Filtrado de registros _MAX_",
//            "sSearch": "Buscar: ",
            "sZeroRecords": "No hay registros que mostrar"
        }
    });    
});


function editarTipoSancion(codigoTipoSancion){
    var url = './includes/sanciones/mantenimiento/sancion_model.php?opcion=enviarDatosTipoSanciones';
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {codigoTipoSancion: codigoTipoSancion},
        success: function(res) {
            var json_obj = $.parseJSON(res);
            limpiarFormularioPpl();
            cargaDatosIncialesTipoSancion(json_obj);
            $('#IDtipoSancion').val(codigoTipoSancion);
            $('#frmTipoSancion').modal('show');
            $('#smart-form-ppl >header').text('Actualización de tipo de sancion');
            
        }
    });

}

function limpiarFormulario() {
    $("#IDtipoSancion").val('');  /*Nombre*/
    $("#tipoSancion").val('');  /*Apellido*/
 
}


function cargaDatosIncialesTipoSancion(edt) {
   
    $("#tipoSancion").val(edt.datosTipoSancion.TPS_DESCRIPCION);  

}


function guardarTipoSancion() {
    var tipoSancion = $('#IDtipoSancion').val();
    if (tipoSancion != '') {
        $.ajax({
            url: './includes/sanciones/mantenimiento/sancion_model.php?opcion=editaDatosTipoSancion',
            datetype: "json",
            type: 'POST', 
            data: $("#smart-form-register").serialize(),  
            success: function(res) { 
                if (res === '1') {
                    $.smallBox({
                        title: "Tipo de sancion actualizada",
                        content: "<i class='fa fa-clock-o'></i> <i>Tipo de sancion actualizada correctamente...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                    limpiarFormulario();
                    location.reload();
                }
            },
            error: function (res)
            {
                alert("error al guardar la informacion en la base de datos.")
            }
        });
    } else {
        $.ajax({
            url: './includes/sanciones/mantenimiento/sancion_model.php?opcion=guardaDatosTipoSancion',
            datetype: "json",
            type: 'POST',
            data: $("#smart-form-register").serialize(),
            success: function(res) {
                if (res === '1') {
                    $.smallBox({
                        title: "Creacion",
                        content: "<i class='fa fa-clock-o'></i> <i>Tipo de sancion Creado correctamente...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                    limpiarFormulario();
                    location.reload();
                }
            }
        });
    }
    $('#frmTipoSancion').modal('hide');
}

function nuevoTipoSancion(){
    limpiarFormulario();
    $('#frmTipoSancion').modal('show');
}

function gestionarSancion(codigoTipoSancion)
{
        $('#IDtipoSancion1').val(codigoTipoSancion);
        $.ajax({
        url: './includes/sanciones/mantenimiento/sancion_model.php?opcion=mostrarSanciones',
        datetype: "json",
        type: 'POST',
        data: {codigoTipoSancion: codigoTipoSancion},
        success: function(res) {
            $('#listaSancionesxTipo >tbody').html(res);
            $('#frmSancionesModal').modal('show');
        }
    });
    
}


function GuardarCambioSancion(codigoSancion, tipo) {
    var codigoTipoSancion =  $('#IDtipoSancion1').val();

    if (tipo === 'N') {
        var url = './includes/sanciones/mantenimiento/sancion_model.php?opcion=guardarNuevaSanciones';
        var codigo = $('#IDpplNew').val();
        var sancion = $('#new').children('td').children('#DescripcionSancion').val();
        var tiempo = $('#new').children('td').children('#TiempoSancion').val();

    } else {
        var url = './includes/sanciones/mantenimiento/sancion_model.php?opcion=guardarEdicionSancion';
        var codigoSancion = codigoSancion;
        var sancion = $('#sancion' + codigoSancion).children('td').children('#DescripcionSancion').val();
        var tiempo = $('#sancion' + codigoSancion).children('td').children('#TiempoSancion').val();
    }
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {codigoSancion: codigoSancion, sancion: sancion, tiempo: tiempo, codigoTipoSancion:codigoTipoSancion},
        success: function(res) {
            if(res!=='2'){
                if (res !== '0') {
                    var json_obj = $.parseJSON(res);
                    if (tipo === 'N') {
                        $('#new').children('td').children('#txtDescripcionSancion').text(json_obj.datosActualizados.nombre);
                        $('#new').children('td').children('#txtTiempoSancion').text(json_obj.datosActualizados.apellido);
                    } else {
                        $('#sancion' + codigoSancion).children('td').children('#txtDescripcionSancion').text(json_obj.datosActualizados.sancion);
                        $('#sancion' + codigoSancion).children('td').children('#txtTiempoSancion').text(json_obj.datosActualizados.tiempo);
                    }
                }
                if (tipo === 'N') {
                    gestionarSancion(json_obj.datosActualizados.codigoTipoSancion);
                } else {
                    $('#sancion' + codigoSancion).children('td').children('#DescripcionSancion').val(json_obj.datosActualizados.sancion);
                    $('#sancion' + codigoSancion).children('td').children('#TiempoSancion').val(json_obj.datosActualizados.tiempo);
                    $('#sancion' + codigoSancion).children('td').children('.txtVisDatos').show();
                    $('#sancion' + codigoSancion).children('td').children('.visDatos').hide();
                    $('#sancion' + codigoSancion).children('td').children('.visBtnGuardar').hide();
                    $('#sancion' + codigoSancion).children('td').children('.visBtnDatos').show();
                }
                $.smallBox({
                    title: "Actualización",
                    content: "<i class='fa fa-clock-o'></i> <i>Sancion Actualizada correctamente...</i>",
                    color: "#659265",
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            }else{
                 $.smallBox({
                        title: "Error..!!",
                        content: "<i class='fa fa-clock-o'></i> <i>Debe Ingresar Todos los Campos..!</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 6000
                    });
            }
        }
    });
}

function nuevaSancion()
{

                var tds = $("#listaSancionesxTipo tr:first td").length; // Obtenemos el total de columnas (tr) del id "tabla" 
                var trs = $("#listaSancionesxTipo tr").length;
                var alerta = 1;
                var tr = $("tr#new").attr("id");
                if (tr === undefined) {
                    var nuevaFila = '<tr id="new">';
                    nuevaFila += "<td>" + (trs);
                    nuevaFila += '<td><div class="txtVisDatos" id="txtDescripcionSancion"></div><input type="text" id="DescripcionSancion" name="DescripcionSancion" style="width: 180px;" class="visDatos">';
                    nuevaFila += '<td><div class="txtVisDatos" id="txtTiempoSancion"></div><input type="text" id="TiempoSancion" name="TiempoSancion" class="visDatos">';

                    var valida = 'N', nada = '';
                    nuevaFila += '<td><a class="btn btn-primary btn-xs visBtnGuardar" title="Guardar Cambio" href="javascript:GuardarCambioSancion(\'' + nada + '\',\'' + valida + '\')"><i class="fa fa-save"></i></a>';
                    nuevaFila += "</tr>";
                    $("#listaSancionesxTipo").append(nuevaFila);
                    $('#new').children('td').children('.visDatos').show();
                    $('#new').children('td').children('.visBtnGuardar').show();
                }
         
}

function editarSancionMantenimiento(cod) {
    $('#sancion' + cod).children('td').children('.txtVisDatos').hide();
    $('#sancion' + cod).children('td').children('.visDatos').show();
    $('#sancion' + cod).children('td').children('.visBtnGuardar').show();
    $('#sancion' + cod).children('td').children('.visBtnDatos').hide();
}

