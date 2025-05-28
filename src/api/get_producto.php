<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include("conexion.php");

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$sql = "SELECT id, nombre, descripcion, precio, img, tipo FROM productos WHERE id = $id";
$result = mysqli_query($connex, $sql);

if ($result && mysqli_num_rows($result) > 0) {
    $producto = mysqli_fetch_assoc($result);
    $producto['img'] = "http://192.168.1.34/img/" . $producto['img'];

    echo json_encode([
        "success" => true,
        "data" => $producto
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Producto no encontrado"
    ]);
}
