$(document).ready(function() {
    $('#cedula').focusout(function(){
        var idVisitante=$('#IDvisitante').val();
        if(idVisitante===''){
            var tipo='C',ppl=0;
            var url = './includes/visitante/visitantes_model.php?opcion=enviarDatosVisitante';
            $.ajax({
                url: url,
                datetype: "json",
                type: 'POST',
                data: {cedula:$(this).val(),ppl:ppl,tipo:tipo},
                success: function(res) {
                    var json_obj = $.parseJSON(res);
                    $('#encuentraCedula').toggle();
                    $("#nombre").val(json_obj.datosVisitante.VIS_NOMBRE);  
                    $("#apellido").val(json_obj.datosVisitante.VIS_APELLIDO);  
                    $("#telefono").val(json_obj.datosVisitante.VIS_TELEFONO); 
                    $("#cedula").val(json_obj.datosVisitante.VIS_CEDULA);  
                    $("#huella").val(json_obj.datosVisitante.VIS_HUELLA);  
                    $("#direccion").val(json_obj.datosVisitante.VIS_DIRECCION); 
                    $("#correo").val(json_obj.datosVisitante.VIS_CORREO);  
                    cargarParentesco(json_obj.datosVisitante.VIS_COD,ppl);
                    cargarPpl(json_obj.datosVisitante.VIS_COD);
                    $('#IDvisitante').val(json_obj.datosVisitante.VIS_COD);
                    $("#my_result").html("<img src='uploads/imagenes/visitante/"+json_obj.datosVisitante.VIS_COD+".jpg' >");
                    $('#my_result img').load(function(){}).error(function(){$("#my_result img").attr('src','img/avatars/male.png');});            
                    Webcam.set({
                        width: 220,
                        height: 190,
                        image_format: "jpeg",
                        jpeg_quality: 90
                    });
                    Webcam.attach( "#my_camera" );
                }
            });
        }
    });
    var dtTable=$('#listaVisitantes').dataTable({
        "bServerSide": true,
        "sAjaxSource": "includes/visitante/visitantes_dataTable.php",
        "oLanguage": {
            "sEmptyTable": "No hay datos disponibles en la tabla",
            "sInfo": "Existen _TOTAL_ registros en total, mostrando (_START_ a _END_)",
            "sInfoEmpty": "No hay entradas para mostrar",
            "sInfoFiltered": " - Filtrado de registros _MAX_",
//            "sSearch": "Buscar: ",
            "sZeroRecords": "No hay registros que mostrar"
        }
    });
    $('#listaVisitantes_filter').append( '<label><a href="#" id="buscar" class="btn btn-default">Buscar</a></label>' );
    $('#listaVisitantes_filter').append( '<label><a href="#" id="reset" class="btn btn-default">Reset</a></label>' );
    $("div.dataTables_filter input").unbind();
    $('#reset').click(function(e) {
        $("div.dataTables_filter input").val('');
        dtTable.fnFilter($("div.dataTables_filter input").val());
    });
    $('#buscar').click(function(e) {
        dtTable.fnFilter($("div.dataTables_filter input").val());
    });
     $('div.dataTables_filter input').focusout(function(e) {
        dtTable.fnFilter($("div.dataTables_filter input").val());
    });
    var $registerForm = $("#form-visitante").validate({
        rules: {
            cedula: {required: true},
            nombre: {required: true},
            apellido: {required: true},
            telefono: {required: true},
            parentesco: {required: true}
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent());
        }
    });
});



function tomarFoto(){
    Webcam.snap( function(data_uri) {
            document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
        } );   

    $("#codeImage").val($('#my_result img').attr('src'));          
}

function editarVisitante(visitante,ppl) {
    var tipo='A';
    var url = './includes/visitante/visitantes_model.php?opcion=enviarDatosVisitante';
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {codigoVis: visitante,ppl:ppl,tipo:tipo},
        success: function(res) {
            var json_obj = $.parseJSON(res);
            limpiarFrmVisitante();
            carga_DatosIncialesVisitantes(json_obj,visitante,ppl);
            $('#frmVisitanteModal').modal('show');
            $('#smart-form-register >header').text('Actualización de Visitante');
            $('#IDvisitante').val(visitante);
            $("#my_result").html("<img src='uploads/imagenes/visitante/"+visitante+".jpg' >");
            $('#my_result img').load(function(){}).error(function(){$("#my_result img").attr('src','img/avatars/male.png');});            
            Webcam.set({
                width: 220,
                height: 190,
                image_format: "jpeg",
                jpeg_quality: 90
            });
            Webcam.attach( "#my_camera" );
        }
    });
}

