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

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create()
    {
        $this->idUser = htmlspecialchars(strip_tags($this->idUser));
        $this->idSubject = htmlspecialchars(strip_tags($this->idSubject));
        $this->result = htmlspecialchars(strip_tags($this->result));

        $query = 'INSERT INTO ' . $this->tableName . ' SET 
                ID_USER = :idUser ,
                ID_SUBJECT = :idSubject ,
                RESULT = :result ;';

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':idUser', $this->idUser, PDO::PARAM_INT);
        $stmt->bindParam(':idSubject', $this->idSubject, PDO::PARAM_INT);
        $stmt->bindParam(':result', strval($this->result), PDO::PARAM_STR);

        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        return -1;
    }

    public function checkUserResultForSubject()
    {
        $this->idUser = htmlspecialchars(strip_tags($this->idUser));
        $this->idSubject = htmlspecialchars(strip_tags($this->idSubject));

        $query = "SELECT * FROM " . $this->tableName . " WHERE 
        ID_USER = :idUser
        AND ID_SUBJECT = :idSubject;";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':idUser', $this->idUser, PDO::PARAM_INT);
        $stmt->bindParam(':idSubject', $this->idSubject, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt;
    }

    public function update()
    {
        $this->idUser = htmlspecialchars(strip_tags($this->idUser));
        $this->result = htmlspecialchars(strip_tags($this->result));
        $this->idSubject = htmlspecialchars(strip_tags($this->idSubject));

        $query = "UPDATE " . $this->tableName . " SET 
        RESULT = :result
         WHERE ID_USER = :idUser
        AND ID_SUBJECT = :idSubject ;";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':idUser', $this->idUser, PDO::PARAM_INT);
        $stmt->bindParam(':idSubject', $this->idSubject, PDO::PARAM_INT);
        $stmt->bindParam(':result', strval($this->result), PDO::PARAM_STR);

        $stmt->execute();
    }
}