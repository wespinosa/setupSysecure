function busquedas(){
    var valBusqueda = $('#search-visitante').val();
    if (valBusqueda !== '') {
        $.ajax({
            url: './includes/busquedas/busquedas_vistas.php?opcion=frm_busquedasGenerales',
            datetype: "json",
            type: 'POST',
            data: {valBusqueda:valBusqueda},
            success: function(res) {
//                if (res === '1') {
                    $('#content').html(res);
//                }
            }
        });
    }
}

