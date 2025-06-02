<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include("conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (
    !$data ||
    !isset($data['nombre']) ||
    !isset($data['precio']) ||
    !isset($data['descripcion']) ||
    !isset($data['img']) ||
    !isset($data['tipo'])
) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$nombre = mysqli_real_escape_string($connex, $data['nombre']);
$precio = floatval($data['precio']);
$descripcion = mysqli_real_escape_string($connex, $data['descripcion']);
$tipo = mysqli_real_escape_string($connex, $data['tipo']);
$img = ""; // Valor por defecto para img

$sql = "INSERT INTO productos (nombre, precio, descripcion, img, tipo) VALUES ('$nombre', $precio, '$descripcion', '$img', '$tipo')";
if (mysqli_query($connex, $sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error al agregar producto",
        "error" => mysqli_error($connex)
    ]);
}
?>