function carga_DatosIncialesVisitantes(edt,vis,ppl) {
    var codVis=(vis===0)?edt.datosVisitante.VIS_COD:vis;
    var codPpl=(ppl===0)?edt.datosVisitante.PPL_COD:ppl;
    $("#nombre").val(edt.datosVisitante.VIS_NOMBRE);  
    $("#apellido").val(edt.datosVisitante.VIS_APELLIDO);  
    $("#telefono").val(edt.datosVisitante.VIS_TELEFONO); 
    $("#cedula").val(edt.datosVisitante.VIS_CEDULA);  
    $("#huella").val(edt.datosVisitante.VIS_HUELLA);  
    $("#direccion").val(edt.datosVisitante.VIS_DIRECCION); 
    $("#correo").val(edt.datosVisitante.VIS_CORREO);  
    $("#IDvisPpl").val(edt.datosVisitante.PPL_COD);  
    $("#nombrePpl").val(edt.datosVisitante.PPL_NOMBRE+' '+edt.datosVisitante.PPL_APELLIDO);  
    cargarParentesco(codVis,codPpl);
    cargarPpl(codPpl);
}

function guardarVisitante(tipo) {
    var visitante = $('#IDvisitante').val();
    
    if (visitante === '') {
        $.ajax({
            url: './includes/visitante/visitantes_model.php?opcion=guardaDatosVisitante',
            datetype: "json",
            type: 'POST', 
            data: $("#smart-form-register").serialize(),  
            success: function(res) { 
                if (res === '1') {
                    $.smallBox({
                        title: "Visitante Almacenado",
                        content: "<i class='fa fa-clock-o'></i> <i>Visitante Agregado correctamente...</i>",
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
            url: './includes/visitante/visitantes_model.php?opcion=actualizarDatosVisitante',
            datetype: "json",
            type: 'POST',
            data: $("#form-visitante").serialize(),
            success: function(res) {
                if (res === '1') {
                    $.smallBox({
                        title: "Actualización",
                        content: "<i class='fa fa-clock-o'></i> <i>Visitante Actualizado correctamente...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                    limpiarFrmVisitante();
                    if(tipo===1){
                        location.reload();
                    }else{
                        var codPpl = $('#IDvisPpl').val();
                        revisarVisitantesAsignados(codPpl,2);
                        $('#frmVisitanteModal').modal('hide');
                    }
                }
            }
        });
    }

    $('#frmVisitanteModal').modal('hide');

}

function nuevoVisitante() {
    cargarParentesco(0,0);
    limpiarFrmVisitante();
    $('#frmVisitanteModal').modal('show');
    $('#smart-form-register >header').text('Registro Nuevo Usuario')
    $('#IDvisitante').val('');
    Webcam.set({
        width: 220,
        height: 190,
        image_format: "jpeg",
        jpeg_quality: 90
    });
    Webcam.attach( "#my_camera" );
}

function eliminarVisitante(cod,ppl){
    $.SmartMessageBox({
    title: "Confirmación!",
    content: "Esta seguro de eliminar al Visitante",
    buttons: '[No][Si]'
    }, function(ButtonPressed) {
        if (ButtonPressed === "Si") {
            $.ajax({
                url: "./includes/visitante/visitantes_model.php?opcion=eliminarVisitante",
                type: 'post',
                data: {codigo: cod,ppl:ppl},
                success: function(respuesta) {
                    if (respuesta === '1') {
                        $.smallBox({
                            title: cod,
                            content: "<i class='fa fa-clock-o'></i> <i>Visitante Eliminado...</i>",
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 4000
                        });
                        location.reload();
                    }
                }
            });
        }
    });
}

function limpiarFrmVisitante() {
    $("#nombre").val('');  /*Nombre*/
    $("#apellido").val('');  /*Apellido*/
    $("#correo").val('');  /*Usuario*/
    $("#direccion").val('');  /*E-Mail*/
    $("#telefono").val('');/*Celular*/
    $("#cedula").val('');/*Cedula*/
    $("#huella").val('');/*Cedula*/   
    $("#my_result").html(''); 
    $("#codeImage").val(''); 
}

function cargarParentesco(visitante,ppl){
    $.ajax({
        url: "./includes/visitante/visitantes_model.php?opcion=enviarDatosParentesco",
        type: 'post',
        data: {visitante:visitante,ppl:ppl},
        success: function(respuesta) {
                $('#parentesco').html(respuesta);
        }
    });
}
function cargarPpl(ppl){
    $.ajax({
        url: "./includes/visitante/visitantes_model.php?opcion=enviarDatosPpl",
        type: 'post',
        data: {ppl:ppl},
        success: function(respuesta) {
                $('#comboPpl').html(respuesta);
        }
    });
}