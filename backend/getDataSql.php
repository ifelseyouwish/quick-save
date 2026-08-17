<?php 
header('Content-Type: application/json');
require 'db.php';

if(!isset($_SESSION['uId'])){
    echo json_encode(["status" => "error", "msg" => "Unauthorized access"]);
    exit;
}

$uId = $_SESSION['uId'];
$username = $_SESSION['username'];


if($_SERVER["REQUEST_METHOD"] == "POST"){


    // logic para sa pag-logout ng user
    if($_POST['action'] == 'logOut'){
        echo json_encode(['status' => 'success', 'msg'=>'Logged out successfully.']);
        $_SESSION['uId'] = null;
        exit;
    }
    // logic para sa pag-update ng profile picture
    if($_POST['action'] == 'profile'){
        $i = $_POST['i'];

        $sql = $conn->prepare("UPDATE users SET profile=? WHERE id=?");
        $sql->bind_param("ii", $i,$uId);

        if($sql->execute()){
            echo json_encode(['status'=>'success','msg'=>$i]);
        }
        exit;
    }
    if($_POST['action'] == 'getprofile'){
        $sql = $conn->query("SELECT profile FROM users WHERE id=$uId");
        $i = [];
        if($sql->num_rows > 0){
            while($res = $sql->fetch_assoc()){
                $i[] = $res;
            }
        }
        echo json_encode(['msg'=>$i]);
        exit;
    }
    // update natin yung username dito
    if($_POST['action'] == 'changeUsername'){
        $newUsername = $_POST['username'];
        $sql = $conn->prepare("SELECT * FROM users WHERE username=?");
        $sql->bind_param("s",$newUsername);
        $sql->execute();
        $ress = $sql->get_result();

        if($ress->num_rows > 0){
            echo json_encode(["status" => "exist", "msg" => "Username already exists."]);
            exit;
        }else{
            $sql = $conn->prepare("UPDATE users SET username=? WHERE id=?");
            $sql->bind_param("si",$newUsername,$uId);
            
            if($sql->execute()){
                echo json_encode(['status'=>'success','msg' => 'Username changed successfully.']);
                $_SESSION['username'] = $newUsername;
                exit;
            }else{
                echo json_encode(['status'=>'fail', 'msg'=>'Failed to change username.']);
            }
            exit;
        }
        echo json_encode(["status" => "error", "msg" => "Invalid request."]);
        exit;
    }

    // logic to for changing password
    if($_POST['action'] == 'changePass'){
        $newPass = $_POST['password'];

        $check = $conn->query("SELECT * FROM users WHERE id=$uId AND password='$newPass'");
        if($check->num_rows > 0){
            echo json_encode(['status' => 'fail']);
            exit;
        }else{
            $sql=$conn->prepare("UPDATE users SET password=? WHERE id=?");
            $sql->bind_param("si", $newPass,$uId);
            if($sql->execute()){
                $_SESSION['pass'] = str_repeat("• ", strlen($newPass));
                echo json_encode(['status' => 'success','msg' => 'Password changed successfully.']);
            }
        }
        exit;
    }

    // pag-delete ng user account
    if($_POST['action'] == 'deleteAccount'){
        $pass = $_POST['pass'];

        $sql = $conn->prepare("SELECT * FROM users WHERE password = ? AND username = ?");
        $sql->bind_param("ss", $pass, $username);
        $sql->execute();

        $res = $sql->get_result();
    
        if($res->num_rows > 0){
            $sql = "DELETE FROM users WHERE username = ? AND password = ?";
            $delStmt = $conn->prepare($sql);
            $delStmt->bind_param("ss", $username, $pass);
            
            if($delStmt->execute()){
                $_SESSION['uId'] = NULL;
                echo json_encode(['status' => 'deleted']);
            }else{
                echo json_encode(['status' => 'failed deleted']);
            }
            exit;
        }else{
            echo json_encode(['status' => 'wrong']);
        }
        exit;
    }


    // fetch natin lahat ng quotes ng user
    if($_POST['action'] == 'getQuote'){
        $sql = "SELECT * FROM quotes WHERE userId =?";
        $ress = $conn->prepare($sql);
        $ress->bind_param('i', $uId);
        $ress->execute();

        $result = $ress->get_result();

        $quotesData  = [];

        while($row = $result->fetch_assoc()){
            $quotesData[] = $row;
        }
        echo json_encode(["status" => "success", "dquotes" => $quotesData]);
        exit;
    }

    if($_POST['action'] == "getLink"){
        $sql = $conn->prepare("SELECT * FROM links WHERE userId = ?");
        $sql->bind_param("i", $uId);
        $sql->execute();

        $result=$sql->get_result();

        $linksData = [];
        while($row=$result->fetch_assoc()){
            $linksData[] = $row;
        }
        echo json_encode(["status" => "success", "dlinks" => $linksData]);
        exit;
    }

    if($_POST['action'] == 'getTodo'){
        $today = $_POST['dToday'];
        $sql = $conn->prepare("SELECT * FROM todos WHERE userId=?");
        $sql->bind_param("i",$uId);
        $sql->execute();

        $result = $sql->get_result();
        $inprogress = [];
        $completed = [];
        $failed = [];
        $todayTodo =[];
        $pastDue = [];

        while($row=$result->fetch_assoc()){
            if($row['status'] == 'inprogress' && $row['dueDate'] > $today){
                $inprogress[] = $row;
            };
            
            if($row['dueDate'] == $today && $row['status'] == 'inprogress'){
                $todayTodo[] = $row;
            };

            if($row['status'] == 'completed'){
                $completed[] = $row;
            }

            if($row['dueDate'] < $today && $row['status'] == 'inprogress'){
                $pastDue[] = $row;
            }
        };

        echo json_encode(['inprogress' => $inprogress, 'today' => $todayTodo, 'completed' => $completed, 'pastDue' =>$pastDue]);
        exit;
    }

    echo json_encode(["status" => "success", "msg" => "Operation completed successfully."]);
    exit;
}
exit;
?>


