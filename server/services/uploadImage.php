<?php

include_once '../configs/DBConnection.php';
require "../vendor/autoload.php";
use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Origin, Accept");



$secret_key = "verysecret123";


if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    return;
}

$folder = '../images/';
$database = new DBConn();
$conn = $database->getConn();

$data = json_decode(file_get_contents("php://input"));

$jwt = (isset(apache_request_headers()['authorization']))? substr(apache_request_headers()['authorization'],7) : null;
if($jwt!=null){
    try {
        $decoded = JWT::decode($jwt, $secret_key, array('HS256'));


        $errors= array();

        $fileName = $_FILES['imageFile']['name'];
        $fileSize = $_FILES['imageFile']['size'];
        $fileTemp = $_FILES['imageFile']['tmp_name'];
        
        $fileExtension = strtolower(pathinfo($fileName,PATHINFO_EXTENSION));
        $extensions= array("jpeg","jpg","png");

        if(in_array($fileExtension,$extensions)=== false){
            $errors[]="extension not allowed, please choose a JPEG or PNG file.";
        }

        if($fileSize > 2097152){
            $errors[]='File size must be less than 2 MB';
        }

        if(empty($errors)==true){
            move_uploaded_file($fileTemp,$folder.$fileName);
        }else{
            http_response_code(404);
            echo json_encode(array(
                "message" => "File Upload Failed"
            ));
            exit;
        }


        $sql = "INSERT INTO images (imagepath,uploaduserid) VALUES (?,?)";
        $query = $conn->prepare($sql);

        $userId = $decoded->data->id;


        $query->bind_param("ss",$fileName,$userId);
        $query->execute();


        http_response_code(200);
        echo json_encode(array(
            "message" => "Success"
        ));


    }catch (Exception $e){

        http_response_code(401);

        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }

}else{
    http_response_code(401);
    echo json_encode(array(
        "message" => "Access denied."
    ));
}