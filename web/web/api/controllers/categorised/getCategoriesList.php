<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 26.12.2018
 * Time: 17:13
 */
include_once '../../config/postConfig.php';
include_once '../../models/question.php';



$question= new Question($db);

$ans = $question->getCategoriesListOfCategorised();
http_response_code(200);
echo json_encode($ans);

