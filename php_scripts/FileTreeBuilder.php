<?php
class FileTreeBuilder {
    private array $tree = [];

    public function getTree(): array {
        return $this->tree;
    }

    public function makeTree(string $rootName, RecursiveIteratorIterator $it): void {
        $this->tree[$rootName] = array();

        foreach ($it as $file) {
            $fullPath = $file->getPathname();
            $relativePath = stristr($fullPath, $rootName);
            $relativePathArray = explode('/', $relativePath);
            $subTree =& $this->tree[$rootName];

            for($i = 1; $i < count($relativePathArray); $i++){
                $currentDir = $relativePathArray[$i];
                
                if (!isset($subTree[$currentDir])){
                    $subTree[$currentDir] = array();          
                }

                $subTree =& $subTree[$currentDir];
                    
            }
        }
    }



    public function toString(int $startingDepth=0, int $endingDepth=PHP_INT_MAX, string $depthSeparatorCharacters="\t"): string {
        $res = "";
        $display = function(array $node, int $depth) use (&$display, $startingDepth, $endingDepth, $depthSeparatorCharacters, &$res) {
            
            foreach ($node as $name => $child) {

                if ($startingDepth <= $depth) {
                    $res .= str_repeat($depthSeparatorCharacters, $depth - $startingDepth) . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "\n";
                }

                if (is_array($child) && $endingDepth > $depth) {
                    $display($child, $depth + 1); 
                }
            }
        };

        $display($this->tree, 0);
        return $res;
    }
}
?>