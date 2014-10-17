$(document).ready(function() {
    $('#listaUsuarios').dataTable({
        "bServerSide": true,
        "sAjaxSource": "includes/usuario/Usuarios_dataTable.php",
        "oLanguage": {
            "sEmptyTable": "No hay datos disponibles en la tabla",
            "sInfo": "Existen _TOTAL_ registros en total, mostrando (_START_ a _END_)",
            "sInfoEmpty": "No hay entradas para mostrar",
            "sInfoFiltered": " - Filtrado de registros _MAX_",
            "sSearch": "Buscar Registros: ",
            "sZeroRecords": "No hay registros que mostrar"
        }
    });
    var $registerForm = $("#smart-form-register").validate({
        rules: {
            usuario: {
                required: true,
                minlength: 6
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 3,
                maxlength: 20
            },
            passwordConfirm: {
                required: true,
                minlength: 3,
                maxlength: 20,
                equalTo: '#password'
            },
            nombre: {
                required: true
            },
            apellido: {
                required: true
            },
            genero: {
                required: true
            },
            grupo: {
                required: true
            },
            cargo: {
                required: true
            }
        },
        // Messages for form validation
        messages: {
            usuario: {
                required: 'Introduzca un Usuario Valido'
            },
            email: {
                required: 'Introduzca su dirección de correo electrónico',
                email: 'Por favor, introduce una dirección de correo electrónico válida'
            },
            password: {
                required: 'Por favor, introduzca su contraseña'
            },
            passwordConfirm: {
                required: 'Por favor, introduzca su contraseña una vez más',
                equalTo: 'Por favor, introduzca la misma contraseña que el anterior'
            },
            nombre: {
                required: 'Por favor, introduzca su Nombre'
            },
            apellido: {
                required: 'Por favor, introduzca su Apellido'
            },
            genero: {
                required: 'Por favor, seleccione su Genero'
            },
            grupo: {
                required: 'Por favor, seleccione el Grupo Scout'
            },
            cargo: {
                required: 'Por favor, seleccione el Cargo Scout'
            }
        },
        // Do not change code below
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent());
        }
    });
    var $cambioClaveForm = $("#cambioClave-form").validate({
        // Rules for form validation
        rules: {
            password: {
                required: true,
                minlength: 4,
                maxlength: 20
            },
            passwordConfirm: {
                required: true,
                minlength: 4,
                maxlength: 20,
                equalTo: '#password'
            }
        },
        // Messages for form validation
        messages: {
            password: {
                required: 'Por favor digite su nueva Contraseña'
            },
            passwordConfirm: {
                required: 'Por favor, introduzca su contraseña una vez más',
                equalTo: 'Por favor, introduzca la misma contraseña que el anterior'
            }
        },
        // Do not change code below
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent());
        }
    });

});
function cambiarClaveUsuario(usuario) {
    $('.' + usuario).parent('section').siblings('.verclave').hide();
    $('.' + usuario).show();
}
function cambiarClave(usuario) {
    $('#frmClaveModal').modal('show');
    $('#IDuser').val(usuario);
}
function guardarCambioClave(usuario) {
    $.SmartMessageBox({
        title: "Confirmación!",
        content: "Esta seguro de cambiar la Contraseña del Usuario?",
        buttons: '[No][Si]'
    }, function(ButtonPressed) {
        if (ButtonPressed === "Si") {
            var clave = $('#password').val();
            var codigo = $('#IDuser').val();
            $.ajax({
                url: "./includes/usuario/Usuarios_model.php?opcion=cambioClaveUsuario",
                type: 'post',
                data: {codigo: codigo, clave: clave},
                success: function(respuesta) {
                    if (respuesta === '1') {
                        $('#frmClaveModal').modal('hide');
                        $.smallBox({
                            title: 'Actualización',
                            content: "<i class='fa fa-clock-o'></i> <i>Usuario Actualizado su Clave...</i>",
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
    var url = './includes/usuario/Usuarios_model.php?opcion=enviarDatosUsuario';
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {codigoUsu: usuario},
        success: function(res) {
            var json_obj = $.parseJSON(res);


        }
    });
}
function GuardarCambioClaveUsuario(codPar) {

    $.SmartMessageBox({
        title: "Confirmación!",
        content: "Esta seguro de cambiar la Contraseña del Usuario?",
        buttons: '[No][Si]'
    }, function(ButtonPressed) {
        if (ButtonPressed === "Si") {
            var clave = $('#clave_' + codPar).val();
            $.ajax({
                url: "./includes/usuario/Usuarios_model.php?opcion=cambioClaveUsuario",
                type: 'post',
                data: {codigo: codPar, clave: clave},
                success: function(respuesta) {
                    if (respuesta === '1') {
                        var passhash = $.md5(clave);
//                        var passhash = CryptoJS.MD5(clave).toString();
                        $('.' + codPar).parent('td').parent('tr').addClass('success');
                        $('.' + codPar).parent('section').siblings('.verclave').val(passhash);
                        $('.' + codPar).parent('section').siblings('.verclave').show();
                        $('.cambioClave').hide();
                        $.smallBox({
                            title: 'Actualización',
                            content: "<i class='fa fa-clock-o'></i> <i>Usuario Actualizado su Clave...</i>",
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
function editarUsuario(usuario) {
    var url = './includes/usuario/Usuarios_model.php?opcion=enviarDatosUsuario';
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {codigoUsu: usuario},
        success: function(res) {
            var json_obj = $.parseJSON(res);
            limpiarFormularioUsuario();
            carga_DatosIncialesUsuarios(json_obj);
            $('#frmUsuarioModal').modal('show');
            $("#centro").hide();
            $("#password").hide();
            $("#passwordConfirm").hide();
            $('#smart-form-register >header').text('Actualización de Datos Usuario')
            $('#IDuser').val(usuario);

        }
    });

}
function guardarUsuario() {
    var usuario = $('#IDuser').val();
    if (usuario === '') {
        $.ajax({
            url: './includes/usuario/Usuarios_model.php?opcion=guardaDatosUsuario',
            datetype: "json",
            type: 'POST',
            data: $("#smart-form-register").serialize(),
            success: function(res) {
                if (res === '1') {
                    $.smallBox({
                        title: "Usuario Almacenado",
                        content: "<i class='fa fa-clock-o'></i> <i>Usuario Agregado correctamente...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                    limpiarFormularioUsuario();
                    location.reload();
                }
            }
        });
    } else {
        $.ajax({
            url: './includes/usuario/Usuarios_model.php?opcion=actualizarDatosUsuario',
            datetype: "json",
            type: 'POST',
            data: $("#smart-form-register").serialize(),
            success: function(res) {
                if (res === '1') {
                    $.smallBox({
                        title: "Actualización",
                        content: "<i class='fa fa-clock-o'></i> <i>Usuario Actualizado correctamente...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                    limpiarFormularioUsuario();
                    location.reload();
                }
            }
        });
    }
    $('#frmUsuarioModal').modal('hide');
}
function nuevoUsuario() {
    limpiarFormularioUsuario();
    $('#frmUsuarioModal').modal('show');
    $("#centro").show();
    $("#password").show();
    $("#passwordConfirm").show();
    $('#smart-form-register >header').text('Registro Nuevo Usuario')
    $('#IDuser').val('');
}
function eliminarUsuario(codPar, nomCod) {

    $.SmartMessageBox({
        title: "Confirmación!",
        content: "Esta seguro de eliminar al Usuario de <span class='txt-color-orangeDark'><strong>" + nomCod + " </strong></span>?",
        buttons: '[No][Si]'
    }, function(ButtonPressed) {
        if (ButtonPressed === "Si") {
            $.ajax({
                url: "./includes/usuario/Usuarios_model.php?opcion=eliminarUsuario",
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
function limpiarFormularioUsuario() {
    $("#nombre").val('');  /*Nombre*/
    $("#apellido").val('');  /*Apellido*/
    $("#usuario").val('');  /*Usuario*/
    $("#password").val('');  /*Usuario*/
    $("#passwordConfirm").val('');  /*Usuario*/
    $("#email").val('');  /*E-Mail*/
    $("#celular").val('');/*Celular*/
    $("#cedula").val('');/*Cedula*/
    $('#tipoUsuario').prop('selectedIndex', 0);/*Tipo de Usuario*/
    $('#centro').prop('selectedIndex', 0);/*Centro*/
}
function carga_DatosIncialesUsuarios(edt) {
    $("#nombre").val(edt.datosUsuario.USU_NOMBRE);  /*Nombre*/
    $("#apellido").val(edt.datosUsuario.USU_APELLIDO);  /*Apellido*/
    $("#usuario").val(edt.datosUsuario.USU_USUARIO);  /*Usuario*/
    $("#email").val(edt.datosUsuario.USU_EMAIL);  /*E-Mail*/
    $("#celular").val(edt.datosUsuario.USU_CELULAR);/*Celular*/
    $("#cedula").val(edt.datosUsuario.USU_CEDULA);/*Celular*/
//    $('#tipoUsuario option[value="' + edt.datosUsuario.ROL_COD + '"]').attr("selected", true);/*Tipo de Usuario*/
    $('#tipoUsuario').prop('selectedIndex', edt.datosUsuario.ROL_COD);
}
function revisarCentrosDisponibles(codUsuario){
    $.ajax({
            url: "./includes/usuario/Usuarios_model.php?opcion=obtenerCentrosListado",
            type: 'post',
            data: {codUsuario: codUsuario},
            success: function(respuesta) {
                $('#listaCentrosActivos >tbody').html(respuesta);
                $.ajax({
                    url: "./includes/usuario/Usuarios_model.php?opcion=obtenerCentrosMenu",
                    type: 'post',
                    data: {codUsuario: codUsuario},
                    success: function(res) {
                        $('#listaCentrosOpciones').html(res);
                        $('#frmCentrosDisponibles').modal('show');
                    }
                });
            }
        });
     
}
function agregaCentroTabla(codCentro,codUsuario){
     $.ajax({
            url: "./includes/usuario/Usuarios_model.php?opcion=agregaCentrosTabla",
            type: 'post',
            data: {codCentro: codCentro,codUsuario:codUsuario},
            success: function(respuesta) {
               $('#listaCentrosActivos >tbody').html(respuesta);
            }
        });
}