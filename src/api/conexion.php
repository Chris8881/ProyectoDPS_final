<?php
$host = "localhost";
$user = "root";
$password = "";
$db = "ferreteriawilly";

$connex = new mysqli($host, $user, $password, $db);

if ($connex->connect_error) {
    die("Conexión fallida: " . $connex->connect_error);
}
?>
