<?php

class DBConn {

    private $mysqli;

    public function __construct() {

        $this->mysqli = new mysqli(
            "localhost",
            "imagerepo",
            "root",
            "repo"
        );

        if ($this->mysqli->connect_errno) {
            echo "Failed to connect to MySQL: " . $this->mysqli -> connect_errno;
            exit;
        }

        $this->mysqli->set_charset('utf8');
    }

    public function getConn() {
        return $this->mysqli;
    }
}






?>
