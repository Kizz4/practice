plugins {
	java
	id("org.springframework.boot") version "3.5.3"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "com.mylearningapp.flashcard"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.flywaydb:flyway-core")
	implementation("org.flywaydb:flyway-database-postgresql")
	implementation("org.springframework.boot:spring-boot-starter-jdbc")
	
  	runtimeOnly("org.postgresql:postgresql")
	developmentOnly("org.springframework.boot:spring-boot-devtools")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

/*To choose the output directory you need to create a '*Constraint.java' somewhere in the project.
But be careful all '*Constraint.java' need to be in the same directory. */
val createFlashCardConstraint = tasks.register<CreateConstraintFileTask>("createFlashCardConstraint") {
	group = "Create constraint file";
	description = "Create a '*Constraint.java' from constraints.properties and update on change on this file";
    
	constraintPropertiesFile = layout.projectDirectory.asFileTree
            .matching{include("**/constraints.properties")}
			.getFiles().iterator().next();

	val computedDirs: Provider<List<Directory>> = providers.provider {
        val constraintJavaFiles = layout.projectDirectory.asFileTree
            .matching { include("**/*Constraint.java") }
            .files

        val constraintJavaDir: Directory =
            if (constraintJavaFiles.isEmpty())
                layout.projectDirectory.dir("src/main/java/com/mylearningapp/flashcard/domain")
            else
                objects.directoryProperty().fileValue(constraintJavaFiles.first().parentFile).get()

        val flywayConfigFiles = layout.projectDirectory.asFileTree
            .matching { include("**/FlywayPlaceholdersConfig.java") }
            .files

        val flywayConfigDir: Directory =
            if (flywayConfigFiles.isEmpty())
                layout.projectDirectory.dir("src/main/java/com/mylearningapp/flashcard/config")
            else
                objects.directoryProperty().fileValue(flywayConfigFiles.first().parentFile).get()

        listOf(constraintJavaDir, flywayConfigDir)
    }

    javaDirectories.set(computedDirs)
}


tasks.compileJava { dependsOn(createFlashCardConstraint) }
