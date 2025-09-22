package com.pokelio.Pokelio.login.controller;

import com.pokelio.Pokelio.login.dto.AuthRequest;
import com.pokelio.Pokelio.login.dto.AuthResponse;
import com.pokelio.Pokelio.login.entity.UserEntity;
import com.pokelio.Pokelio.login.service.JwtService;
import com.pokelio.Pokelio.login.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody AuthRequest request) {
        UserEntity user = userService.register(request.getEmail(), request.getFullName(), request.getPassword());
        String token = jwtService.generateToken(user.getEmail(), request.getRememberMe());
        return new AuthResponse(token, false);
    }

    @PostMapping("/login")
    public AuthResponse authenticate(@RequestBody AuthRequest request) {
        UserEntity user = userService.findByEmail(request.getEmail());

        if (user != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            String token = jwtService.generateToken(user.getEmail(), request.getRememberMe());
            return new AuthResponse(token, false);
        }
        return new AuthResponse(null, true);
    }
}
