
<?php
/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 26.12.2018
 * Time: 20:41
 */

include_once '../../config/postConfig.php';
include_once '../../models/subject.php';
$subject= new Subject($db);
$ans = $subject->getDemoSubjectId();
http_response_code(200);
echo json_encode($ans);