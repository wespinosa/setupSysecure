$(document).ready(function() {
    $('#listaAcceso2').dataTable({
        "bServerSide": true,
        "sAjaxSource": "includes/controles/acceso2/acceso2_dataTable.php",
        "oLanguage": {
            "sEmptyTable": "No hay datos disponibles en la tabla",
            "sInfo": "Existen _TOTAL_ registros en total, mostrando (_START_ a _END_)",
            "sInfoEmpty": "No hay entradas para mostrar",
            "sInfoFiltered": " - Filtrado de registros _MAX_",
            "sZeroRecords": "No hay registros que mostrar"
        }
    });
});


function permitirAcceso(nombre, cod,contr,horario,codVisitante){
    $.SmartMessageBox({
    title: "Confirmación!",
    content: "Esta seguro que desea permitir el aceeso del visitante "+nombre+ "?",
    buttons: '[No][Si]'
    }, function(ButtonPressed) {
        if (ButtonPressed === "Si") {
            $.ajax({
                url: "./includes/controles/acceso2/acceso2_model.php?opcion=permitirAcceso2",
                type: 'post',
                data: {codigo: cod, control: contr,horario:horario },
                success: function(respuesta) {

                    if (respuesta === '1') {

                        $.smallBox({
                            title: cod,
                            content: "<i class='fa fa-clock-o'></i> <i>Permitido el acceso del visitante...</i>",
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 4000
                        });
                        $('#cod_'+codVisitante).parent('td').parent('tr').remove();    
                    }
                },
                error:function()
                {
                 
                        $.smallBox({
                            title: cod,
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