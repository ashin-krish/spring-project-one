package com.example.projectone.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
public class MyCorsConfiguration
{
    @Bean
    public CorsConfigurationSource corsConfigurationSource()
    {
       CorsConfiguration corsConfiguration = new CorsConfiguration();

       corsConfiguration.setAllowedOrigins(List.of("http://localhost:5173"));
       corsConfiguration.setAllowedMethods(List.of("POST","GET","PUT","DELETE"));
       corsConfiguration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();

        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**",corsConfiguration);

        return urlBasedCorsConfigurationSource;



    }
}
