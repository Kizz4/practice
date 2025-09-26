import org.gradle.api.DefaultTask
import org.gradle.api.file.DirectoryProperty
import org.gradle.api.file.RegularFileProperty
import org.gradle.api.file.ConfigurableFileCollection
import org.gradle.api.file.Directory
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.InputFile
import org.gradle.api.tasks.*
import org.gradle.api.provider.ListProperty
import java.io.File


abstract class CreateConstraintFileTask : DefaultTask() {

    @get:InputFile
    abstract val constraintPropertiesFile: RegularFileProperty

    @get:OutputDirectories
    abstract val javaDirectories: ListProperty<Directory>

	@TaskAction
    fun run() {   
        val constraintPropertiesFile = constraintPropertiesFile.get().asFile
        /*First directory is for *Constraint.java while the other one is for FlywayPlaceholderConfig.java */
        val charset = Charsets.UTF_8
        val original: String = constraintPropertiesFile.readText(charset)
        println(getMapConstraintNameValue(original))
        createFiles(getMapConstraintNameValue(original))
    }

    fun cleanConstraintPropertiesText(text : String) : String{
        var cleanText = text.replace(Regex("""(?m)^\s*#.*\R?$"""), "")/*remove all commented row  */
        cleanText = cleanText.replace(Regex("""(?m)^\s*|\z$"""), "")/*remove all blank row */
        return cleanText;
    }


    fun getMapConstraintNameValue(text : String) : Map<String, Map<String, Int>>{
        val cleanText = cleanConstraintPropertiesText(text)
        val regex = Regex("""(?m)^\s*(?<entity>.*)\.(?<name>.*)=(?<value>.*)$""")
        val linesRegex = regex.findAll(cleanText)

        val mapConstraintNameValue =  buildMap<String, MutableMap<String, Int>>{
            for(match in linesRegex){
                val entity = match.groups["entity"]!!.value
                val name = match.groups["name"]!!.value.trim()
                val value = match.groups["value"]!!.value.toInt()
                val innerMap = getOrPut(entity) { mutableMapOf() }
                innerMap[name] = value
            }         
        }

        return mapConstraintNameValue;
    }

    fun createFiles(entitiesConstraints : Map<String, Map<String, Int>>) : Unit{
        val constraintDirectoryPath = javaDirectories.get()[0].asFile.absolutePath
        val constraintPackageBaseName = findPackageBaseName(constraintDirectoryPath)
        
        val configDirectoryPath = javaDirectories.get()[1].asFile.absolutePath
        val configFile = File(configDirectoryPath+ "/FlywayPlaceholdersConfig.java")
        val configPackageBaseName = findPackageBaseName(configDirectoryPath)
        configFile.getParentFile().mkdirs()
        var configText = """package $configPackageBaseName;
@org.springframework.context.annotation.Configuration
public class FlywayPlaceholdersConfig
    implements org.springframework.boot.autoconfigure.flyway.FlywayConfigurationCustomizer {

  @Override public void customize(org.flywaydb.core.api.configuration.FluentConfiguration config) {
    var map = new java.util.HashMap<>(config.getPlaceholders());
    """

        for((entityName, mapNameValue) in entitiesConstraints){
            val constraintFile = File(constraintDirectoryPath + "/${entityName}Constraint.java")
            constraintFile.getParentFile().mkdirs()
            var constraintText = """package $constraintPackageBaseName; 
    public final class ${entityName}Constraint {
    private ${entityName}Constraint() {};"""
            for((name, value) in mapNameValue){
                configText += "map.put(\"${name.lowercase()}\",\"$value\");\n\t\t"
                constraintText += "\n\t\tpublic static final int $name=$value;"
            }
            constraintText+= "\n}"
            constraintFile.writeText(constraintText)
        }
        configText += """config.placeholders(map);}}"""
        configFile.writeText(configText)
    }

    


    fun findPackageBaseName(filePath:String) : String{
        /*assuming that all java files are in a directory named java*/
        val javaIndex = filePath.lastIndexOf("java") + 5 /* + 5 to get rid of "java/" */
        return filePath.substring(javaIndex, filePath.length).replace("/", ".")
    }

}




