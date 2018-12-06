<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 29.11.2018
 * Time: 21:16
 */
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../../config/database.php';
include_once '../../models/course.php';

$database = new Database();
$db = $database->getConnection();

$course= new Course($db);

    $ans = $course->getCoursesList();
    http_response_code(200);
    echo json_encode($ans);

