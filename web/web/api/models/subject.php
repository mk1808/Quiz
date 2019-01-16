<?php


include_once 'UserResult.php';

class Subject
{
    private $conn;
    private $tableName = "SUBJECT";

    public $id;
    public $name;
    public $id_author;
    public $nOQuestions;
    public $multipleChoice;
    public $separatePage;
    public $canBack;
    public $limitedTime;
    public $time;
    public $course;
    public $description;
    public $shared;
    public $categorysed;
    public $randomize;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getQuestions()
    {
        $query = "SELECT * FROM QUESTION ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getSubectsQuestions($id)
    {
        $query = "SELECT * FROM question WHERE ID_SUBJECT = :id ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        $stmt->execute();
        return $stmt;
    }

    public function checkAnswers($questions)
    {

        $question = new Question($this->conn);
        $questionsTotal = 0;
        $questionsTrue = 0;
        foreach ($questions as $answer) {
            $questionsTotal += 1;
            if (count($answer->answers) != 0 && $question->checkAnswer($answer->answers) == 1) {
                $questionsTrue += 1;
            }
        }
        return array(
            'total' => $questionsTotal,
            'true' => $questionsTrue
        );
    }

    public function checkAnswersSaveResult($questions, $idUser, $idSubject)
    {

        $question = new Question($this->conn);
        $questionsTotal = 0;
        $questionsTrue = 0;
        foreach ($questions as $answer) {
            $questionsTotal += 1;
            if (count($answer->answers) != 0 && $question->checkAnswer($answer->answers) == 1) {
                $questionsTrue += 1;
            }
        }
        $userResult = new UserResult($this->conn);
        $userResult->idUser = $idUser;
        $userResult->idSubject = $idSubject;
        $userResult->result = $questionsTrue / $questionsTotal;

        if ($userResult->checkUserResultForSubject()->rowCount() > 0) {
            $userResult->update();
        } else {
            $userResult->create();
        }

        return array(
            'total' => $questionsTotal,
            'true' => $questionsTrue
        );
    }

    public function create()
    {
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->id_author = htmlspecialchars(strip_tags($this->id_author));
        $this->nOQuestions = htmlspecialchars(strip_tags($this->nOQuestions));
        $this->multipleChoice = htmlspecialchars(strip_tags($this->multipleChoice));
        $this->separatePage = htmlspecialchars(strip_tags($this->separatePage));
        $this->canBack = htmlspecialchars(strip_tags($this->canBack));
        $this->limitedTime = htmlspecialchars(strip_tags($this->limitedTime));
        $this->time = htmlspecialchars(strip_tags($this->time));
        $this->course = htmlspecialchars(strip_tags($this->course));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->randomize = htmlspecialchars(strip_tags($this->randomize));

        $query = 'INSERT INTO ' . $this->tableName . ' SET 
                NAME = :name ,
                ID_AUTHOR = :idAuthor ,
                N_O_QUESTIONS = :nOQuestions ,
                MULTIPLE_CHOICE = :multipleChoice ,
                SEPARATE_PAGE = :separatePage ,
                CAN_BACK = :canBack ,
                LIMITED_TIME = :limitedTime ,
                TIME = :time,
                COURSE = :course ,
				RANDOMIZE = :randomize ,
                DESCRIPTION = :description ;';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $this->name, PDO::PARAM_STR);
        $stmt->bindParam(':idAuthor', $this->id_author, PDO::PARAM_INT);
        $stmt->bindParam(':nOQuestions', $this->nOQuestions, PDO::PARAM_INT);
        $stmt->bindParam(':multipleChoice', $this->multipleChoice, PDO::PARAM_BOOL);
        $stmt->bindParam(':separatePage', $this->separatePage, PDO::PARAM_BOOL);
        $stmt->bindParam(':canBack', $this->canBack, PDO::PARAM_BOOL);
        $stmt->bindParam(':limitedTime', $this->limitedTime, PDO::PARAM_BOOL);
        $stmt->bindParam(':time', $this->time, PDO::PARAM_INT);
        $stmt->bindParam(':course', $this->course, PDO::PARAM_STR);
        $stmt->bindParam(':randomize', $this->randomize, PDO::PARAM_BOOL);
        $stmt->bindParam(':description', $this->description, PDO::PARAM_STR);

        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        return -1;

    }

    public function getSubjectListForAuthor($id)
    {
        $query = "SELECT * FROM " . $this->tableName . " WHERE ID_AUTHOR = :id ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        $stmt->execute();

        $value = array();
        for ($i = 0; $i < $stmt->rowCount(); $i++) {
            $value[$i] = $stmt->fetch(PDO::FETCH_ASSOC);
        }

        return $value;
    }

    public function getSubjectDetail($id)
    {
        $query = "SELECT * FROM " . $this->tableName . " WHERE ID = :id ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        $stmt->execute();

        $value = $stmt->fetch(PDO::FETCH_ASSOC);

        return $value;
    }

    public function getSubjectListForCourse($course)
    {
        $query = "SELECT * FROM " . $this->tableName . ' WHERE COURSE = :course ';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':course', $course, PDO::PARAM_STR);

        $stmt->execute();

        $value = array();
        for ($i = 0; $i < $stmt->rowCount(); $i++) {
            $value[$i] = $stmt->fetch(PDO::FETCH_ASSOC);
        }

        //$value = array( $stmt->fetch(PDO::FETCH_ASSOC));
        return $value;
    }

