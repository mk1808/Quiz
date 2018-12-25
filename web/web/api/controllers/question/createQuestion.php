<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 24.11.2018
 * Time: 23:00
 */

include_once '../../config/postConfig.php';

include_once '../../models/question.php';

$question = new Question($db);

$data = json_decode(file_get_contents("php://input"));

$question->idSubject = $data->idSubject;
$question->category = $data->category;
$question->text = $data->text;
$question->code = $data->code;
$question->image = $data->image;
$question->answers = $data->answers;

$stmt = $question->create();

if($stmt>0){
    http_response_code(200);
    echo json_encode(array("message"=>"Question was created", "id"=>$stmt));
}
else{
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create question."));
}