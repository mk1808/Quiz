<?php
class Database{
    
    // specify your own database credentials
    private $host = "sql7.freemysqlhosting.net";
    private $db_name = "sql7262936";
    private $username = "sql7262936";
    private $password = "5t46pklT1w";
    public $conn;
    
    // get the database connection
    public function getConnection(){
        
        $this->conn = null;
        
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
        
        return $this->conn;
    }
}
