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

if (isset($_GET['count'])){

    $sql = "SELECT COUNT(*) FROM" . ' images';

    if (isset($_GET['search'])){
        $words = explode(" ",$_GET['search']);
        $sql = "SELECT COUNT(*) FROM " . 'images'. " WHERE imagepath LIKE '%".$words[0]."%'";
        if(count($words)>1){
            for($x = 1; $x< count($words); $x++){
                $sql= $sql . " OR imagepath LIKE '%" . $words[$x] ."%'";
            }
        }
    }

    $query = $conn->prepare($sql);
    $query->execute();
    $query->store_result();
    $query->bind_result($imageCount);
    $query->fetch();


    http_response_code(202);
    echo json_encode("$imageCount");
    exit();
}



$sql = "SELECT * FROM " . 'images' . " LIMIT 3 OFFSET ".($_GET['page']-1)*3;

if (isset($_GET['search'])){
    $words = explode(" ",$_GET['search']);
    $sql = "SELECT * FROM " . 'images'. " WHERE imagepath LIKE '%".$words[0]."%'";
    if(count($words)>1){
        for($x = 1; $x< count($words); $x++){
            $sql= $sql . " OR imagepath LIKE '%" . $words[$x] ."%'";
        }
    }
    $sql = $sql . " LIMIT 3 OFFSET ".($_GET['page']-1)*3;
}

$query = $conn->prepare($sql);
$query->execute();
$query->store_result();
$query->bind_result($id, $path, $creator);


$num = $query->num_rows;

if ($num > 0) {
    $images = array();
    while (($row = $query->fetch())) {
        $src = "$folder/$path";
        $data = file_get_contents($src);
        $base64 = 'data:image/' . filetype($src) . ';base64,' . base64_encode($data);
        $images[$id . "-" . $path] = $base64;
    }
    http_response_code(200);
    echo json_encode(array(
        "images" => $images,
    ));

}else{
    http_response_code(404);
    echo json_encode("Error");
}
