<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include("conexion.php");

$data = json_decode(file_get_contents("php://input"), true);
$id_user = intval($data['userId']);
$id_producto = intval($data['productId']);
$cantidad = intval($data['quantity']);
$talla = isset($data['talla']) ? $data['talla'] : '';
$estado = 'pendiente';

// Verifica si ya existe el producto en el carrito pendiente
$sql_check = "SELECT * FROM carrito WHERE id_user = $id_user AND id_producto = $id_producto AND estado = 'pendiente'";
$result = mysqli_query($connex, $sql_check);

if ($result && mysqli_num_rows($result) > 0) {
    // Si existe, actualiza la cantidad
    $sql_update = "UPDATE carrito SET cantidad = cantidad + $cantidad WHERE id_user = $id_user AND id_producto = $id_producto AND estado = 'pendiente'";
    $success = mysqli_query($connex, $sql_update);
} else {
    // Si no existe, inserta nuevo
    $sql_insert = "INSERT INTO carrito (id_producto, id_user, cantidad, talla, estado) VALUES ($id_producto, $id_user, $cantidad, '$talla', '$estado')";
    $success = mysqli_query($connex, $sql_insert);
}

if ($success) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error al agregar al carrito"]);
}