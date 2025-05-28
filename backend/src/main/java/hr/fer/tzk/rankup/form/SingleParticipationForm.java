package hr.fer.tzk.rankup.form;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SingleParticipationForm {
    @NotNull(message = "Must specify member")
    private Long memberId;

    @NotNull(message = "Must specify event")
    private Long eventId;
}
