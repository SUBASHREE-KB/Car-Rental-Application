package com.example.car_rental.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.util.Date;
import org.springframework.stereotype.Component;
import com.example.car_rental.dto.AuthDto;

@Component
public class JwtTokenUtil {

    // Use a long random string or use the secretKeyFor method
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private static final long EXPIRATION_TIME = 7200000; // 2 hours in milliseconds

    // Return the generated SecretKey
    private SecretKey getSecretKey() {
        return SECRET_KEY;
    }

    public String generateToken(AuthDto authDto) {
        return Jwts.builder()
                .claim("userId", authDto.getUserId())
                .claim("role", authDto.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSecretKey())
                .compact();
    }

    public Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public int getUserIdFromToken(String token) {
        return getClaimsFromToken(token).get("userId", Integer.class);
    }

    public String getRoleFromToken(String token) {
        return getClaimsFromToken(token).get("role", String.class);
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            return !isTokenExpired(claims);
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isTokenExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }

    public boolean isTokenExpired(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            return isTokenExpired(claims);
        } catch (Exception e) {
            return true; // Assume expired if token is invalid
        }
    }
}
