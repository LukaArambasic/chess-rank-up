package hr.fer.tzk.rankup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipationDto {
    private Long id;
    private DetailedMemberDto memberDto;
    private EventDto eventDto;
}
