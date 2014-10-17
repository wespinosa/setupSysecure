function mostrarPermisosUsuario(rol) {
    $('#IDRol').val(rol);
    $('#IDRolFrm').val(rol);
    $('#listaRoles').children('tbody').children('tr').each(function() {
        $(this).removeClass('info');
    });
    $('#' + rol).addClass('info');
    $.ajax({
        url: "./includes/roles/roles_model.php?opcion=buscarPermisosUsuario",
        type: 'post',
        data: {rol: rol},
        success: function(resultado) {
            $('#tbPermisosUsuarios >tbody').html(resultado);
        }
    });
}
function eliminarPermiso(codPar, nomCod, codRol) {

    $.SmartMessageBox({
        title: "Confirmación!",
        content: "Esta seguro de eliminar el Permiso de Acceso:  <span class='txt-color-orangeDark'><strong>" + nomCod + " </strong></span>?",
        buttons: '[No][Si]'
    }, function(ButtonPressed) {
        if (ButtonPressed === "Si") {
            $.ajax({
                url: "./includes/roles/roles_model.php?opcion=eliminarPermisoAcceso",
                type: 'post',
                data: {codigo: codPar,codRol:codRol},
                success: function(respuesta) {
                    if (respuesta === '1') {
                        mostrarPermisosUsuario(codRol);
                        $.smallBox({
                            title: nomCod,
                            content: "<i class='fa fa-clock-o'></i> <i>Permiso de Acceso Eliminado...</i>",
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
function nuevoPermiso() {
    var codRol = $('#IDRol').val();
    $('.checkbox').hide();
    if (codRol !== '') {
        $.ajax({
        url: "./includes/roles/roles_model.php?opcion=mostrarPermisosDisponibles",
        type: 'post',
        data: {codRol: codRol},
        success: function(resultado) {
            $('#tbPermisosDisponibles >tbody').html(resultado);
            $('#frmPermisosModal').modal('show');
            $('#smart-form-permisos >header').text('Asignación de Permisos por Rol')
        }
    });
        
        
        
    } else {
        $.smallBox({
            title: "Error..!!",
            content: "<i class='fa fa-clock-o'></i> <i>Seleccione un Rol</i>",
            color: "#C46A69",
            iconSmall: "fa fa-times fa-2x fadeInRight animated",
            timeout: 4000
        });
    }
}
function nuevoRol() {
    var codRol = $('#IDrol').val();
    limpiarFormularioRol();
    $('#frmRolesModal').modal('show');
    $('#smart-form-Roles >header').text('Creación de Rol');
}
function guardarRol(){
   var pabellon = $('#IDrol').val();
    if (pabellon === '') {
        $.ajax({
            url: './includes/roles/roles_model.php?opcion=guardaDatosRol',
            datetype: "json",
            type: 'POST',
            data: $("#smart-form-Roles").serialize(),
            success: function(res) {
                if (res === '1') {
                    $.smallBox({
                        title: "Rol Almacenado",
                        content: "<i class='fa fa-clock-o'></i> <i>Rol Agregado correctamente...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                    limpiarFormularioRol();
                    location.reload();
                }
            }
        });
    } else {
        $.ajax({
            url: './includes/roles/roles_model.php?opcion=actualizarDatosRol',
            datetype: "json",
            type: 'POST',
            data: $("#smart-form-Roles").serialize(),
            success: function(res) {
                if (res === '1') {
                    $.smallBox({
                        title: "Actualización",
                        content: "<i class='fa fa-clock-o'></i> <i>Rol Actualizado correctamente...</i>",
                        color: "#659265",
                        iconSmall: "fa fa-check fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                    limpiarFormularioRol();
                    location.reload();
                }
            }
        });
    }
    $('#frmPabellonModal').modal('hide'); 
}
function guardarAsignaPermisos(){
    var permisos='';
    var codRol=$('#codRol').val();
    $("input[name='asignar']").each(function(i) {
         if($(this).is(':checked')) {
            permisos += ';'+$(this).val();
        }
     });
    $.ajax({
        url: "./includes/roles/roles_model.php?opcion=guardarAsignaPermisos",
        type: 'post',
        data: {permisos: permisos,codRol:codRol},
        success: function(respuesta) {
            if (respuesta === '1') {
                mostrarPermisosUsuario(codRol);
                $('#frmPermisosModal').modal('hide');
                $.smallBox({
                    title: 'Permisos Agregados',
                    content: "<i class='fa fa-clock-o'></i> <i>Permiso del Rol Asignados...</i>",
                    color: "#659265",
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            }
        }
    });
}
function limpiarFormularioRol() {
    $("#IDrol").val('');  /*Codigo rol*/
    $("#descripcion").val('');  /*Descripcion*/
    $("#observacion").val('');  /*Observacion*/
}
function editarRol(rol) {
    var url = './includes/roles/roles_model.php?opcion=enviarDatosRoles';
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        data: {rol: rol},
        success: function(res) {
            var json_obj = $.parseJSON(res);
            limpiarFormularioRol();
            carga_DatosIncialesRol(json_obj);
            $('#frmRolesModal').modal('show');
            $('#smart-form-Roles >header').text('Actualización de Datos del Rol')
            $('#IDrol').val(rol);

        }
    });

}
function carga_DatosIncialesRol(edt) {
    $("#descripcion").val(edt.datosRol.ROL_DESCRIPCION);  /*Nombre*/
    $("#observacion").val(edt.datosRol.ROL_OBSERVACION);  /*Apellido*/
}
function eliminarRol(codPab, nomPab) {

    $.SmartMessageBox({
        title: "Confirmación!",
        content: "Esta seguro de eliminar el Rol <span class='txt-color-orangeDark'><strong>" + nomPab + " </strong></span>?",
        buttons: '[No][Si]'
    }, function(ButtonPressed) {
        if (ButtonPressed === "Si") {
            $.ajax({
                url: "./includes/roles/roles_model.php?opcion=eliminarRol",
                type: 'post',
                data: {codigo: codPab},
                success: function(respuesta) {
                    if (respuesta === '1') {
                        $('.' + codPab).parent('td').parent('tr').addClass('paraEliminarUsuario');
                        $('.paraEliminarUsuario').fadeOut('tr');
                        $.smallBox({
                            title: 'Pabellon: '+nomPab,
                            content: "<i class='fa fa-clock-o'></i> <i>Rol Eliminado...</i>",
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 4000
                        });
                    }
                }
            });

        }
    });
}