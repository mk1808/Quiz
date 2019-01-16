<?php

/**
 * Created by IntelliJ IDEA.
 * User: Marq
 * Date: 27.12.2018
 * Time: 21:45
 */
class SubjectQuestions
{
    private $conn;
    private $tableName = "subject_question";

    public $id;
    public $idSubject;
    public $category;
    public $number;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create()
    {
        $this->idSubject = strval(htmlspecialchars(strip_tags($this->idSubject)));
        $this->category = strval(htmlspecialchars(strip_tags($this->category)));
        $this->number = htmlspecialchars(strip_tags($this->number));

        $query = 'INSERT INTO ' . $this->tableName . ' SET
                ID_SUBJECT = :idSubject ,
                CATEGORY = :category ,
                NUMBER = :number ;';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':idSubject', $this->idSubject, PDO::PARAM_INT);
        $stmt->bindParam(':category', $this->category, PDO::PARAM_STR);
        $stmt->bindParam(':number', $this->number, PDO::PARAM_INT);

        try {
            if ($stmt->execute())
                return $this->conn->lastInsertId();
            else
                return -2;


        } catch (PDOException $e) {
            echo $e;
        }
        return -1;
    }

    public function getQuestions($id)
    {
        $query = "SELECT * FROM " . $this->tableName . " WHERE ID_SUBJECT = :id ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num > 0) {
            $questions = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $query = "SELECT * FROM ";
            }
        }

        return $stmt;
    }

}