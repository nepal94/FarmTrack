package com.farmtrack.auth.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
@Service
public class JwtService {

    private final String SECRET = "4hfwEXqdoC1DfwDpJWw3uwUHOFCYz2MwT1IdYVmOHKJfQ9HTRCZkb0Kiw4aGjD10ryKmhFVGE4Y6GnvTftt8bA==";
    private static final long EXPIRATION = 1000 * 60 * 60; // 1 hour

    public String generateToken(String username) {
        byte[] decodedKey = Base64.getDecoder().decode(SECRET);
        SecretKey key = new SecretKeySpec(decodedKey, SignatureAlgorithm.HS512.getJcaName());

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }
}
