package hr.fer.tzk.rankup.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SemesterForm {
    @NotBlank(message = "Name should be longer")
    private String name;

    @NotNull(message = "Date should be set")
    private LocalDate dateFrom;

    @NotNull(message = "Date should be set")
    private LocalDate dateTo;
}
