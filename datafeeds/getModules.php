<?php
/**
 * Created by PhpStorm.
 * User: Olavz
 * Date: 17.12.13
 * Time: 20:07
 */

$DefaultOpts = array(
    "enabled" => true,
    "order"   => 0,
    "airTime" => 10,
    "screenSettings" => array(
        "showHeader" => true,
        "showFooter" => true,
        "showProgress" => true
    )
);

$dir = "../modules/";
$modulesJSON = array();

if ($handle = opendir($dir)) {

    while (false !== ($entry = readdir($handle))) {
        if(!is_dir($entry)) {
            $modulInfo = file_get_contents($dir . $entry . "/info.json");
            $modulInfoJSON = json_decode($modulInfo, true);
            $modulInfoJSON = array_replace_recursive($DefaultOpts, $modulInfoJSON);
            /* Only show enabled modules. */
            if($modulInfoJSON["enabled"]) {
                array_push($modulesJSON, $modulInfoJSON);
            }
        }
    }

    closedir($handle);

    echo json_encode($modulesJSON);
}
