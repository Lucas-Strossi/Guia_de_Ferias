<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'guia_ferias';

try{
    $con = new mysqli($host, $user, $pass, $db);
    $con->set_charset("utf8mb4");
}
catch (mysqli_sql_exception $e){
    error_log("Erro na conexão com o banco: " . $e->getMessage());
    exit("Erro interno ao conectar ao banco de dados. Tente novamente mais tarde.");
}
?>