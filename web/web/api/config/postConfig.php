<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 25.12.2018
 * Time: 13:11
 */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'database.php';
include_once 'core.php';


$database = new Database();
$db = $database->getConnection();