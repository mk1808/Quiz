<?php

class Answer
{
    private $conn;
    private $tableName = "ANSWER";

    public $ID;
    public $idQuestion;
    public $text;
    public $status;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function checkAnswer($id)
    {
        $query = "SELECT STATUS FROM " . $this->tableName . " WHERE ID = :id ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        $stmt->execute();
        $value = $stmt->fetch()[0];
        return intval($value);
    }

    public function createAnswer($answers, $id)
    {
        try {
            $query = 'INSERT INTO ' . $this->tableName . ' (ID_QUESTION, STATUS, TEXT) VALUES';

            foreach ($answers as $answer) {

                $answer->text = strval(htmlspecialchars(strip_tags($answer->text)));
                $answer->status = strval(htmlspecialchars(strip_tags($answer->status)));
                if ($answer->status == "") {
                    $answer->status = 0;
                }
                $query = $query . ' (' . $id . ',' . ($answer->status) . ',"' . ($answer->text) . '"),';
            }
            $query = substr($query, 0, strlen($query) - 1);

            $stmt = $this->conn->prepare($query);

            if ($stmt->execute()) {
                return true;
            }
        } catch (PDOException $e) {
            echo $e;
        }
        return false;
    }

    public function update($answers)
    {
        $i = 0;
        foreach ($answers as $answer) {
            $query = 'UPDATE ' . $this->tableName . ' SET ';
            $answer->id = strval(htmlspecialchars(strip_tags($answer->id)));
            $answer->text = strval(htmlspecialchars(strip_tags($answer->text)));
            $answer->status = strval(htmlspecialchars(strip_tags($answer->status)));
            if ($answer->status == "") {
                $answer->status = 0;
            }
            $query = $query . '
            STATUS = :status , TEXT = :text  WHERE ID = :id ';

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':status', $answer->status, PDO::PARAM_BOOL);
            $stmt->bindParam(':text', $answer->text, PDO::PARAM_STR);
            $stmt->bindParam(':id', $answer->id, PDO::PARAM_INT);
            if ($stmt->execute()) {
                $i++;
            }
        }
        if ($i > 2) {
            return true;
        }

        return false;
    }

}