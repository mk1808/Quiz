<?php

/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 29.11.2018
 * Time: 21:13
 */
class Course
{
    private $conn;
    private $tableName = "courses";

    public $ID;
    public $name;

    public function __construct($db){
        $this->conn = $db;
    }

    public function getCoursesList(){
        $query = "SELECT * FROM ".$this->tableName;
        //$query = "SELECT * FROM QUESTION";
        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        $value = array();
        for($i = 0; $i < $stmt->rowCount(); $i++){
            $value[$i]= $stmt->fetch(PDO::FETCH_ASSOC);
        }

        //$value = array( $stmt->fetch(PDO::FETCH_ASSOC));
        return $value;
    }
}