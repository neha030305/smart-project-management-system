package com.smartprojectms.security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
	 private final String SECRET = "mysecretkeymysecretkeymysecretkey"; // 32+ chars
	    private final long EXPIRATION = 1000 * 60 * 60; // 1 hour

	    private Key getSignKey() {
	        return Keys.hmacShaKeyFor(SECRET.getBytes());
	    }

	    public String generateToken(String email) {
	        return Jwts.builder()
	                .setSubject(email)
	                .setIssuedAt(new Date())
	                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
	                .signWith(getSignKey(), SignatureAlgorithm.HS256)
	                .compact();
	    }

	    public String extractEmail(String token) {
	        return Jwts.parserBuilder()
	                .setSigningKey(getSignKey())
	                .build()
	                .parseClaimsJws(token)
	                .getBody()
	                .getSubject();
	    }

}

