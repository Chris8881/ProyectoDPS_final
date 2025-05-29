<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include("conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['email']) || !isset($data['pass'])) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$email = mysqli_real_escape_string($connex, $data['email']);
$pass = mysqli_real_escape_string($connex, $data['pass']);

$sql = "SELECT id, user, email, rol FROM usuarios WHERE email = '$email' AND pass = '$pass'";
$result = mysqli_query($connex, $sql);

if ($result && mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);
    echo json_encode(["success" => true, "user" => $user]);
} else {
    echo json_encode(["success" => false, "message" => "Credenciales incorrectas"]);
}