    public function update()
    {
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->id_author = htmlspecialchars(strip_tags($this->id_author));
        $this->nOQuestions = htmlspecialchars(strip_tags($this->nOQuestions));
        $this->multipleChoice = htmlspecialchars(strip_tags($this->multipleChoice));
        $this->separatePage = htmlspecialchars(strip_tags($this->separatePage));
        $this->canBack = htmlspecialchars(strip_tags($this->canBack));
        $this->limitedTime = htmlspecialchars(strip_tags($this->limitedTime));
        $this->time = htmlspecialchars(strip_tags($this->time));
        $this->course = htmlspecialchars(strip_tags($this->course));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->randomize = htmlspecialchars(strip_tags($this->randomize));

        $query = 'UPDATE ' . $this->tableName . ' SET 
            NAME = :name ,
            ID_AUTHOR = :idAuthor ,
            N_O_QUESTIONS = :nOQuestions ,
            MULTIPLE_CHOICE = :multipleChoice ,
            SEPARATE_PAGE = :separatePage ,
            CAN_BACK = :canBack ,
            LIMITED_TIME = :limitedTime ,
            TIME = :time,
            COURSE = :course ,
            RANDOMIZE = :randomize ,
            DESCRIPTION = :description
            WHERE ID = :id ;';


        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $this->name, PDO::PARAM_STR);
        $stmt->bindParam(':idAuthor', $this->id_author, PDO::PARAM_INT);
        $stmt->bindParam(':nOQuestions', $this->nOQuestions, PDO::PARAM_INT);
        $stmt->bindParam(':multipleChoice', $this->multipleChoice, PDO::PARAM_BOOL);
        $stmt->bindParam(':separatePage', $this->separatePage, PDO::PARAM_BOOL);
        $stmt->bindParam(':canBack', $this->canBack, PDO::PARAM_BOOL);
        $stmt->bindParam(':limitedTime', $this->limitedTime, PDO::PARAM_BOOL);
        $stmt->bindParam(':time', $this->time, PDO::PARAM_INT);
        $stmt->bindParam(':course', $this->course, PDO::PARAM_STR);
        $stmt->bindParam(':randomize', $this->randomize, PDO::PARAM_BOOL);
        $stmt->bindParam(':description', $this->description, PDO::PARAM_STR);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return 1;
        }
        return -1;

    }

    public function getQuestionCountForQuiz($id)
    {
        $query = 'SELECT COUNT(ID_SUBJECT) FROM question WHERE ID_SUBJECT = :id GROUP BY ID_SUBJECT';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        $stmt->execute();

        $value = $stmt->fetch(PDO::FETCH_ASSOC)["COUNT(ID_SUBJECT)"];
        $ans = [];
        if ($value > 0) {
            $ans = [count => $value];
        } else {
            $ans = [count => 0];
        }
        return $ans;
    }

    public function getRequiredAmountOfQuestion($id)
    {
        $query = 'SELECT N_O_QUESTIONS as number FROM ' . $this->tableName . ' WHERE ID = :id ';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);

        $stmt->execute();

        $value = $stmt->fetch(PDO::FETCH_ASSOC)["number"];

        return $value;
    }

    public function updateShared()
    {
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->shared = htmlspecialchars(strip_tags($this->shared));


        $query = 'UPDATE subject SET 
                SHARED = :shared
                WHERE ID = :id ;';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
        $stmt->bindParam(':shared', $this->shared, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return 1;
        }
        return -1;

    }

    public function getDemoSubjectId()
    {
        $query = 'SELECT ID FROM ' . $this->tableName . ' WHERE COURSE = "DEMO" LIMIT 0,1';
        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        $value = $stmt->fetch(PDO::FETCH_ASSOC)["ID"];

        return $value;
    }

}


