<?php
class FileInjector {
    
    //$elementsToInject must be equal to $tags length /2
    //$tags length must be even. this function will treat tags with a Start Tag and a End Tag.
    //the result his for each tuple of tags  $tags[x] $elementsToInject[x/2] $tags[x+1] with x%2==0
    static public function inject(array $contentsToInject, array $tags, RecursiveIteratorIterator $it): void{
        if (count($tags) % 2 !== 0 || count($contentsToInject) !== count($tags) / 2) {
            throw new InvalidArgumentException("Mismatch between tags and injected elements.");
        }
        foreach ($it as $file) {
            $path = $file->getPathname();
            $newContent = file_get_contents($path);


            for($i=0; $i < count($tags); $i+=2){
                $start = $tags[$i];
                $end = $tags[$i+1];

                $pattern = '/' . $start . '(.*?)' . $end . '/s';
                $element = "$start\n" . $contentsToInject[$i/2] . "\n$end";

                if (preg_match($pattern, $newContent)) {
                    $newContent = preg_replace($pattern, $element, $newContent);
                }
            }  

            if(file_get_contents($path) !== $newContent){
                file_put_contents($path, $newContent);
                echo "Files Path: $path\nNew Content : $newContent";

            }else echo "Files Path: $path\nNew Content : Any update perform";
            
        }
    }
}

?>