<?php
function isRegex(string $pattern): bool{
    return (bool) preg_match('/^\/.*\/[imsxuADSUXJ]*$/', $pattern);
}

function normalizeString(string $content): string{
    $contentWithoutCom = preg_replace('/#.*(\n|$)/', "\n", $content);
    $normalizedContent = trim(preg_replace('/[\s\r\t\n]+/', "\n", $contentWithoutCom));
    return trim($normalizedContent, "/");
}


//columnsName is 1D array, while $rowsContents must be 2D array even if you have only 1 row to insert
function arrayToTableString(array $columnsName, array $rows): string{
        $head = "";
        $headSeparator = "";

        foreach($columnsName as $name){
            $head .= "| $name ";
            $headSeparator .= "|---";
        }

        $head .= "|\n";
        $headSeparator .= "|\n";

        $res = $head . $headSeparator;

        foreach($rows as $row){
            foreach($row as $rowContents){
                $res .= "| $rowContents ";
            }
            $res .= "|\n";
        }

        return $res;
    }
?>