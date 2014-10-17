<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html lang="es">
        <head>
            <meta charset="utf-8">
            <title> Sysecure </title>
            <meta name="description" content="Automatizacion y Control de Visitas a PPL">
            <meta name="author" content="iBlack Sistemas y Comunicaciones S.A.">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <!-- Basic Styles -->
            <link rel="stylesheet" type="text/css" media="screen" href="css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" media="screen" href="css/font-awesome.min.css">
            <link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-production.min.css">
            <link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-skins.min.css">
            <link rel="stylesheet" type="text/css" media="screen" href="css/generales.css"> 
            <link rel="stylesheet" type="text/css" media="screen" href="css/demo.min.css">
            <!-- page related CSS -->
            <link rel="stylesheet" type="text/css" media="screen" href="css/lockscreen.min.css">
            <!-- FAVICONS -->
            <link rel="shortcut icon" href="img/favicon/favicon.ico" type="image/x-icon">
            <link rel="icon" href="img/favicon/favicon.ico" type="image/x-icon">
            <!-- GOOGLE FONT -->
            <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700">
            <link rel="apple-touch-icon" href="img/splash/sptouch-icon-iphone.png">
            <link rel="apple-touch-icon" sizes="76x76" href="img/splash/touch-icon-ipad.png">
            <link rel="apple-touch-icon" sizes="120x120" href="img/splash/touch-icon-iphone-retina.png">
            <link rel="apple-touch-icon" sizes="152x152" href="img/splash/touch-icon-ipad-retina.png">
            <!-- iOS web-app metas : hides Safari UI Components and Changes Status Bar Appearance -->
            <meta name="apple-mobile-web-app-capable" content="yes">
            <meta name="apple-mobile-web-app-status-bar-style" content="black">
            <!-- Startup image for web apps -->
            <link rel="apple-touch-startup-image" href="img/splash/ipad-landscape.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)">
            <link rel="apple-touch-startup-image" href="img/splash/ipad-portrait.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)">
            <link rel="apple-touch-startup-image" href="img/splash/iphone.png" media="screen and (max-device-width: 320px)">
        </head>
        <body class="desktop-detected pace-done fixed-header fixed-navigation fixed-ribbon smart-style-3">
            
                <form id="Relogin-form" class="lockscreen animated flipInY" action="javascript:Relogin();" autocomplete="off">
				<div class="logo">
					<img src="img/logo/Logo.png" alt="Sysecure">
				</div>
				<div>
                                  
					<div>
						<h1><?php echo $_SESSION["usu_real_nombre"] ?><small><i class="fa fa-lock text-muted"></i> &nbsp;Bloqueado</small></h1>
						<p class="text-muted">
							<a href="mailto:<?php echo $_SESSION["usu_mail"] ?>"><?php echo $_SESSION["usu_mail"] ?></a>
                                                        <input name="usuario" id="usuario" type="hidden" value="<?php echo $usuario ?>">
                                                        <input name="centro" id="centro" type="hidden" value="<?php echo $centro ?>">
						</p>

						<div class="input-group">
							<input class="form-control" type="password" name="password" id="password" placeholder="Password">
							<div class="input-group-btn">
								<button class="btn btn-primary" type="submit">
									<i class="fa fa-key"></i>
								</button>
							</div>
						</div>
						<p class="no-margin margin-top-5">
							Desea Cambiar de Usuario <a href="index.php"> Click aqui</a>
						</p>
					</div>

				</div>
				<p class="font-xs margin-top-5">
					Copyright WieSolutions 2014.
				</p>
			</form>
    </body>
</html>
