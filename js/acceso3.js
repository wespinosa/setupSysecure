$(document).ready(function() {
    $('#listaAcceso3').dataTable({
        "bServerSide": true,
        "sAjaxSource": "includes/controles/acceso3/acceso3_dataTable.php",
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

function permitirAcceso3(nombre, vipcontrol,pplcod,codControl,horario){
    $.SmartMessageBox({
    title: "Confirmación!",
    content: "Esta seguro que desea permitir el aceeso del visitante "+nombre+ "?",
    buttons: '[No][Si]'
    }, function(ButtonPressed) {
        if (ButtonPressed === "Si") {
            $.ajax({
                url: "./includes/controles/acceso3/acceso3_model.php?opcion=permitirAcceso3",
                type: 'post',
                data: {vipcontrol: vipcontrol,pplcod:pplcod,codControl:codControl,horario:horario},
                success: function(respuesta){
                    if (respuesta !== '0') {
                        $.smallBox({
                            title: nombre,
                            content: "<i class='fa fa-clock-o'></i> <i>Acceso del visitante Permitido...</i>",
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 4000
                        });
                        $("#verlugarCedula").html('<strong>'+respuesta+'</strong>');
                        $("#txtCedula").html('<i> Visitante: '+nombre+'</i>');
                        $("#frmCedulaModal").modal('show');
//                             
                       $('#closeModalCedula').click(function(){
                           $('#cod_'+vipcontrol).parent('td').parent('tr').remove();
//                           location.reload();
                       });
                    }
                },
                error:function(){
                        $.smallBox({
                            title: nombre,
                            content: "<i class='fa fa-clock-o'></i> <i>Error durante el proceso, datos no guardados</i>",
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 4000
                        });
                }
            });
        }
    });
}
function closeModalCedula() {
    $("#frmCedulaModal").modal('hide');
}

function negarAcceso3(codVisita, codVisitante){
    
    var mensaje = "Describa la razón de la sanción: ";
        $.SmartMessageBox({
                title : "Alerta..!",
                content : mensaje,
                buttons : "[Aceptar][Cancelar]",
                input : "text",
                placeholder : "Describa la razón",
                inputValue:"",
                 
        }, function(ButtonPress, Value) {
           
            if (ButtonPress === "Aceptar") {
                if (Value !== '') {
                    $.ajax({
                        url: "./includes/controles/acceso3/acceso3_model.php?opcion=bloquearAceeso3",
                        type: 'post',
                        data: {codigo: codVisita, visitante:codVisitante, razon:Value},
                        success: function(respuesta){
                            if (respuesta === '1') {
                                $.smallBox({
                                    title: 'Visitante Sancionado..!',
                                    content: "<i class='fa fa-clock-o'></i> <i>Aceeso al visitante denegado...</i>",
                                    color: "#659265",
                                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                                    timeout: 5000
                                });
                                $('#cod_'+codVisita).parent('td').parent('tr').remove();
                            }
                        },
                        error:function(){
                                $.smallBox({
                                    title: 'ERROR..!',
                                    content: "<i class='fa fa-clock-o'></i> <i>Error durante el proceso, datos no guardados</i>",
                                    color: "#659265",
                                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                                    timeout: 4000
                                });
                        }
                    });
                }
        }
        });
}