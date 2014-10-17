$(document).ready(function() {
    pageSetUp();
    //Bootstrap Wizard Validations
    var $validator = $("#wizard-1").validate({
        rules: {
            servidor: {
                required: true
            },
            usuario: {
                required: true
            }
        },
        highlight: function(element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $('#bootstrap-wizard-1').bootstrapWizard({
        'tabClass': 'form-wizard',
        'onNext': function(tab, navigation, index) {
            var $valid = $("#wizard-1").valid();
            if (!$valid) {
                
                $validator.focusInvalid();
                return false;
            } else {
                switch (index){
                    case 1:
                        var servidor=$('#servidor').val();
                        var usuario=$('#usuario').val();
                        var password=$('#password').val();
                        var base=$('#base').val();
                        $.ajax({
                            url: "./setup.php?opcion=verificaConexion",
                            type: 'post',
                            data: {servidor: servidor,usuario:usuario,password:password,base:base},
                            success: function(resultado) {
                                alert(resultado);
                                console.log(resultado);
                            },error:function(resultado){
                                console.log(resultado);
                            }
                            
                        });
                        $('#bootstrap-wizard-1').find('.form-wizard').children('li').eq(index - 1).addClass('complete');
                        $('#bootstrap-wizard-1').find('.form-wizard').children('li').eq(index - 1).find('.step').html('<i class="fa fa-check"></i>');
                        break;
                    case 2:
                        console.log('Segunda bien panas');
                        break;
                    case 3:
                        console.log('Tercera bien panas');
                        break;
                }
                
            }
        }
    });


//    // fuelux wizard
//    var wizard = $('.wizard').wizard();
//
//    wizard.on('finished', function(e, data) {
//        //$("#fuelux-wizard").submit();
//        //console.log("submitted!");
//        $.smallBox({
//            title: "Congratulations! Your form was submitted",
//            content: "<i class='fa fa-clock-o'></i> <i>1 seconds ago...</i>",
//            color: "#5F895F",
//            iconSmall: "fa fa-check bounce animated",
//            timeout: 4000
//        });
//
//    });


})


