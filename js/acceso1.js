$(document).ready(function() {
    var dtTable =$('#listaAcceso1').dataTable({
        "bServerSide": true,
        "sAjaxSource": "./includes/controles/acceso1/acceso1_dataTable.php",
        "oLanguage": {
            "sEmptyTable": "No hay datos disponibles en la tabla",
            "sInfo": "Existen _TOTAL_ registros en total, mostrando (_START_ a _END_)",
            "sInfoEmpty": "No hay entradas para mostrar",
            "sInfoFiltered": " - Filtrado de registros _MAX_",
//            "sSearch": "Buscar: ",
            "sZeroRecords": "No hay registros que mostrar"
        }
    });
    $('#listaAcceso1_filter').append( '<label><a href="#" id="buscar" class="btn btn-default">Buscar</a></label>' );
    $('#listaAcceso1_filter').append( '<label><a href="#" id="reset" class="btn btn-default">Reset</a></label>' );
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
});

function revisarVisitantesAsignados(codPpl,op){
    $.ajax({
            url: "./includes/controles/acceso1/acceso1_model.php?opcion=obtenerVisitantesAsignados",
            type: 'post',
            data: {codPpl: codPpl},
            success: function(respuesta) {
                $('#tablaVisitantes').html(respuesta);
                if(op===1)
                    $('#frmVisitasModal').modal('show');
            }
        });
}
function permitirAccesoVisitante(codVisita,nomVisita,horario){
    $.ajax({
            url: "./includes/controles/acceso1/acceso1_model.php?opcion=permitirAccesoVisitante",
            type: 'post',
            data: {codVisita: codVisita,horario:horario},
            success: function(respuesta) {
                switch (respuesta){
                    case '0':
                        $.smallBox({
                            title: "Error..!!",
                            content: "<i class='fa fa-clock-o'></i> <i>Problemas con la Base de datos con sulte con el Administrados; codigo AC1MODEL_L48</i>",
                            color: "#C46A69",
                            iconSmall: "fa fa-times fa-2x fadeInRight animated",
                            timeout: 6000
                        });
                    break;
                    case '1':
                        $('#frmVisitasModal').modal('hide');
                        $.smallBox({
                            title: nomVisita+" Autorizado",
                            content: "<i class='fa fa-clock-o'></i> <i>"+nomVisita+" fue autorizado el Ingreso...</i>",
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 4000
                        });
                    break;
                    case '2':
                        $.smallBox({
                                title : nomVisita+" ya Ingresado",
                                content : nomVisita+" se encuentra ya Autorizado para el Ingreso",
                                color : "#3276B1",
                                timeout: 8000,
                                icon : "fa fa-bell swing animated",
                        });
                    break;
                    
                }
            }
        });
}