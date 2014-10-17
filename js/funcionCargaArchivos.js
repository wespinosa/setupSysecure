$(document).ready(function(){
    
    //queremos que esta variable sea global
    var fileExtension = "";
    var title, message, opts, container;
    opts = {};
    opts.classes = ['smokey'];
    opts.classes.push("slide");
        opts.hideStyle = {
                opacity: 0,
                left: "400px"
        };
        opts.showStyle = {
                opacity: 1,
                left: 0
        };
     container = '#freeow-tr';
     //función que observa los cambios del campo file y obtiene información
    //FILE PEQUEÑO
    $('#filem').change(function(){
        //obtenemos un array con los datos del archivo
        var file = $("#filem")[0].files[0];
        //obtenemos el nombre del archivo
        var fileName = file.name;
        //obtenemos la extensión del archivo
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        //obtenemos el tamaño del archivo
        var fileSize = file.size;
        //obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type;
        //mensaje con la información del archivo
//        title = 'Información del Archivo';
//        message = "Archivo para subir: "+fileName+", peso total: "+fileSize+" bytes.";
//        opts.classes.push("pushpin");
//        if(isImage(fileExtension)){
//                    $(container).freeow(title, message, opts);
//                }
    });
    //al enviar el formulario
    $('#cargar_img_m').click(function(){
        //información del formulario
        var formData = new FormData($(".formulario_m")[0]);
        var message = "";    
        //hacemos la petición ajax  
        $.ajax({
            url: 'includes/upload_archivos.php?funcion=subirmediano',  
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,
            processData: false,
            progress: alert("hola"),
            //mientras enviamos el archivo
            beforeSend: function(){
                alertaEnProceso("Espere... estamos copiando sus documentos");
            },
            //una vez finalizado correctamente
            success: function(data){
               alertaSatisfactoria("Archivos Subidos Correctamente")
                $(".elimina_archivom").hide();
                $(".archivo_subidom").show();
                $("#cargar_img_m").hide();
            },
            //si ha ocurrido un error
            error: function(){
                 alertify.error("Error..!  Ocurrio un error al subir el archivo..."); 
            }
        });
    });
    //función que observa los cambios del campo file y obtiene información
    //FILE MEDIANO
    $('#filel').change(function(){
        //obtenemos un array con los datos del archivo
        var file = $("#filel")[0].files[0];
        //obtenemos el nombre del archivo
        var fileName = file.name;
        //obtenemos la extensión del archivo
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        //obtenemos el tamaño del archivo
        var fileSize = file.size;
        //obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type;
        //mensaje con la información del archivo
//        title = 'Información del Archivo';
//        message = "Archivo para subir: "+fileName+", peso total: "+fileSize+" bytes.";
//        opts.classes.push("pushpin");
//        if(isImage(fileExtension)){
//                    $(container).freeow(title, message, opts);
//                }
    });
    //al enviar el formulario
    $('#cargar_img_l').click(function(){
        //información del formulario
        var formData = new FormData($(".formulario_l")[0]);
        var message = "";    
        //hacemos la petición ajax  
        $.ajax({
            url: 'includes/upload_archivos.php?funcion=subirgrande',  
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,
            processData: false,
            //mientras enviamos el archivo
             beforeSend: function(){
                alertaEnProceso("Espere... estamos copiando sus documentos");
            },
            //una vez finalizado correctamente
            success: function(data){
                alertaSatisfactoria("Archivos Subidos Correctamente")
                $(".elimina_archivol").hide();
                $(".archivo_subidol").show();
                $("#cargar_img_l").hide();
            },
            //si ha ocurrido un error
            error: function(){
                 alertify.error("Error..!  Ocurrio un error al subir el archivo..."); 
            }
        });
    });
    //función que observa los cambios del campo file y obtiene información
    //FILE GRANDE
    $('#filel').change(function(){
        //obtenemos un array con los datos del archivo
        var file = $("#filel")[0].files[0];
        //obtenemos el nombre del archivo
        var fileName = file.name;
        //obtenemos la extensión del archivo
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        //obtenemos el tamaño del archivo
        var fileSize = file.size;
        //obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type;
        //mensaje con la información del archivo
//        title = 'Información del Archivo';
//        message = "Archivo para subir: "+fileName+", peso total: "+fileSize+" bytes.";
//        opts.classes.push("pushpin");
//        if(isImage(fileExtension)){
//                    $(container).freeow(title, message, opts);
//                }
    });
    //al enviar el formulario
    $('#cargar_img_xl').click(function(){
        //información del formulario
        var formData = new FormData($(".formulario_xl")[0]);
        //hacemos la petición ajax  
        $.ajax({
            url: 'includes/upload_archivos.php?funcion=subirextragrande',  
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function(){
                alertaEnProceso("Espere... estamos copiando sus documentos");
            },
            success: function(data){
                var json_obj = $.parseJSON(data); 
               
                if ($('#list_imagenes_subidas').length===0){
                    $("#tabs-2").append("<form id='list_imagenes_subidas' name='archi_form'><h4>Imagenes creadas y subidas<h4><div class='visor_interno_Imagenes'></div></form>"); 
                }
                $("#listxl").fadeOut(600);
                for (i=0; i<json_obj.imagenes.length;i++){
                    if ( document.getElementById( json_obj.imagenes[i].imgxlT )) {
                        $("#"+json_obj.imagenes[i].imgxlT).remove();
                        $("#"+json_obj.imagenes[i].imgmT).remove();
                        $("#"+json_obj.imagenes[i].imglT).remove();
                        var objt= "nocache="+ (new Date()).getTime();
                      }
                        $(".visor_interno_Imagenes").append("<div class='cont_img' id='"+json_obj.imagenes[i].imgxlT+"'><img id='"+json_obj.imagenes[i].imgxlT+"' class='img_muestra_xl img-thumbnail ' title='Imagen Extra Grande' src='"+json_obj.imagenes[i].imgxl+"?"+objt+"'><p>Imagen Extra Grande</p></div>"+
                                                                "<div class='cont_img' id='"+json_obj.imagenes[i].imgmT+"'><img id='"+json_obj.imagenes[i].imgmT+"' class='img_muestra_l img-thumbnail' title='Imagen Grande' src='"+json_obj.imagenes[i].imgl+"?"+objt+"'><p>Imagen Grande</p></div>"+
                                                                "<div class='cont_img' id='"+json_obj.imagenes[i].imglT+"'><img id='"+json_obj.imagenes[i].imglT+"' class='img_muestra_m img-thumbnail' title='Imagen Mediana' src='"+json_obj.imagenes[i].imgm+"?"+objt+"'><p>Imagen Normal</p></div>");
                } 
                alertaSatisfactoria("Archivos Subidos Correctamente")
                $(".elimina_archivoxl").hide();
                $(".archivo_subidoxl").show();
                $("#cargar_img_xl").hide();
            },
            error: function(){
                 alertify.error("Error..!  Ocurrio un error al subir el archivo..."); 
            }
        });
    });
    //función que observa los cambios del campo file y obtiene información
    //FILE PLANO
    $('#fileplano').change(function(){
        //obtenemos un array con los datos del archivo
        var file = $("#fileplano")[0].files[0];
        //obtenemos el nombre del archivo
        var fileName = file.name;
        //obtenemos la extensión del archivo
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        //obtenemos el tamaño del archivo
        var fileSize = file.size;
        //obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type;
       
    });
    //al enviar el formulario
    $('#cargar_img_plano').click(function(){
        //información del formulario
        var formData = new FormData($(".formulario_plano")[0]);
        var message = "";    
        //hacemos la petición ajax  
        $.ajax({
            url: 'includes/upload_archivos.php?funcion=subirplano',  
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,
            processData: false,
            //mientras enviamos el archivo
             beforeSend: function(){
                alertaEnProceso("Espere... estamos copiando sus documentos");
            },
            //una vez finalizado correctamente
            success: function(img){
                if ($('#list_imagenes_subidas').length===0){
                    $("#tabs-2").append("<form id='list_imagenes_subidas' name='archi_form'><h4>Imagenes creadas y subidas<h4><div class='visor_interno_Imagenes'></div></form>"); 
                }
                $("#listplano").fadeOut(600);
                if ( document.getElementById( "img_plano" )) {
                        $("#img_plano").remove();
                        var objt= "nocache="+ (new Date()).getTime();
                      }
                $(".visor_interno_Imagenes").append("<div class='cont_img' id='img_plano'><img class='img_muestra_xl img-thumbnail' title='Plano de Dimensiones' src='"+img+"?"+objt+"'><p>Plano de Dimensiones</p></div>");
                alertaSatisfactoria("Archivos Subidos Correctamente");
                $(".elimina_archivopla").hide();
                $(".archivo_subidopla").show();
                $("#cargar_img_plano").hide();
            },
            //si ha ocurrido un error
            error: function(){
                 alertify.error("Error..!  Ocurrio un error al subir el archivo..."); 
            }
        });
    });
    //función que observa los cambios del campo file y obtiene información
    $('#cargar_img_adi').click(function(){
        var i = 0, file,reader,nombre;
        var formdata = new FormData();
        var input = document.getElementById('imgadi').files;
        var len=input.length;
            for( ; i < len; i++){
                file = input[i];
                    //Si el navegador soporta el objeto FileReader
                    if(window.FileReader){
                        reader = new FileReader();
                        reader.readAsDataURL(file);
                    }
                    if(formdata){
                        formdata.append('imgadi[]', file);
                    }
            }
        //hacemos la petición ajax  
//        console.log(file);
//        debugger;
        $.ajax({
            url: 'includes/upload_archivos.php?funcion=subiradi',  
            type: 'POST',
            // Form data
            //datos del formulario
            data: formdata,
            //necesario para subir archivos via ajax
            datetype: "json",
            cache: false,
            contentType: false,
            processData: false,
            //mientras enviamos el archivo
            beforeSend: function(){
                alertaEnProceso("Espere... estamos copiando sus documentos");
            },
            //una vez finalizado correctamente
            success: function(data){
                var json_obj = $.parseJSON(data); 
                if ($('#list_imagenes_subidas').length===0){
                    $("#tabs-2").append("<form id='list_imagenes_subidas' name='archi_form'><h4>Planos subidos<h4><div class='visor_interno_Imagenes'></div></form>"); 
                }
                $("#listAdi").fadeOut(600);
                for (i=0; i<json_obj.imagenes.length;i++){
                    //$(".visor_interno_Imagenes").append("<div class='cont_img'><img class='img_muestra_xl img-thumbnail' title='Imagenes Extra' src='"+json_obj.imagenes[i].pthimgv+"'><p>"+json_obj.imagenes[i].titimgv+"</p></div>");
                    $(".visor_interno_Imagenes").append("<div class='cont_imgd' id='img_plano'><div id='elimina_archivo' class='elimina_archivo'>"+
                        "<img class='imgd_elimina' title='Eliminar imagen' src='img/error.png'></div><img class='img_muestra_xl img-thumbnail' title='Imágenes Extra' src='"+json_obj.imagenes[i].pthimgv+"'><p>"+json_obj.imagenes[i].titimgv+"</p></div>");  
//                    
                }   
                
                alertaSatisfactoria("Archivos Subidos Correctamente");
                //$(".elimina_archivo").hide();
                $(".archivo_subido").show();
                $("#cargar_img_adi").hide();
            },
            //si ha ocurrido un error
            error: function(){
                 alertify.error("Error..!  Ocurrio un error al subir el archivo..."); 
            }
        });
    });
    //FILE DOCUMENTOS
    //al enviar el formulario
    $('#cargar_img_doc').click(function(){
        //información del formulario
//        var len = $("#file_doc").files.length;
        var i = 0, file,reader,nombre,formdata = false;;
        var input = document.getElementById('file_doc').files;
        $('.nombre_doc').each(function(i) {
                    nombre += '.'+$(this).val();
                  });
        
        formdata = new FormData();
        var len=input.length;
        
            for( ; i < len; i++){
                file = input[i];
                    //Si el navegador soporta el objeto FileReader
                    if(window.FileReader){
                        reader = new FileReader();
                        reader.readAsDataURL(file);
                    }
                    //Si existe una instancia de FormData
                    if(formdata){
                        formdata.append('file_doc[]', file);
                        formdata.append('nombre_doc', nombre);
                    }
            }
        var message = "";    
        //hacemos la petición ajax  
//        console.log(file);
//        debugger;
        $.ajax({
            url: 'includes/upload_archivos.php?funcion=subirdoc',  
            type: 'POST',
            // Form data
            //datos del formulario
            data: formdata,
            //necesario para subir archivos via ajax
            datetype: "json",
            cache: false,
            contentType: false,
            processData: false,
            //mientras enviamos el archivo
            beforeSend: function(){
                alertaEnProceso("Espere... estamos copiando sus documentos");
            },
            //una vez finalizado correctamente
            success: function(data){
                var json_obj = $.parseJSON(data); 
                if ($('#list_archivos_subidos').length===0){
                    $("#tabs-3").append("<form id='list_archivos_subidos' name='archi_form'><h4>Planos subidos<h4></form>"); 
                }
                $(".visor_archivos").fadeOut(600);
                for (i=0; i<json_obj.adjunto.length;i++){
                    var valUno=json_obj.adjunto[i].idenpln;
                    if ($('.'+valUno).length===0){
                        $("#list_archivos_subidos").append("<div class='visor_interno_archivos'><div class="+valUno+"><div id='elimina_archivo' class='elimina_archivo'>"+
                                    "<img class='img_elimina_plano' title='Eliminar archivo' src='img/error.png'></div><p class='logoPdf'></p>"+
                                    "<div class='datos_archivo_subido'><strong><p class='datos_subido'>"+json_obj.adjunto[i].nompln+"</p></strong>"+
                                                                "<p class='datos_subido'>"+json_obj.adjunto[i].titpln+"</p></div></div>");
                    }
                    
                }   
                 $(".logoPdf").click(function(e) {
                        var visualizarPdf=$(this).siblings("div").children("p").text();
                        
                        window.open("uploads/archivos/"+visualizarPdf+"", "", "toolbar=0");
                        e.preventDefault();
                    });
                alertaSatisfactoria("Archivos Subidos Correctamente")
                $(".elimina_archivo").hide();
                $(".archivo_subido").show();
                $("#cargar_img_doc").hide();
            },
            //si ha ocurrido un error
            error: function(){
                 alertify.error("Error..!  Ocurrio un error al subir el archivo..."); 
            }
        });
    });
    
    
    
    //DOCUMENTOS MASIVOS
    //al enviar el formulario
    $('#ms_cargar_img_doc').click(function(){
        //información del formulario
//        var len = $("#file_doc").files.length;+
        var i = 0, file,reader,nombre,formdata = false;;
        var input = document.getElementById('file_mas').files;
        formdata = new FormData();
        var len=input.length;
            for( ; i < len; i++){
                file = input[i];
                    //Si el navegador soporta el objeto FileReader
                    if(window.FileReader){
                        reader = new FileReader();
                        reader.readAsDataURL(file);
                    }
                    //Si existe una instancia de FormData
                    if(formdata){
                        formdata.append('file_mas[]', file);
                    }
            }
        var message = "";    
        $.ajax({
            url: 'includes/upload_archivos.php?funcion=subirdocMas',  
            type: 'POST',
            data: formdata,
            datetype: "json",
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function(){
                alertaEnProceso("Espere... estamos copiando sus documentos");
            },
            success: function(data){
                var obj = $.parseJSON(data);
                 var migrados=obj.Sub.length;
                 var nomigrado=obj.Doc.length;
                 if(nomigrado>1){
                    var retval ='<div class="nomNoCargados"><ul>';
                    for (i=1; i<nomigrado; i++){
                        retval +='<li><div>'+obj.Doc[i].nomArchivo+'</div></li>';
                    }
                    retval +='</ul></div>';
                    $("#dialog-archivosNoCargados").append(retval);
                    $( "#dialog-archivosNoCargados" ).dialog( "open" );
                 }
                if(migrados>1){
                    alertaSatisfactoria("<strong>"+(migrados-1)+"</strong> Archivos Reemplazados Correctamente..!")
                    
                }else{
                    alertaError("<strong>Ningun</strong> Archivo Reemplazado..!")
                }
                
            },
            //si ha ocurrido un error
            error: function(){
                 alertaError("Ocurrio un error al subir el archivo..."); 
            }
        });
    });
})

//comprobamos si el archivo a subir es una imagen
//para visualizarla una vez haya subido
function isImage(extension){
    switch(extension.toLowerCase())
    {
        case 'jpg': case 'gif': case 'png': case 'jpeg':
            return true;
        break;
        default:
            return false;
        break;
    }
}
function alertaSatisfactoria(mensaje){
    $.smallBox({
            title : mensaje,
            content : "<i class='fa fa-star-o'></i>",
            color : "#659265",
            iconSmall : "fa fa-check fa-2x fadeInRight animated",
            timeout : 3000
    });
}
function alertaEnProceso(mensaje){
    $.smallBox({
            title : mensaje,
            content : "<i class='fa fa-clock-o'></i>",
            color : "#151515",
            iconSmall : "fa fa-clock fa-2x fadeInRight animated",
            timeout : 3000
    });
}
function alertaError(mensaje){
    $.smallBox({
            title : mensaje,
            content : "<i class='fa fa-clock-o'></i>",
            color : "#C46A69",
            iconSmall : "fa fa-times fa-2x fadeInRight animated",
            timeout : 3000
    });
}