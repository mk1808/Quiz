<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 25.11.2018
 * Time: 23:00
 */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../../config/database.php';
include_once '../../models/question.php';

$database = new Database();
$db = $database->getConnection();

$question = new Question($db);

$data = json_decode(file_get_contents("php://input"));

$question->idSubject = $data->idSubject;
$question->idCategory = $data->category;
$question->text = $data->text;
$question->code = $data->code;
$question->image = $data->image;

$stmt = $question->create();

if($stmt>0){
    http_response_code(200);
    echo json_encode(array("message"=>"Question was created", "id"=>$stmt));
}
else{
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create question."));
}