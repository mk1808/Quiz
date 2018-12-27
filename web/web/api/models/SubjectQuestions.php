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

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
            $this->idSubject=strval(htmlspecialchars(strip_tags($this->idSubject)));
            $this->category=strval(htmlspecialchars(strip_tags($this->category)));
            $this->number=htmlspecialchars(strip_tags($this->number));

            $query = 'INSERT INTO subject_question SET
                ID_SUBJECT = '.$this->idSubject.',
                CATEGORY = "'.$this->category.'",
                NUMBER = "'.$this->number.'";';

            $stmt = $this->conn->prepare($query);

            try {
                if ($stmt->execute())
                        return $this->conn->lastInsertId();
                    else
                        return -2;


            }catch ( PDOException $e){
                echo $e;
            }
            return -1;
        }

}