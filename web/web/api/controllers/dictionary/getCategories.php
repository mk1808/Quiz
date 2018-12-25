<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 29.11.2018
 * Time: 21:16
 */


include_once '../../config/postConfig.php';
include_once '../../models/category.php';

$category= new Category($db);
$ans = $category->getCategoriesList();
http_response_code(200);
echo json_encode($ans);

