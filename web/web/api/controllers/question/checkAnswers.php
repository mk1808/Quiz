<?php

include_once '../../config/postConfig.php';

include_once '../../models/question.php';
include_once '../../models/answer.php';
include_once '../../models/subject.php';

$subject = new Subject($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data)){

    $ans = $subject->checkAnswersSaveResult($data->questions,$data->idUser,$data->idSubject );
    http_response_code(200);
    echo json_encode($ans);
}
else{
    http_response_code(201);
    echo json_encode(array("message" => "Data is incomplete."));
}
