<?php

/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 15.12.2018
 * Time: 16:58
 */
class UserResult
{
    private $conn;
    private $tableName = "user_result";

    public $id;
    public $idUser;
    public $idSubject;
    public $result;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        $this->idUser=htmlspecialchars(strip_tags($this->idUser));
        $this->idSubject=htmlspecialchars(strip_tags($this->idSubject));
        $this->result=htmlspecialchars(strip_tags($this->result));

        $query = 'INSERT INTO user_result SET 
                ID_USER = "'.$this->idUser.'",
                ID_SUBJECT = "'.$this->idSubject.'",
                RESULT = "'.$this->result.'";';

        $stmt = $this->conn->prepare($query);

        if($stmt->execute()){
            return $this->conn->lastInsertId();
        }
        return -1;


    }

    public function checkUserResultForSubject(){
        $this->idUser=htmlspecialchars(strip_tags($this->idUser));
        $this->idSubject=htmlspecialchars(strip_tags($this->idSubject));

        $query = "SELECT * FROM user_result WHERE ID_USER = ".$this->idUser."
        AND ID_SUBJECT = ".$this->idSubject.";";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function update(){
        $this->idUser=htmlspecialchars(strip_tags($this->idUser));
        $this->result=htmlspecialchars(strip_tags($this->result));
        $this->idSubject=htmlspecialchars(strip_tags($this->idSubject));
        $query = "UPDATE user_result SET RESULT = ".$this->result."
         WHERE ID_USER = ".$this->idUser."
        AND ID_SUBJECT = ".$this->idSubject.";";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
    }
}