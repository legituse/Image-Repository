<?php
include_once '../configs/DBConnection.php';

header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    return 0;
}

$data = json_decode(file_get_contents("php://input"));


if (!isset($data->usr) || !isset($data->pwd)){
    http_response_code(400);
    echo json_encode(array("message" => "Invalid Parameters"));
    exit;
}

if (strlen($data->usr) <=5 || strlen($data->pwd) <=5 ){
    http_response_code(400);
    echo json_encode(array("message" => "Invalid Parameters Values"));
    exit;
}

$database = new DBConn();
$conn = $database->getConn();

$sql = "INSERT INTO " . 'userinfo' . " (username,password,permissions) VALUES (?,?,?)";
$query = $conn->prepare($sql);

$password_hash = password_hash($data->pwd, PASSWORD_BCRYPT);
$serialize_perms = serialize(array("User"));
$query->bind_param("sss",$data->usr,$password_hash,$serialize_perms);


if($query->execute()){
    http_response_code(200);
    echo json_encode(array("message" => "User was successfully registered."));
}
else{
    http_response_code(400);
    echo json_encode(array("message" => "Unable to register the user."));
}

