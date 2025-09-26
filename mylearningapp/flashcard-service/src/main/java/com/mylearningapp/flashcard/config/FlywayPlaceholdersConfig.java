package com.mylearningapp.flashcard.config;
@org.springframework.context.annotation.Configuration
public class FlywayPlaceholdersConfig
    implements org.springframework.boot.autoconfigure.flyway.FlywayConfigurationCustomizer {

  @Override public void customize(org.flywaydb.core.api.configuration.FluentConfiguration config) {
    var map = new java.util.HashMap<>(config.getPlaceholders());
    map.put("front_max_len","500");
		map.put("back_max_len","500");
		map.put("flashcard_type_max_len","32");
		map.put("visibility_max_len","32");
		config.placeholders(map);}}