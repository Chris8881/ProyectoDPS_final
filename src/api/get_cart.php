<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include("conexion.php");

// Lee el body y verifica que existan datos
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["success" => false, "message" => "No se recibieron datos"]);
    exit;
}

$id_user = intval($data['userId']);

$sql = "SELECT c.id_producto as id, p.nombre, p.precio, p.img, c.cantidad, c.talla
        FROM carrito c
        JOIN productos p ON c.id_producto = p.id
        WHERE c.id_user = $id_user AND c.estado = 'pendiente'";
$result = mysqli_query($connex, $sql);

$cart = [];
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $row['img'] = "http://192.168.1.33/ProyectoDPS_final/img/" . $row['img'];
        $cart[] = $row;
    }
    echo json_encode([
        "success" => true,
        "cart" => $cart
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error en la consulta"
    ]);
}