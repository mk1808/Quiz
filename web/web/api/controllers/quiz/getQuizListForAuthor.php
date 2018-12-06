<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 29.11.2018
 * Time: 15:02
 */
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../config/database.php';
include_once '../../models/subject.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));
 $subject= new Subject($db);


if(!empty($data)){

    $hans = $subject->getSubjectListForAuthor($data->id);
    http_response_code(200);
    echo json_encode($hans);
}
else{
    http_response_code(400);
    echo json_encode(array("message" => "Puste dane"));
}












