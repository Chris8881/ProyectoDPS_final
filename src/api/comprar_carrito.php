<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include("conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['userId'])) {
    echo json_encode(["success" => false, "message" => "Falta userId"]);
    exit;
}

$userId = intval($data['userId']);
// Cambia 'carrito' y 'estado' por los nombres reales de tu tabla y columna
$sql = "UPDATE carrito SET estado='comprado' WHERE user_id=$userId AND estado='pendiente'";
if (mysqli_query($connex, $sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => mysqli_error($connex)]);
}
?>