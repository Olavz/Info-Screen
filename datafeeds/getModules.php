<?php
/**
 * Created by PhpStorm.
 * User: Olavz
 * Date: 17.12.13
 * Time: 20:07
 */

$dir = "../modules/";
$modulesJSON = array();

if ($handle = opendir($dir)) {

    while (false !== ($entry = readdir($handle))) {
        if(!is_dir($entry)) {
            $modulInfo = file_get_contents($dir . $entry . "/info.json");
            $modulInfoJSON = json_decode($modulInfo);
            if($modulInfoJSON->enabled) {
                array_push($modulesJSON, $modulInfoJSON);
            }
        }
    }

    closedir($handle);

    echo json_encode($modulesJSON);
}