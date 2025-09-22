package com.pokelio.Pokelio.login.dto;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class AuthResponse {
    private String token;
    private Boolean isPasswordOrUserInvalid;
}
