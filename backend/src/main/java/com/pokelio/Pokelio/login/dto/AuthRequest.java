package com.pokelio.Pokelio.login.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class AuthRequest {
    private String email;
    private String fullName;
    private String password;
    private Boolean rememberMe;
}