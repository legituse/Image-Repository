<?php


include_once '../configs/DBConnection.php';
require "../vendor/autoload.php";


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");




$folder = '../images';

$database = new DBConn();
$conn = $database->getConn();

$data = json_decode(file_get_contents("php://input"));


$sql = "SELECT * FROM " . 'images' . " ORDER BY id DESC LIMIT 6";


$query = $conn->prepare($sql);
$query->execute();
$query->store_result();
$query->bind_result($id, $path, $creator);


$num = $query->num_rows;

if ($num > 0) {
    $images = array();
    while (($row = $query->fetch())&& count($images)!=6) {
        $src = "$folder/$path";
        $data = file_get_contents($src);
        $base64 = 'data:image/' . filetype($src) . ';base64,' . base64_encode($data);
        $images[$id . "-" . $path] = $base64;
    }
    http_response_code(200);
    echo json_encode($images);

}else{
    http_response_code(404);
    echo json_encode("Error");
}
