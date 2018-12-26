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

$question->idSubject = -1;
$question->category = $data->category;
$question->text = $data->text;
$question->code = $data->code;
$question->image = $data->image;
$question->answers = $data->answers;

$auth2 = authorizate($data->jwt);
if (!$auth ||(isset($auth2["decoded"]) && ($auth2["decoded"]->role == 1)) ) {

    $stmt = $question->create();

    if ($stmt > 0) {
        http_response_code(200);
        echo json_encode(array("message" => "Question was created", "id" => $stmt));
    } else {
        http_response_code(201);
        echo json_encode(array("message" => "Unable to create question."));
    }
} else {
    http_response_code(201);
    echo json_encode(array("message" => "unAuthorized"));
}