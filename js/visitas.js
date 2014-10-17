$(document).ready(function() {
    $('#dt_basic').dataTable();
    $('.knob').knob({
        change: function (value) {
//		            console.log("change : " + value);
        },
        release: function (value) {
            console.log(this.$.attr('value'));
            console.log("release : " + value);
        },
        cancel: function () {
//		            console.log("cancel : ", this);
        }
    });
                    setInterval(function() {
                    var randomnumber = Math.round(Math.random() * 30);
                    knobfunction(randomnumber);
                }, 3000);
    $('.terminarVisita').click(function(){
        $('#terminarVisita').modal('show');
    })
});
function TerminarVisita(){
    $('#terminarVisita').modal('hide');
    $.smallBox({
        title : "Visita terminada",
        content : "<i class='fa fa-clock-o'></i> <i>Finalizada correctamente...</i>",
        color : "#659265",
        iconSmall : "fa fa-check fa-2x fadeInRight animated",
        timeout : 4000
    });
}
function buscarVisita(){
        var codigo=$('#codigoVisitante').val();
        $.ajax({
            url:"includes/visitas.php?funcion=consultadatosVisitante",
            datetype: "json",
            type:'POST',
            data:{codigo:codigo},
            success: function(res) {
                if(res!=='nada'){
                var json_obj = $.parseJSON(res);
//                    var json_obj =res;
         $("#datosVisitante").html('<form id="checkout-form" class="smart-form" novalidate="novalidate">'+
                                        '<fieldset>'+
                                                '<section>'+
                                                        '<img alt="demo user" src="'+json_obj.datosPersonales.VIS_IMAGEN+'" style="width: 139px;">'+
                                                '</section>'+
                                        '</fieldset>'+ 
                                        '<fieldset>'+
                                                '<section>'+
                                                    '<label class="label">Nombre</label>'+
                                                    '<label class="input">'+
                                                        '<i class="icon-prepend fa fa-user"></i>'+
                                                        '<input type="text" name="codigoVisita" id="codigoVisita" value="'+json_obj.datosPersonales.VIS_COD+'">'+
                                                        '<input type="text" placeholder="First name" name="fname" value="'+json_obj.datosPersonales.VIS_NOMBRE+'">'+
                                                    '</label>'+
                                                '</section>'+
                                                '<section>'+
                                                    '<label class="label">Apellido</label>'+
                                                    '<label class="input">'+
                                                        '<i class="icon-prepend fa fa-user"></i>'+
                                                        '<input type="text" placeholder="First name" name="fname" value="'+json_obj.datosPersonales.VIS_APELLIDO+'">'+
                                                    '</label>'+
                                                '</section>'+
                                                '<section>'+
                                                    '<label class="label">Parentesco</label>'+
                                                    '<label class="input">'+
                                                        '<i class="icon-prepend fa fa-user"></i>'+
                                                        '<input type="text" placeholder="First name" name="fname" value="'+json_obj.datosPersonales.PAR_DESCRIPCION+'">'+
                                                    '</label>'+
                                                '</section>'+
                                        '</fieldset>'+    
                                        '<fieldset>'+
                                                '<section>'+
                                                    '<label class="label">Cédula</label>'+
                                                    '<label class="input">'+
                                                        '<i class="icon-prepend fa fa-lock"></i>'+
                                                        '<input type="text" placeholder="First name" name="fname" value="'+json_obj.datosPersonales.VIS_CEDULA+'">'+
                                                    '</label>'+
                                                '</section>'+
                                                '<section>'+
                                                    '<label class="label">Teléfono</label>'+
                                                    '<label class="input">'+
                                                        '<i class="icon-prepend fa fa-phone"></i>'+
                                                        '<input type="text" placeholder="First name" name="fname" value="'+json_obj.datosPersonales.VIS_TELEFONO+'">'+
                                                    '</label>'+
                                                '</section>'+
                                        '</fieldset>'+
                                        '<fieldset>'+
                                                '<section>'+
                                                    '<label class="label">Dirección</label>'+
                                                    '<label class="input" for="address2">'+
                                                        '<i class="icon-append fa fa-tag"></i>'+
                                                        '<input id="address2" type="text" placeholder="Address" name="address2" value="'+json_obj.datosPersonales.VIS_DIRECCION+'">'+
                                                    '</label>'+
                                                '</section>'+
                                                '<section>'+
                                                    '<label class="label">E-mail</label>'+
                                                    '<label class="input">'+
                                                        '<i class="icon-append fa fa-envelope-o"></i>'+
                                                        '<input type="text" placeholder="Correo Electronico" name="fname" value="'+json_obj.datosPersonales.VIS_CORREO+'">'+
                                                    '</label>'+
                                                '</section>'+
                                        '</fieldset>'+    
                                    '</form>');
$("#datosPpl").html('<form id="checkout-form" class="smart-form" novalidate="novalidate">'+
                                        '<fieldset>'+
                                                '<section>'+
                                                        '<img alt="demo user" src="'+json_obj.datosPpl.PPL_IMG+'" style="width: 139px;">'+
                                                '</section>'+
                                        '</fieldset>'+ 
                                        '<fieldset>'+
                                                '<section>'+
                                                    '<label class="label">Nombre</label>'+
                                                    '<label class="input">'+
                                                        '<i class="icon-prepend fa fa-user"></i>'+
                                                        '<input type="text" name="codigoPpl" id="codigoPpl" value="'+json_obj.datosPpl.PPL_COD+'">'+
                                                        '<input type="text" placeholder="First name" name="fname" value="'+json_obj.datosPpl.PPL_NOMBRE+'">'+
                                                    '</label>'+
                                                '</section>'+
                                                '<section>'+
                                                    '<label class="label">Apellido</label>'+
                                                    '<label class="input">'+
                                                        '<i class="icon-prepend fa fa-user"></i>'+
                                                        '<input type="text" placeholder="First name" name="fname" value="'+json_obj.datosPpl.PPL_APELLIDO+'">'+
                                                    '</label>'+
                                                '</section>'+
                                                '<section>'+
                                                    '<label class="label">Cédula</label>'+
                                                    '<label class="input">'+
                                                        '<i class="icon-prepend fa fa-lock"></i>'+
                                                        '<input type="text" placeholder="First name" name="fname" value="'+json_obj.datosPpl.PPL_CEDULA+'">'+
                                                    '</label>'+
                                                '</section>'+
                                        '</fieldset>'+    
                                        '<fieldset>'+
                                            '<section>'+
                                                    '<label class="label">Centro</label>'+
                                                    '<label class="input">'+
                                                        '<i class="icon-prepend fa fa-lock"></i>'+
                                                        '<input type="text" placeholder="First name" name="fname" value="'+json_obj.datosPpl.CEN_DESCRIPCION+'">'+
                                                    '</label>'+
                                                '</section>'+
                                            '<section>'+
                                                    '<label class="label">Pabellon</label>'+
                                                    '<label class="input">'+
                                                        '<i class="icon-prepend fa fa-lock"></i>'+
                                                        '<input type="text" placeholder="First name" name="fname" value="'+json_obj.datosPpl.PAB_DESCRIPCION+'">'+
                                                    '</label>'+
                                            '</section>'+
                                        '</fieldset>'+    
                                    '</form>');
            }
        }
        });
    };
function registraVisita(){
    var codigoVisita=$('#codigoVisita').val();
    var codigoppl=$('#codigoPpl').val();
//    $.ajax({
//            url:"includes/visitas.php?funcion=registraVisitante",
//            datetype: "json",
//            type:'POST',
//            data:{codigoVisita:codigoVisita,codigoppl:codigoppl},
//            success: function(res) {
//                if(res!=='nada'){
                    $('#nuevaVisita').modal('hide');
                    $.smallBox({
                        title : "Visita Registrada",
                        content : "<i class='fa fa-clock-o'></i> <i>Usted agrego la visita correctamente...</i>",
                        color : "#659265",
                        iconSmall : "fa fa-check fa-2x fadeInRight animated",
                        timeout : 4000
                    });
                    location.reload();
//                }
//            }
//        });
            
}    
function knobfunction(value1){
    $('.knob').val(value1).trigger('change');
}