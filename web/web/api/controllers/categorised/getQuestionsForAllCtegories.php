<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 30.11.2018
 * Time: 10:35
 */


include_once '../../config/postConfig.php';

include_once '../../models/question.php';
include_once '../../models/answer.php';
include_once '../../models/category.php';
include_once '../../models/subject.php';

$data = (file_get_contents("php://input"));
$data = json_decode(file_get_contents("php://input"));

$auth2 = authorizate($data->jwt);
if (!$auth ||(isset($auth2["decoded"]))){

    $questionObj= new Question($db);

    $categories = $questionObj->getCategoriesListOfCategorised();

    $list = array();
    foreach ($categories as $category){
        $stmtC = $questionObj->getQuestionsForCategoies($category);
        $num = $stmtC->rowCount();

        if($num>0){
            $questions=array();
            while ($row = $stmtC->fetch(PDO::FETCH_ASSOC)){

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
            @$item->category = $category;
            $item->questions = $questions;
            array_push($list, $item);
        }
        else {
            $item->category = $category;
            $item->questions = array();
            array_push($list, $item);
        }


    }


    http_response_code(200);
    echo json_encode($list);


}
else {
    http_response_code(201);

    echo json_encode(
        array("message" => "UnAuthorized")
    );
}