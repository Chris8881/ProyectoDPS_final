<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include("conexion.php");

$sql = "SELECT id, nombre, descripcion, precio,  img, tipo FROM productos";
$result = mysqli_query($connex, $sql);

$productos = [];

while ($row = mysqli_fetch_assoc($result)) {
    $row['img'] = "http://192.168.1.34/ProyectoDPS_final/img/" . $row['img']; // ruta completa
    $productos[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $productos
]);
