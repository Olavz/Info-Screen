<?php
/**
 * Created by PhpStorm.
 * User: Olavz
 * Date: 20.02.14
 * Time: 20:04
 */

// JavaScript proxy FACEPALM orgin error

$data = file_get_contents("https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http%3A%2F%2Fgoo.gl%2FdfVCjV&num=20");

echo $data;