<?php

include("db.php");
$suId = $_SESSION['uId'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if(!isset($_POST['action'])){
        exit;
    }
    // para to sa pag-add/edit ng quote
    if($_POST['action'] == 'addQuote'){
        $qtitle = $_POST['title'];
        $qtext = $_POST['text'];
        $dateC = $_POST['date'];

        $sql = $conn->prepare("INSERT INTO quotes(userId, title, content, dcreate) VALUES (?, ?, ?, ?)");
        $sql->bind_param("isss", $suId, $qtitle, $qtext, $dateC);
        $sql->execute();
        echo json_encode(["status" => "success", "msg" => "Quote added successfully."]);
        exit;
    }
    
    if($_POST['action'] == 'dltQuote'){
        $id = $_POST['id'];

        $sql = "DELETE FROM quotes WHERE id = ? AND userId =?";
        $ress = $conn->prepare($sql);
        $ress->bind_param("ii", $id,  $suId); // 'i' stands for integer type
        $ress->execute();

        if ($ress->affected_rows > 0) {
            echo json_encode(["status" => "success", "msg" => "Quote deleted successfully."]);
        } else {
            echo json_encode(["status" => "fail", "msg" => "Failed to delete quote."]);
        }
        exit;
    }

    if($_POST['action'] == 'editQuote'){
        $id = $_POST['id'];
        $title= $_POST['qtitle'];
        $text = $_POST['qtext'];

        $sql = $conn->prepare("UPDATE quotes SET title =?,content=? WHERE userId=? AND id=?");
        $sql->bind_param("ssii",$title,$text,$suId,$id);
        $sql->execute();

        if($sql->execute()){
            echo json_encode(['status'=>'success','msg'=>'Item updated successfully']);
        }else{
            echo json_encode(['status'=>'success','msg'=>'Failed to update item']);
        }
        exit;
    }

    // para to sa pag-add/edit ng links
    if($_POST["action"] == "addLink"){
        $name =$_POST['name'];
        $link =$_POST['url'];

        $sql = $conn->prepare("INSERT INTO links(userId, name, link) VALUES(?,?,?)");
        $sql->bind_param("iss",$suId,$name,$link);
        $sql->execute();
        echo json_encode(["status" =>"success", "msg" => "Link added successfully."]);
        exit;
    }

    if($_POST['action'] == 'delLink'){
        $id = $_POST['id'];

        $sql = $conn->prepare("DELETE FROM links WHERE id =? AND userId =?");
        $sql->bind_param("ii",$id,$suId);
        $sql->execute();

        if($sql->affected_rows > 0){
            echo json_encode(["status"=>"success","msg"=>"Item deleted successfully"]);
        }else{
            echo json_encode(["status"=>"failed", "msg"=>"Failed to delete item."]);
        }
        exit;
    }

    if($_POST['action'] == 'updateLink'){
        $visit = $_POST['visit'];
        $date = $_POST['date'];
        $id = $_POST['id'];
        $sql = $conn->prepare("UPDATE links SET visit = ?,lastvisit=? WHERE id=? AND userId=?");
        $sql->bind_param("isii",$visit,$date,$id,$suId);
        $sql->execute();

        if($sql->execute()){
            echo json_encode(["status" => "success", "msg" => "Status updated successfully."]);
        }else{
            echo json_encode(["status" => "success", "msg" => "Failed to update status."]);
        }
        exit;
    }
    // logic to para sa to-do list
    if($_POST['action'] == 'addTodo'){
        $title = $_POST['title'];
        $description = $_POST['description'];
        $due = $_POST['due'];
        $status = $_POST['status'];
        $dcreate = $_POST['dcreate'];

        $sql = $conn->prepare("INSERT INTO todos(userId,title,descript,dueDate,status,dcreated) VALUES(?,?,?,?,?,?)");
        $sql->bind_param("isssss", $suId, $title, $description, $due, $status, $dcreate);
        $sql->execute();

        echo json_encode(["status" => "success", "msg" => "Task added successfully."]);
        // uncomment mo to pag need mo mag-debug gago
        // echo json_encode(["status" => "success", "msg" => "umabot sa post request $title $desc $due $status $dcreate"]);
        exit;
    }
    if($_POST['action'] == 'updateTodo'){
        $id = $_POST['id'];
        $status = $_POST['status'];

        $sql = $conn->prepare("UPDATE todos SET status=? WHERE userId=? AND id=?");
        $sql->bind_param("sii", $status, $suId, $id);
        $sql->execute();

        if($sql->execute()){
            echo json_encode(['msg' => 'Task updated successfully.']);
        }
        exit;
    }
    if($_POST['action'] == 'delTodo'){
        $id = $_POST['id'];

        $sql = $conn->prepare("DELETE FROM todos WHERE userId=? AND id=?");
        $sql->bind_param("ii", $suId, $id);

        if($sql->execute()){
            echo json_encode(['msg' => 'Task deleted successfully.']);
        }
        exit;
    }
    if($_POST['action'] == 'editTodo'){
        $id = $_POST['id'];
        $title = $_POST['title'];
        $description = $_POST['description'];
        $due = $_POST['due'];

        $sql = $conn->prepare("UPDATE todos SET title=?, descript=?, dueDate=? WHERE userId=? AND id=?");
        $sql->bind_param("sssii", $title, $description, $due, $suId, $id);

        if($sql->execute()){
            echo json_encode(['msg' => 'Request completed.']);
        }
        exit;
    }

    echo json_encode(["status" => "fail", "msg" => "Invalid request"]);
    exit;
}

?>



