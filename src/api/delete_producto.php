<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include("conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id'])) {
    echo json_encode(["success" => false, "message" => "ID no recibido"]);
    exit;
}

$id = intval($data['id']);

$sql = "DELETE FROM productos WHERE id=$id";
if (mysqli_query($connex, $sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error al eliminar producto"]);
}
?>