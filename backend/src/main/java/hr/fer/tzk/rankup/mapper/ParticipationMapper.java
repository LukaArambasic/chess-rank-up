package hr.fer.tzk.rankup.mapper;

import hr.fer.tzk.rankup.dto.DetailedMemberDto;
import hr.fer.tzk.rankup.dto.EventDto;
import hr.fer.tzk.rankup.dto.ParticipationDto;
import hr.fer.tzk.rankup.dto.ProfileEventDto;
import hr.fer.tzk.rankup.model.Participation;

public class ParticipationMapper {

    public static ProfileEventDto toProfileDto(Participation participation) {
        if (participation == null) {
            return null;
        }
        int points = participation.getAddPoints() + participation.getEvent().getEventType().getDefaultPoints();

        ProfileEventDto dto = new ProfileEventDto();
        dto.setDate(participation.getEvent().getDate());
        dto.setName(participation.getEvent().getName());
        dto.setPoints(points);

        return dto;
    }

    public static ParticipationDto toDto(Participation participation) {
        DetailedMemberDto memberDto = MemberMapper.toDetailedDto(participation.getMember());
        EventDto eventDto = EventMapper.toDto(participation.getEvent());

        ParticipationDto dto = new ParticipationDto();
        dto.setId(participation.getIdParticipation());
        dto.setEventDto(eventDto);
        dto.setMemberDto(memberDto);

        return dto;
    }


}
