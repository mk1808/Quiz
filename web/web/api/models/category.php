<?php
class Category{
    private $conn;
    private $tableName = "CATEGORY";
    
    public $ID;
    public $name;
    
    public function __construct($db){
        $this->conn = $db;
    }

    public function getCategory($id){
        $query = "SELECT * FROM CATEGORY WHERE ID = ".$id;
        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt;
    }
}