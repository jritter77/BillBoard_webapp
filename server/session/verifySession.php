<?php

    // start/resume session
    session_start();
    
    // get req params
    $req = json_decode($_POST['req']);
    
    $user = $req->user;
    $session = $req->session;

    if ($user == $_SESSION['user'] && $session == session_id()) {
        session_regenerate_id();
        $token = array();
        $token['user_id'] = $_SESSION['user_id'];
        $token['user'] = $_SESSION['user'];
        $token['session'] = session_id();
        echo json_encode($token);
    }
    else{
        echo FALSE;
    }

?>