$(document).ready(function() {
   revisarMenu 
});
function revisarMenu(codigo){
//    alert(codigo);
//    $('#sysMenu').children('li').each(function(){
//        $(this).removeClass('active');
//    });
//    $('#sysMenu').children('li').children('ul').children('li').each(function(){
//        $(this).removeClass('active');
//    });
    $('#'+codigo).addClass('active');
}
function consultaDatosPPL(ppl){
    if(ppl!==''){
            $.ajax({
                url: "busqueda.php?opcion=mostrarDatosPpl",
                type: 'post',
                data:{ppl:ppl},
                success: function(respuesta) {
                    if(respuesta!==''){
                        $('#datosPpl').html(respuesta);
                    }else{
                        $("#datosPpl").val('<p><strong>No existen Datos para este PPL</strong></p>');
                    }
                }
            });
        }else{
            $.smallBox({
                title : "Error..!",
                content : "<i class='icon-remove'></i> <i>Seleccione un PPL</i>",
                color : "#C46A69",
                iconSmall : "fa fa-check fa-2x fadeInRight animated",
                timeout : 4000
            });
        }
}