package hr.fer.tzk.rankup.mapper;

import hr.fer.tzk.rankup.dto.ScoreboardDto;
import hr.fer.tzk.rankup.dto.SectionMemberDto;
import hr.fer.tzk.rankup.model.SectionMember;

public class SectionMemberMapper {

    public static SectionMemberDto toDto(SectionMember sectionMember) {
        if (sectionMember == null) {
            return null;
        }
        
        SectionMemberDto dto = new SectionMemberDto();
        dto.setSectionId(sectionMember.getSection().getId());
        dto.setMemberId(sectionMember.getMember().getId());
        dto.setFirstName(sectionMember.getMember().getFirstName());
        dto.setLastName(sectionMember.getMember().getLastName());
        dto.setEmail(sectionMember.getMember().getEmail());
        dto.setJmbag(sectionMember.getMember().getJmbag());
        dto.setActive(sectionMember.isActive());
        dto.setPointsTotal(sectionMember.getPointsAll());
        dto.setRank(sectionMember.getRank().getName());
        dto.setSection(sectionMember.getSection().getName());
        
        return dto;
    }

    public static ScoreboardDto toScoreboardDto(SectionMember sectionMember) {
        if (sectionMember == null) {
            return null;
        }

        ScoreboardDto scoreboardDto = new ScoreboardDto();
        scoreboardDto.setFirstName(sectionMember.getMember().getFirstName());
        scoreboardDto.setLastName(sectionMember.getMember().getLastName());
        scoreboardDto.setPoints(sectionMember.getPointsAll());

        return scoreboardDto;
    }
}
