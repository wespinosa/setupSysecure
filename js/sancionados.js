$(document).ready(function() {
    $('#listaSanciones').dataTable({
        "bServerSide": true,
        "sAjaxSource": "includes/sanciones/sancion_dataTable.php",
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


function editarSancion(visitante,sancion) {
    var url = './includes/sanciones/sancion_model.php?opcion=enviarDatosTipoSanciones';
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
        success: function(res) {
                $('#sancion').html(res);
                var tipo_sancion = $('#sancion').val();
                editarSancionItem(tipo_sancion)
                $('#frmTipoSancion').modal('show');
                $('#smart-form-register >header').text('Actualización de Visitante');
                $('#IDvisitante').val(visitante);
                $('#IDsancion').val(sancion);
        }

    });
}

function seleccionSancion(){
    var tipo_sancion = $('#sancion').val();
    editarSancionItem(tipo_sancion);
}

function editarSancionItem(sancion) {
    var url = './includes/sanciones/sancion_model.php?opcion=enviarDatosSanciones';
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
         data: {tipo_sancion:sancion},
        success: function(res) {
                $('#sancionItem').html(res);
                tiempoSancion();
        }
    });
}

function seleccionTiempo(){
    sancion = $('#sancionItem').val();
    tiempoSancion(sancion);
}

function tiempoSancion(){
    var sancion = $('#sancionItem').val();
    var url = './includes/sanciones/sancion_model.php?opcion=enviarDatosTiempo';
    $.ajax({
        url: url,
        datetype: "json",
        type: 'POST',
         data: {sancion:sancion},
        success: function(res) {
               $('#tiempo_sancion small').html(res);
        }
    });
}

function guardarSancion() {
    var codVisitante=$('#IDvisitante').val();
 $.ajax({
    url: './includes/sanciones/sancion_model.php?opcion=guardarDatosSanciones',
    datetype: "json",
    type: 'POST',
    data: $("#smart-form-register").serialize(),
    success: function(res) {  
        if (res === '1') {
            $.smallBox({
                title: "Sancion actualizada",
                content: "<i class='fa fa-clock-o'></i> <i>Sancion actualizada...</i>",
                color: "#659265",
                iconSmall: "fa fa-check fa-2x fadeInRight animated",
                timeout: 4000
            });
            $('#frmTipoSancion').modal('hide');
            $('#cod_'+codVisitante).parent('td').parent('tr').remove();
        }
    },
    error: function (res)
    {
        alert("error al guardar la informacion en la base de datos.")
    }
            

});




}

function eliminarSancion(codigo)
{
    
    $.SmartMessageBox({
    title: "Confirmación!",
    content: "Esta seguro que desea eliminar la sacion?",
    buttons: '[No][Si]'
    }, function(ButtonPressed) {

        if (ButtonPressed === "Si") {
            $.ajax({
                    

                url: './includes/sanciones/sancion_model.php?opcion=eliminarSancion',

                datetype: "json",

                type: 'POST',

                data:{IDvisitante:codigo},

                success: function(res) {  
                    if (res === '1') {

                        $.smallBox({

                            title: "Sancion eliminada",

                            content: "<i class='fa fa-clock-o'></i> <i>Sancion eliminada...</i>",

                            color: "#659265",

                            iconSmall: "fa fa-check fa-2x fadeInRight animated",

                            timeout: 4000

                        });


                        location.reload();

                    }


                },
                error: function (res)
                {
                    alert("error al guardar la informacion en la base de datos.")
                }
            });
        }
        if (ButtonPressed === "No") {
        }
    });
            
}   