<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 30.11.2018
 * Time: 10:35
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../config/database.php';
include_once '../../models/question.php';
include_once '../../models/answer.php';
include_once '../../models/category.php';
include_once '../../models/subject.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

//$data = (file_get_contents("php://input"));
//$data = json_decode(file_get_contents("php://input"));


$questionObj= new Question($db);
$category = new Category($db);
$subject = new Subject($db);

$stmtQ = $questionObj->getQuestionsForQuiz($_GET['id']);
$num = $stmtQ->rowCount();

if($num>0){

    $required = $subject->getRequiredAmountOfQuestion($_GET['id']);

    $questions=array();
    while ($row = $stmtQ->fetch(PDO::FETCH_ASSOC)){

        $stmtA = $questionObj->getAnswers($row['ID']);

        $answers = array();
        while($rowA = $stmtA->fetch(PDO::FETCH_ASSOC)){
            $answer = array(
                "id"=>$rowA['ID'],
                "text"=>$rowA['TEXT']
            );

            array_push($answers, $answer);
        }

        //$stmtC = $category->getCategory($row['ID_CATEGORY']);
        shuffle($answers);
        $question=array(
            "id" => $row['ID'],
            "category" => $row['CATEGORY'],
            "text" => $row['TEXT'],
            "code" => html_entity_decode($row['CODE']),
            "image" => $row['IMAGE'],
            "answers" => $answers
        );
        array_push($questions, $question);
    }

    // set response code - 200 OK
    http_response_code(200);

    // show products data in json format
    shuffle($questions);
    echo json_encode(array_slice($questions,0,$required));
}

else{

    http_response_code(404);

    echo json_encode(
        array("message" => "No questions found.")
    );
}