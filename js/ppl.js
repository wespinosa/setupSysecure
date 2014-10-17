$(document).ready(function() {
    var dtTable =$('#listaPpl').dataTable({
        "bPaginate": true,
        "iDisplayLength": 5,
        "bServerSide": true,
        "sAjaxSource": "includes/ppl/ppl_dataTable.php",
        "oLanguage": {
            "sEmptyTable": "No hay datos disponibles en la tabla",
            "sInfo": "Existen _TOTAL_ registros en total, mostrando (_START_ a _END_)",
            "sInfoEmpty": "No hay entradas para mostrar",
            "sInfoFiltered": " - Filtrado de registros _MAX_",
//            "sSearch": "Buscar: ",
            "sZeroRecords": "No hay registros que mostrar"
        }
    });
    $('#listaPpl_filter').append( '<label><a href="#" id="buscar" class="btn btn-default">Buscar</a></label>' );
    $('#listaPpl_filter').append( '<label><a href="#" id="reset" class="btn btn-default">Reset</a></label>' );
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
    var dataTableDiv = $('#viewPPL').height();
    var mainDiv = $('#main').height();
    var total = dataTableDiv + mainDiv + 150;
    $('#main').css({"min-height": total});
    $("#imgPpl").click(function() {
        $("#imgCambio").css({display: "block"});
    });
    var $registerForm = $("#smart-form-ppl").validate({
        rules: {
            pabellon: {required: true},
            nombre: {required: true},
            apellido: {required: true},
            cedula: {required: true},
            filePpl: {required: true},
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent());
        }
    });
    var $registerForm2 = $("#form-traspasoPabellon").validate({
        rules: {
            nuevoPabellon: {required: true},
            motivo: {required: true}
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent());
        }
    });
        $('select#estado').on('change',function(){
            var valorEstado = $(this).val();
            var ppl = $('#IDppl').val();
            $.SmartMessageBox({
                title: "Confirmación!",
                content: "Esta seguro de Modificar el Estado del PPL ??",
                buttons: '[No][Si]'
            }, function(ButtonPressed) {
                if (ButtonPressed === "Si") {
                    $.ajax({
                        url: './includes/ppl/ppl_model.php?opcion=cambioEstadoPpl',
                        datetype: "json",
                        type: 'POST',
                        data: {estado:valorEstado,codPpl:ppl},
                        success: function(res) {
                            $.smallBox({
                                title: 'Actualización',
                                content: "<i class='fa fa-clock-o'></i> <i>Actualización correcta...</i>",
                                color: "#659265",
                                iconSmall: "fa fa-check fa-2x fadeInRight animated",
                                timeout: 4000
                            });
    
                        }
                    });
                }
            });
        });
});
function mostrarCelda() {
    $('#pabellon').val();
    $.ajax({
        url: './includes/ppl/ppl_model.php?opcion=mostrarCelda',
        datetype: "json",
        type: 'POST',
        data: $("#smart-form-ppl").serialize(),
        success: function(res) {
            $('#celda').html(res);
        }
    });
}
function nuevoPpl() {
    $('#frmPPLModal').modal('show');
    $('#estadoLavel').hide();
    limpiarFormularioPpl();
//    $('#smart-form-pabellon >header').text('Registro Nuevo Pabellon')
//    $('#IDpabellon').val('');
}
function handleFileSelectImagen(evt) {
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    $(".cargar_btn").hide();
//    var output = [];
    $("#cargar_txt").show();
    if (document.getElementById('image_X')) {
        var image_x = document.getElementById('image_X');
        image_x.parentNode.removeChild(image_x);
    }
    for (var i = 0, f; f = files[i]; i++) {
        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {

                var span = document.createElement('p');
                span.innerHTML = ['<img id="image_X" class="thumb" src="', e.target.result, '" title="', escape(theFile.name), '" style="position: relative;top: 0px;width: 75px;"/>'].join('');
                document.getElementById('cargar_txt').insertBefore(span, null);
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}
if (document.getElementById('filePpl')) {
    document.getElementById('filePpl').addEventListener('change', handleFileSelectImagen, false);
}
function cancelarImagen() {
    $("#imgCambio").hide();
    $('#filePpl').val('');
    $(".cargar_btn").show();
    $("#cargar_txt >p").remove();
}
function agregarImagenPpl() {
//    var file = $('#filePpl').prop('files');
    var form = new FormData();
    form.append("filePpl", $("#filePpl")[0].files[0]);
    $.ajax({
        url: './includes/upload_archivos.php?funcion=subirImagenPpl',
        type: 'POST',
        data: form,
        cache: false,
        contentType: false,
        processData: false,
        success: function(img) {
            var srcImg = 'uploads/imagenes/ppl/' + img;
            $("#imgCambio").hide();
            $("#imagenPPL").attr("src", srcImg);
            $("#imagenPPL").css("width", 150);
            $("#imagenPpl").val(srcImg);
            $.smallBox({
                title: "Imagen Cargada...",
                content: "<i class='fa fa-clock-o'></i> <i>Imagen Subida correctamente...</i>",
                color: "#659265",
                iconSmall: "fa fa-check fa-2x fadeInRight animated",
                timeout: 4000
            });
        },
        error: function() {
            $.smallBox({
                title: 'Error...!',
                content: "<i class='fa fa-clock-o'></i> <i>Error durante el proceso, datos no guardados</i>",
                color: "#659265",
                iconSmall: "fa fa-check fa-2x fadeInRight animated",
                timeout: 4000
            });
        }
    });
}
function guardarPpl() {
    var ppl = $('#IDppl').val();
    var img = $('#imagPpl').val($('img[alt="imagenPPL"]').attr('src'));
    if (ppl === '') {
        $.ajax({
            url: './includes/ppl/ppl_model.php?opcion=guardaDatosPpl',
            datetype: "json",
            type: 'POST',
            data: $("#smart-form-ppl").serialize(),
            success: function(res) {
                switch (res) {
                    case '0':
                        $.smallBox({
                            title: "Error..!!",
                            content: "<i class='fa fa-clock-o'></i> <i>Problemas con el Almacenamiento, contáctese con su proveedor</i>",
                            color: "#C46A69",
                            iconSmall: "fa fa-times fa-2x fadeInRight animated",
                            timeout: 4000
                        });
                        break;
                    case '1':
                        $.smallBox({
                            title: "PPL Almacenado",
                            content: "<i class='fa fa-clock-o'></i> <i>PPL Agregado correctamente...</i>",
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 4000
                        });
                        limpiarFormularioPpl();
                        location.reload();
                        break;
                    case '2':
                        $.smallBox({
                            title: "Error..!!",
                            content: "<i class='fa fa-clock-o'></i> <i>Ya existe un PPL con esos Datos(Nombre, Apellido, Cedula y Huella)</i>",
                            color: "#C46A69",
                            iconSmall: "fa fa-times fa-2x fadeInRight animated",
                            timeout: 7000
                        });
                        break;
                }
            }
        });
    } else {
        $.ajax({
            url: './includes/ppl/ppl_model.php?opcion=actualizarDatosPpl',
            datetype: "json",
            type: 'POST',
            data: $("#smart-form-ppl").serialize(),
            success: function(res) {
                if (res === '1') {
                    $.smallBox({
                        title: "Actualización",
                        content: "<i class='fa fa-clock-o'></i> <i>Pabellon Actualizado correctamente...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                    limpiarFormularioPpl();
                    location.reload();
                }
            }
        });
    }
    $('#frmPabellonModal').modal('hide');
}
function editarPpl(codPpl) {
    var url = './includes/ppl/ppl_model.php?opcion=enviarDatosPpl';
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {codPpl: codPpl},
        success: function(res) {
            var json_obj = $.parseJSON(res);
            limpiarFormularioPpl();
            carga_DatosIncialesPPL(json_obj);
            $('#frmPPLModal').modal('show');
            $('#smart-form-ppl >header').text('Actualización de Datos Usuario');
            $('#estadoLavel').show();
        }
    });

}
function carga_DatosIncialesPPL(edt) {
    var img = (edt.datosPPL.PPL_IMG !== '') ? 'uploads/imagenes/ppl/' + edt.datosPPL.PPL_IMG : 'img/avatars/male.png';
    $("#IDppl").val(edt.datosPPL.PPL_COD);  /*Usuario*/
    $('#pabellon').prop('selectedIndex', edt.datosPPL.PAB_COD); //PABELLON
    mostrarCelda();
    $('#celda').prop('selectedIndex', edt.datosPPL.CEL_COD); //CELDA
    $("#nombre").val(edt.datosPPL.PPL_NOMBRE);  //NOMBRE
    $("#apellido").val(edt.datosPPL.PPL_APELLIDO); //APELLIDO
    $("#cedula").val(edt.datosPPL.PPL_CEDULA);  //CEDULA
    $('#estado option[value="' + edt.datosPPL.PPL_ESTADO + '"]').attr("selected", true);
    $('img[alt="imagenPPL"]').attr('src', img);
    
}
function revisarVisitantesDisponibles(codPpl) {
    $('#IDpplNew').val(codPpl);
    $.ajax({
        url: './includes/ppl/ppl_model.php?opcion=mostrarVisitantesPpl',
        datetype: "json",
        type: 'POST',
        data: {codPpl: codPpl},
        success: function(res) {
            $('#litaVisitantesPpl >tbody').html(res);
            $('#frmVisitantesModal').modal('show');
        }
    });
}
function editarVisita(codPpl,cod) {
    $('#vis' + cod).children('td').children('.txtVisDatos').hide();
    $('#vis' + cod).children('td').children('.visDatos').show();
    $('#vis' + cod).children('td').children('.visBtnGuardar').show();
    $('#vis' + cod).children('td').children('.visBtnDatos').hide();
}
function GuardarCambioVisita(codppl,codVis, tipo) {
    if (tipo === 'N') {
        var url = './includes/ppl/ppl_model.php?opcion=guardarListaVisitante';
        var codigo = $('#IDpplNew').val();
        var nombre = $('#new').children('td').children('#visNombre').val();
        var apellido = $('#new').children('td').children('#visApellido').val();
        var parentesco = $('#new').children('td').children('#visParentesco').val();
    } else {
        var url = './includes/ppl/ppl_model.php?opcion=actualizaListaVisitante';
        var codigo = codppl;
        var nombre = $('#vis' + codVis).children('td').children('#visNombre').val();
        var apellido = $('#vis' + codVis).children('td').children('#visApellido').val();
        var parentesco = $('#vis' + codVis).children('td').children('#visParentesco').val();
    }
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {codPlp: codigo,visCod:codVis, nombre: nombre, apellido: apellido, parentesco: parentesco},
        success: function(res) {
            if (res !== '0') {
                var json_obj = $.parseJSON(res);
                if (tipo === 'N') {
                    $('#new').children('td').children('#txtVisNombre').text(json_obj.datosActualizados.nombre);
                    $('#new').children('td').children('#txtVisApellido').text(json_obj.datosActualizados.apellido);
                    $('#new').children('td').children('#txtVisParentesco').text(json_obj.datosActualizados.parentesco);
                } else {
                    $('#vis' + codVis).children('td').children('#txtVisNombre').text(json_obj.datosActualizados.nombre);
                    $('#vis' + codVis).children('td').children('#txtVisApellido').text(json_obj.datosActualizados.apellido);
                    $('#vis' + codVis).children('td').children('#txtVisParentesco').text(json_obj.datosActualizados.parentesco);
                }
            }
       
            if (tipo === 'N') {
                revisarVisitantesDisponibles(json_obj.datosActualizados.codigoPPL);
            } else {
                $('#vis' + codVis).children('td').children('#visNombre').val(json_obj.datosActualizados.nombre);
                $('#vis' + codVis).children('td').children('#visApellido').val(json_obj.datosActualizados.apellido);
                $('#vis' + codVis).children('td').children('#visParentesco').prop('selectedIndex', parentesco);
                $('#vis' + codVis).children('td').children('.txtVisDatos').show();
                $('#vis' + codVis).children('td').children('.visDatos').hide();
                $('#vis' + codVis).children('td').children('.visBtnGuardar').hide();
                $('#vis' + codVis).children('td').children('.visBtnDatos').show();
            }
            $.smallBox({
                title: "Actualización",
                content: "<i class='fa fa-clock-o'></i> <i>Visitante Actualizado correctamente...</i>",
                color: "#659265",
                iconSmall: "fa fa-check fa-2x fadeInRight animated",
                timeout: 4000
            });
        }
    });
}
function nuevoVisitantePpl() {
    var codigo = $('#IDpplNew').val();
    $.ajax({
        url: './includes/ppl/ppl_model.php?opcion=validarCantidadVisitante',
        datetype: "json",
        type: 'POST',
        data: {codigo: codigo},
        success: function(res) {
            if (res === '1') {
                var tds = $("#litaVisitantesPpl tr:first td").length; // Obtenemos el total de columnas (tr) del id "tabla" 
                var trs = $("#litaVisitantesPpl tr").length;
                var alerta = 1;
                var tr = $("tr#new").attr("id");
                if (tr === undefined) {
                    var nuevaFila = '<tr id="new">';
                    nuevaFila += "<td>" + (trs);
                    nuevaFila += '<td><div class="txtVisDatos" id="txtVisNombre"></div><input type="text" id="visNombre" name="visNombre" class="visDatos">';
                    nuevaFila += '<td><div class="txtVisDatos" id="txtVisApellido"></div><input type="text" id="visApellido" name="visApellido" class="visDatos">';
                    nuevaFila += '<td><div class="txtVisDatos" id="txtVisParentesco"></div><select id="visParentesco" name="visParentesco" class="visDatos"></select>';
                    $.ajax({
                        url: './includes/ppl/ppl_model.php?opcion=comboParentesco',
                        datetype: "json",
                        type: 'POST',
                        data: {alerta: alerta},
                        success: function(res) {
                            $('#new').children('td').children('#visParentesco').html(res);
                        }
                    });
                    var valida = 'N', nada = '';
                    nuevaFila += '<td><a class="btn btn-primary btn-xs visBtnGuardar" title="Guardar Cambio" href="javascript:GuardarCambioVisita(\''+codigo+'\',\'' + nada + '\',\'' + valida + '\')"><i class="fa fa-save"></i></a>';
                    nuevaFila += "</tr>";
                    $("#litaVisitantesPpl").append(nuevaFila);
                    $('#new').children('td').children('.visDatos').show();
                    $('#new').children('td').children('.visBtnGuardar').show();
                }
            } else {
                $.smallBox({
                    title: "Error..!!",
                    content: "<i class='fa fa-clock-o'></i> <i>Limite máximo de Visitantes Asignados</i>",
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 6000
                });
            }
        }
    });


}
function eliminarPpl(codPar, nomCod) {

    $.SmartMessageBox({
        title: "Confirmación!",
        content: "Esta seguro de Anular al PPL <span class='txt-color-orangeDark'><strong>" + nomCod + " </strong></span>?",
        buttons: '[No][Si]'
    }, function(ButtonPressed) {
        if (ButtonPressed === "Si") {
            $.ajax({
                url: "./includes/ppl/ppl_model.php?opcion=eliminarPpl",
                type: 'post',
                data: {codigo: codPar},
                success: function(respuesta) {
                    if (respuesta === '1') {
                        $('.' + codPar).parent('td').parent('tr').addClass('paraEliminarUsuario');
                        $('.paraEliminarUsuario').fadeOut('tr');
                        $.smallBox({
                            title: nomCod,
                            content: "<i class='fa fa-clock-o'></i> <i>Usuario Eliminado...</i>",
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
function eliminarVisitantePpl(codPpl,codPar, nomCod) {

    $.SmartMessageBox({
        title: "Confirmación!",
        content: "Esta seguro de eliminar al Visitante <span class='txt-color-orangeDark'><strong>" + nomCod + " </strong></span>?",
        buttons: '[No][Si]'
    }, function(ButtonPressed) {
        if (ButtonPressed === "Si") {
            $.ajax({
                url: "./includes/ppl/ppl_model.php?opcion=eliminarVisitantePpl",
                type: 'post',
                data: {codigo: codPar,codPpl:codPpl},
                success: function(respuesta) {
                    if (respuesta === '1') {
                        $('.' + codPar).parent('td').parent('tr').addClass('paraEliminarUsuario');
                        $('.paraEliminarUsuario').fadeOut('tr');
                        $.smallBox({
                            title: nomCod,
                            content: "<i class='fa fa-clock-o'></i> <i>Visitante Eliminado...</i>",
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
function limpiarFormularioPpl() {
    $("#nombre").val('');  /*Ala*/
    $("#apellido").val('');  /*Descripcion*/
    $("#cedula").val('');  /*Capacidad*/
    $("#filePpl").val('');  /*Detalles*/
    $('#pabellon').prop('selectedIndex', 0);/*Nivel*/
    $('#celda').prop('selectedIndex', 0);/*Nivel*/
}