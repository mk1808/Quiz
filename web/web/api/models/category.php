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

    public function getCategoriesList(){
        $query = "SELECT CATEGORY FROM question GROUP BY CATEGORY";
        //$query = "SELECT * FROM QUESTION";
        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        $value = array();
        for($i = 0; $i < $stmt->rowCount(); $i++){
            $value[$i]= $stmt->fetch(PDO::FETCH_ASSOC)['CATEGORY'];
        }

        //$value = array( $stmt->fetch(PDO::FETCH_ASSOC));
        return $value;
    }
}