<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include("conexion.php");

$data = json_decode(file_get_contents("php://input"), true);
$id_user = intval($data['userId']);

$sql = "DELETE FROM carrito WHERE id_user = $id_user AND estado = 'pendiente'";
$success = mysqli_query($connex, $sql);

if ($success) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "No se pudo vaciar el carrito"]);
}