<?php
class Category{
    private $conn;
    private $tableName = "CATEGORY";
    
    public $ID;
    public $name;
    
    public function __construct($db){
        $this->conn = $db;
    }

}