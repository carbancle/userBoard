package com.carbancle.userBoard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.carbancle.userBoard.jwt.JwtAccessDeniedHandler;
import com.carbancle.userBoard.jwt.JwtAuthenticationEntryPoint;
import com.carbancle.userBoard.jwt.TokenProvider;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig {
	private final TokenProvider tokenProvider;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.httpBasic(httpBasic -> httpBasic.disable())
			.csrf(csrf -> csrf.disable())
			.sessionManagement(sessionManagement -> sessionManagement
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			)	// jwt 를 사용하는 STALELESS 방식이므로 session 을 사용하지 않음 명시
			
			.exceptionHandling(exceptionHandling -> exceptionHandling
					.authenticationEntryPoint(jwtAuthenticationEntryPoint)
					.accessDeniedHandler(jwtAccessDeniedHandler)
			)
			
			.authorizeHttpRequests((request) -> request
					.requestMatchers(
						"/", "index.html", "/static/**", "/*.ico", "/*.json", "/*.png", 
						"auth/**", "/article/**", "/recommend/**", "/comment/**"
					).permitAll()
					.anyRequest().authenticated()
			)
			
			.apply(new JwtSecurityConfig(tokenProvider));
		
		return http.build();
	}
}
