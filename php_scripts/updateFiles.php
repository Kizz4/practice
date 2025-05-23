<?php 
if ($argc < 2) {
    echo "No project name given.\n";
    exit(1);
}

include("utils.php");
include("CustomRecursiveFilterIterator.php");
include("FactoryRecursiveItIt.php");
include("FileTreeBuilder.php");
include("FileInjector.php");
include("DynamicContentModifier.php");



$rootName = $argv[1];
$rootPath = stristr(__DIR__, $rootName, true) . $rootName;
$dynamicContentModifier = new DynamicContentModifier($rootPath, $rootName);
$dynamicContentModifier->updateAllContent();
?>


