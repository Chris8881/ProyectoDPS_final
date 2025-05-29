<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include("conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['user']) || !isset($data['email']) || !isset($data['pass'])) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$user = mysqli_real_escape_string($connex, $data['user']);
$email = mysqli_real_escape_string($connex, $data['email']);
$pass = mysqli_real_escape_string($connex, $data['pass']);
$rol = 'user';

// Verifica si el correo ya existe
$sql_check = "SELECT id FROM usuarios WHERE email = '$email'";
$result = mysqli_query($connex, $sql_check);

if ($result && mysqli_num_rows($result) > 0) {
    echo json_encode(["success" => false, "message" => "El correo ya está registrado"]);
    exit;
}

// Inserta el nuevo usuario
$sql = "INSERT INTO usuarios (user, email, pass, rol) VALUES ('$user', '$email', '$pass', '$rol')";
if (mysqli_query($connex, $sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error al registrar"]);
}