<?php

class Subject{
    private $conn;
    private $tableName = "SUBJECT";
    
    public $ID;
    public $name;
    public $author;
    
    public function __construct($db){
        $this->conn = $db;
    }
       
    
    public function getQuestions(){
        //$query = "SELECT * FROM ".$this->tableName." WHERE ID = ".$id;
        $query = "SELECT * FROM QUESTION";
        $stmt = $this->conn->prepare($query);
        
        $stmt->execute();
        return $stmt;
    }
}
