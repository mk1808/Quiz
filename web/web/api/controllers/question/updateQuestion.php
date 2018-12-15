<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 24.11.2018
 * Time: 23:00
 */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers,Access-Control-Allow-Origin, X-Requested-With,  Origin, Content-Type, X-Auth-Token");



include_once '../../config/database.php';
include_once '../../models/question.php';

$database = new Database();
$db = $database->getConnection();

$question = new Question($db);

$data = json_decode(file_get_contents("php://input"));

$question->id = $data->id;
$question->category = $data->category;
$question->text = $data->text;
$question->code = $data->code;
$question->image = $data->image;
$question->answers = $data->answers;

$stmt = $question->update();

if($stmt>0){
    http_response_code(200);
    echo json_encode(array("message"=>"Question was updated", "id"=>$stmt));
}
else{
    http_response_code(400);
    echo json_encode(array("message" => "Unable to update question."));
}