<?php 
enum Status: string {
    case Done = 'done';
    case OnGoing = 'on going';
    case NotFinished = 'not started';
}

class DynamicContentModifier{
    const ROOT_URL_GITHUB_PAGES = "https://kizz4.github.io/";
    const STATUS_LABEL = ['done' => '✅ Done', 'on going' => '▶️ In Progress', 'not started' => '⏳ Not Started'];
    private string $rootPath;
    private FactoryRecursiveItIt $factoryIterator;

    public function __construct(string $rootPath){
        $this->rootPath = $rootPath;
        $this->factoryIterator = new FactoryRecursiveItIt($rootPath);
    }

    private function findFileContent(string $dirPath, array $targetFiles): array{
        $this->factoryIterator->setFilters(dirFilesToExclude:[], targetFiles:$targetFiles, maxDepth:0);
        $this->factoryIterator->setPath($dirPath);
        $it = $this->factoryIterator->getIterator();

        //a unique file is expected so we return it immediatly
        foreach($it as $file){
            $content = file_get_contents($file->getPathname());
            $normalizedContent = normalizeString($content);
            if ($normalizedContent === '')  return [];
            return explode("\n", $normalizedContent);
        }

        return [];
    }

    //will search .toInclude file and read his content in the directory given
    private function findDirToInclude(string $dirPath): array{return self::findFileContent($dirPath, [".toInclude"]);}

    //will search .gitignore file and read his content in the directory given
    private function findDirToExclude(string $dirPath, bool $skipHiddenFile = true): array{
        $dirToExclude = self::findFileContent($dirPath, [".gitignore", ".toExclude"]);
        if($skipHiddenFile) array_push($dirToExclude, ".*");
        return $dirToExclude;
    }

    private function findDirNames(string $dirPath, int $maxDepth=-1, bool $skipHiddenFile = true): array{
        $dirToInclude = self::findDirToInclude($dirPath);
        $dirToExclude = self::findDirToExclude($dirPath, $skipHiddenFile);

        $this->factoryIterator->setFilters(dirFilesToExclude: $dirToExclude, 
                                            dirToInclude:$dirToInclude, 
                                            targetFiles: [],
                                            maxDepth: $maxDepth);
        $it = $this->factoryIterator->getIterator(flagsRecursiveItIt:RecursiveIteratorIterator::SELF_FIRST);

        $dirNames = [];

        foreach($it as $folderName){
            $dirNames[] = $folderName->getFilename();
        }

        return $dirNames;
    }

    private function findStatus(string $name): string {
        
        foreach (Status::cases() as $status) {
            $pattern = ".*" . $name . "[[:space:]]*(is|:)[[:space:]]*" . $status->value;
            $command = "cd " . escapeshellarg($this->rootPath)
                    . " && git log --extended-regexp --regexp-ignore-case"
                    . " --grep=" . escapeshellarg($pattern)
                    . " --oneline";

            echo "output : $output\n\n";
            $output = shell_exec($command);
            if(!empty($output)) return $status->value;
        }

        return "not started";
    }

    private function getReadMeIterator(string $dirPath, array $dirToExclude=[".*", "node_modules"], $maxDepth=0){  
        $this->factoryIterator->setFilters(dirFilesToExclude:$dirToExclude, 
                                            targetFiles:["README.md"],
                                            maxDepth: $maxDepth);
        $this->factoryIterator->setPath($dirPath);

        return $this->factoryIterator->getIterator();
    }



    public function updateOneRepoOverviewContent_ReadMe(string $dirPath){

        $columnsName = ["Sub-Repo Name", "🔗 Link to the GitHub Page", "Status"];
        $dirNames = self::findDirNames($dirPath, maxDepth:0);
        $rows = [];
        foreach($dirNames as $subRepoName){
            $betterSubRepoName = ucwords(str_replace("_", " ", $subRepoName));
            $status = self::STATUS_LABEL[self::findStatus($subRepoName)];
            
            $row = [$betterSubRepoName, "[Link](".self::ROOT_URL_GITHUB_PAGES.")$dirPath/$subRepoName", $status];
            array_push($rows, $row);
        }
        $content = arrayToTableString($columnsName, $rows);
        $tags = ["<!-- START REPO OVERVIEW -->", "<!-- END REPO OVERVIEW -->"];

        $it = self::getReadMeIterator($dirPath, dirToExclude: [".*", "node_modules", ...$dirNames]);

        FileInjector::inject([$content], $tags, $it);
    }


     public function updateOneProjectStructureContentReadMe(string $dirPath){
        $it = self::getReadMeIterator($dirPath);

        $dirPart = strrpos($dirPath, "/");   
        $dirName = substr($dirPath, $dirPart+1, strlen($dirPath));

        $this->factoryIterator->setFilters(dirFilesToExclude:self::findDirToExclude($dirPath),
                                        dirToInclude:self::findDirToInclude($dirPath),
                                        targetFiles:["*"],
                                        maxDepth:-1);

        $treeIt = $this->factoryIterator->getIterator();
        
        $treeBuilder = new FileTreeBuilder();
        $treeBuilder->makeTree($dirName, $treeIt);

        $content = "```" . $treeBuilder->toString() . "```";
        $tags = ["<!-- START PROJECT STRUCTURE -->", "<!-- END PROJECT STRUCTURE -->"];


        FileInjector::inject([$content], $tags, $it);
    }


    public function updateAllContent(string $rootRepoPath, 
        bool $updateRepoOverview=true, 
        bool $updateProjectStructure=true,
        bool $updateHtml=false): void
        {

        if($updateHtml) self::updateCommonHTMLTags();

        if(!($updateRepoOverview || $updateProjectStructure)) return;

        $it = self::getReadMeIterator($rootRepoPath, maxDepth:-1);
        foreach($it as $readMeFile){
            $pathFile = $readMeFile->getPathname();
            $filePart = strrpos($pathFile, "/");   
            $dirPath = substr($pathFile, 0, $filePart);

            if($updateRepoOverview) self::updateOneRepoOverviewContent_ReadMe($dirPath);
            if($updateProjectStructure) self::updateOneProjectStructureContentReadMe($dirPath);
        }
    }

    
    public function updateCommonHTMLTags():void{
        $this->factoryIterator->setFilters(dirFilesToExclude:[".*", "node_modules"], targetFiles:["*.html"]);
        $iterator = $this->factoryIterator->getIterator();
        $tags = ["<!-- START COMMON HEAD -->", "<!-- END COMMON HEAD -->", "<!-- START COMMON IMG -->", "<!-- END COMMON IMG -->"];
        $contentToInject = [
        '<link rel="icon" href="/frontend_practice/common/img/icon_onglet.png" type="image/png">\n<link rel="stylesheet" href="/frontend_practice/common/font/font.css">',
        '<img src="/frontend_practice/common/img/icon_onglet.png" alt="icon of a salary man">'
        ];
        FileInjector::inject($contentToInject, $tags, $iterator);
    }   


}

?>