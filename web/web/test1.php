<?php

$query = "SELECT * FROM ANSWER where id=1";
$stmt = $con->prepare( $query );

$stmt->execute();

$column= $stmt->fetch();
echo $column['TEXT'];
?>