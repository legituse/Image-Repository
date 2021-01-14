<?php

include_once '../configs/DBConnection.php';
require "../vendor/autoload.php";
use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
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
}


$database = new DBConn();
$conn = $database->getConn();

$sql = "SELECT id, password FROM " . 'userinfo' . " WHERE username = ? LIMIT 0,1";

$query = $conn->prepare($sql);
$query->bind_param("s", $data->usr);
$query->execute();
$query->store_result();
$query->bind_result($id,$password);

$num = $query->num_rows;
if($num > 0){
    $row = $query->fetch();
    if(password_verify($data->pwd, $password))
    {
        $secret_key = "verysecret123";
        $issuer_claim = "imagerepo"; // this can be the servername
        $audience_claim = "Users";
        $issuedat_claim = time(); // issued at
        $notbefore_claim = $issuedat_claim + 2; //not before in seconds
        $expire_claim = $issuedat_claim + 600; // expire time in seconds
        $token = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            "iat" => $issuedat_claim,
            "nbf" => $notbefore_claim,
            "exp" => $expire_claim,
            "data" => array(
                "id" => $id,
                "username" => $data->usr
            ));

        http_response_code(200);

        $jwt = JWT::encode($token, $secret_key);
        echo json_encode(
            array(
                "message" => "Successful login.",
                "jwt" => $jwt,
                "username" => $data->usr,
                "expireAt" => $expire_claim
            ));
    }
    else{
        http_response_code(401);
        echo json_encode(array("message" => "Login failed.", "password" => $password));
    }
}else{
    http_response_code(400);
    echo json_encode(array(
        "message" => "Wrong"
    ));
}

