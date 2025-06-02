<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include("conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id']) || !isset($data['nombre']) || !isset($data['precio'])) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$id = intval($data['id']);
$nombre = mysqli_real_escape_string($connex, $data['nombre']);
$precio = floatval($data['precio']);

$sql = "UPDATE productos SET nombre='$nombre', precio=$precio WHERE id=$id";
if (mysqli_query($connex, $sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error al actualizar producto"]);
}
?>