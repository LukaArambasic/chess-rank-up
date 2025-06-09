package hr.fer.tzk.rankup.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SectionForm {
    @NotBlank(message = "Name is missing")
    @Size(max = 30)
    private String name;

    @Size(max = 500)
    private String description;

    @Size(max = 80)
    private String logo;
}
