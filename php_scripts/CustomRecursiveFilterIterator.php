<?php
class CustomRecursiveFilterIterator extends \RecursiveFilterIterator{
    private array $dirFilesToExclude;
    private array $dirToInclude;
    private array $targetFiles;
    private $compt = 0;

    public function __construct(\RecursiveDirectoryIterator $iterator, array $dirFilesToExclude = [],  array $dirToInclude = [], array $targetFiles = ["*"]) {

        parent::__construct($iterator);
        $this->dirFilesToExclude = $dirFilesToExclude;
        $this->dirToInclude = $dirToInclude;
        $this->targetFiles = $targetFiles;
    }

    public function getDirFilesToExclude(): array{return $this->dirFilesToExclude;}
    public function getDirFilterToInclude(): array{return $this->dirToInclude;}
    public function getTargetFiles(): array{return $this->targetFiles;}
    public function getToInclude(): bool{return $this->toInclude;}

    public function setdirFilesToExclude($dirFilesToExclude): void{$this->dirFilesToExclude = $dirFilesToExclude;}
    public function setDirFilesToInclude($dirToInclude): void{$this->dirToInclude = $dirToInclude;}
    public function setTargetFiles($targetFiles): void{ $this->targetFiles = $targetFiles;}
    public function setToInclude($toInclude): void{ $this->toInclude = $toInclude;}


    private static function performMatch(callable $matcher, array $segments): bool{
        foreach ($segments as $seg) {
            if ($matcher($seg)) {
                return true;
            }
        }
        return false;
    }


   private static function respectFilters(string $name, array $filters, bool $toInclude = false): bool{
        $segments = array_filter(explode('/', trim($name, '/')), fn($s) => $s !== '');
        foreach ($filters as $pattern) {
            $matcher = fn(string $seg): bool => fnmatch($pattern, $seg);
            
            if (isRegex($pattern)) {
                $matcher = fn(string $seg): bool => (bool) preg_match($pattern, $seg);
            } 

            if (self::performMatch($matcher, $segments)) {
                return $toInclude;
            }
        }
        return !$toInclude;
    }

    public function accept(): bool{
        $filename = $this->current()->getFilename();
        $pathname = $this->current()->getPathname();

        if (!self::respectFilters($pathname, $this->dirFilesToExclude, false)) return false;
        
        if ($this->getType() === "dir") return true;

        if((self::respectFilters($pathname, $this->dirToInclude, true) || empty($this->dirToInclude)) 
            && !empty($this->targetFiles)) return self::respectFilters($filename, $this->targetFiles, true);


        return false;
    }

    public function getChildren(): \RecursiveFilterIterator{
    return new static(
        $this->getInnerIterator()->getChildren(),
        $this->dirFilesToExclude,
        $this->dirToInclude,
        $this->targetFiles,
    );
}

}
