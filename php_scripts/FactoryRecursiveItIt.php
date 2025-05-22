<?php
class FactoryRecursiveItIt{
    private string $path;
    private array $dirFilesToExclude;
    private array  $dirToInclude;
    private array $targetFiles;
    private int $maxDepth;

    public function __construct(string $path, array $dirFilesToExclude = [], array $dirToInclude = [], array $targetFiles = [], int $maxDepth = -1){
        $this->path = $path;
        $this->dirFilesToExclude = $dirFilesToExclude;
        $this->dirToInclude = $dirToInclude;
        $this->targetFiles = $targetFiles;
        $this->maxDepth = $maxDepth;
    }

    public function getPath(): string{return $this->path;}
    public function getDirFilesToExclude(): array{return $this->dirFilesToExclude;}
    public function getDirToInclude(): array{return $this->dirToInclude;}
    public function getTargetFiles(): array{return $this->targetFiles;}
    public function getFilters(): array{return [$this->dirFilesToExclude, $this->targetFiles, $this->dirToInclude];}
    public function getMaxDepth(): int{return $this->maxDepth;}


    public function getIterator(int $flagsRecursiveItIt = RecursiveIteratorIterator::LEAVES_ONLY, 
        int $flagsDirIt = FilesystemIterator::SKIP_DOTS): RecursiveIteratorIterator
    {
            return self::createIterator($flagsRecursiveItIt, $flagsDirIt);
    }

    public function setPath(string $path): void{$this->path = $path;}
    public function setDirFilesToExclude(array $dirFilesToExclude): void{$this->dirFilesToExclude = $dirFilesToExclude;}
    public function setDirToInclude(array $dirToInclude): void{$this->dirToInclude = $dirToInclude;}
    public function setTargetFiles(array $targetFiles): void{ $this->targetFiles = $targetFiles;}
    public function setMaxDepth(int $maxDepth):void{$this->maxDepth = $maxDepth;}

    public function setFilters(?array $dirFilesToExclude = null, ?array $targetFiles = null, ?array $dirToInclude = null, ?int $maxDepth = null): void{ 
        if($dirFilesToExclude !== null) self::setdirFilesToExclude($dirFilesToExclude);
        if($dirToInclude !== null) self::setDirToInclude($dirToInclude);
        if($targetFiles !== null) self::setTargetFiles($targetFiles);
        if($maxDepth !== null) self::setMaxDepth($maxDepth);
    }

    
    private function createIterator(int $flagsRecursiveItIt, int $flagsDirIt): RecursiveIteratorIterator{
        $dirIterator = new \RecursiveDirectoryIterator($this->path, $flagsDirIt);
        $filterIterator = new CustomRecursiveFilterIterator($dirIterator, 
            dirFilesToExclude:$this->dirFilesToExclude, 
            dirToInclude:$this->dirToInclude, 
            targetFiles:$this->targetFiles);

        $iterator = new \RecursiveIteratorIterator($filterIterator, $flagsRecursiveItIt);
        $iterator->setMaxDepth($this->maxDepth);
        return $iterator;
    }
}   
?>