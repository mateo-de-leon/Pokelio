package com.pokelio.Pokelio.login.service;

import com.pokelio.Pokelio.login.entity.UserEntity;
import com.pokelio.Pokelio.login.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserEntity register(String email, String fullName, String password) {
        UserEntity user = UserEntity.builder()
                .email(email)
                .fullName(fullName)
                .password(passwordEncoder.encode(password))
                .build();
        return userRepository.save(user);
    }

    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
