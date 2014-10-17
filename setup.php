<?php
$funcion = isset($_GET['opcion']) ? $_GET['opcion'] : 'ninguno';
switch ($funcion) {
    case 'verificaConexion':
        verificaConexion();
        break;
}

function verificaConexion(){
    $db = null;
    $HOST_NAME=$_POST['servidor'];
    $USER_NAME=$_POST['usuario'];
    $USER_PASSWD=$_POST['password'];
    $DB_NAME=$_POST['base'];
    
    $link = mysqli_connect($HOST_NAME, $USER_NAME, $USER_PASSWD,$DB_NAME) or die("Error " . mysqli_error($link)); 
    if($link){
            echo "ok";
            $cnn = new $link;
            $val=$cnn->query("SET NAMES 'utf8'");
    };
}

