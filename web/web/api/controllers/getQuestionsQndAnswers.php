<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/question.php';
include_once '../models/answer.php';
include_once '../models/category.php';
include_once '../models/subject.php';

$database = new Database();
$db = $database->getConnection();

$subject = new Subject($db);
$questionObj = new Question($db);
$category = new Category($db);
$stmtQ = $subject->getQuestions();
$num = $stmtQ->rowCount();

if ($num > 0) {
    $questions = array();
    while ($row = $stmtQ->fetch(PDO::FETCH_ASSOC)) {

        $stmtA = $questionObj->getAnswers($row['ID']);

        $answers = array();
        while ($rowA = $stmtA->fetch(PDO::FETCH_ASSOC)) {
            $answer = array(
                "id" => $rowA['ID'],
                "text" => $rowA['TEXT']
            );

            array_push($answers, $answer);
        }


        $question = array(
            "id" => $row['ID'],
            "category" => $row['CATEGORY'],
            "text" => $row['TEXT'],
            "code" => html_entity_decode($row['CODE']),
            "image" => $row['IMAGE'],
            "answers" => $answers
        );
        array_push($questions, $question);
    }

    http_response_code(200);

    echo json_encode($questions);
} else {

    http_response_code(404);

    echo json_encode(
        array("message" => "No products found.")
    );
}
?>