package hr.fer.tzk.rankup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private BasicMemberDto user;
    private String token;
    private String error;
    private Long id;
    private boolean isSuperAdmin = false;
}
