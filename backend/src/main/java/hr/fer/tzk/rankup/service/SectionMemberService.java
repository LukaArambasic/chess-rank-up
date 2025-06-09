package hr.fer.tzk.rankup.service;

import hr.fer.tzk.rankup.model.Member;
import hr.fer.tzk.rankup.model.Rank;
import hr.fer.tzk.rankup.model.Section;
import hr.fer.tzk.rankup.model.SectionMember;
import hr.fer.tzk.rankup.repository.SectionMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SectionMemberService {

    private final SectionMemberRepository sectionMemberRepository;
    private final MemberService memberService;
    private final SectionService sectionService;
    private final RankService rankService;

    @Autowired
    public SectionMemberService(SectionMemberRepository sectionMemberRepository, MemberService memberService, SectionService sectionService, RankService rankService) {
        this.sectionMemberRepository = sectionMemberRepository;
        this.memberService = memberService;
        this.sectionService = sectionService;
        this.rankService = rankService;
    }

    public List<SectionMember> findAllSectionMembersByIdSection(Long idSection) {
        return sectionMemberRepository.findAllBySection_Id(idSection);
    }

    public List<SectionMember> findAllSectionMembersByIdMember(Long idMember) {
        return sectionMemberRepository.findAllByMember_Id(idMember);
    }

    public Optional<SectionMember> findSectionMemberByIdSection(Long idMember, Long idSection) {
        return sectionMemberRepository.findSectionMemberByMember_IdAndSection_Id(idMember, idSection);
    }

    public Optional<SectionMember> createSectionMemberFromJmbagAndRank(Long idSection, String jmbag, String rankName) {
        Optional<Member> memberOpt = memberService.findMemberByJmbag(jmbag.strip());
        Optional<Section> sectionOpt = sectionService.findSectionById(idSection);
        Optional<Rank> rankOpt = rankService.findRankByNameAndSection_Id(rankName, idSection);

        if (memberOpt.isEmpty() || sectionOpt.isEmpty() || rankOpt.isEmpty()) {
            return Optional.empty();
        }
        SectionMember member = new SectionMember();
        member.setMember(memberOpt.get());
        member.setSection(sectionOpt.get());
        member.setRank(rankOpt.get());
        return Optional.of(sectionMemberRepository.save(member));
    }
    public SectionMember update(SectionMember sectionMember) {
        return sectionMemberRepository.save(sectionMember);
    }

    public List<SectionMember> createSectionMembersMultiple(Long sectionId, List<Member> members, String rank) {
        List<String> jmbags = members.stream().map(Member::getJmbag).toList();
        return jmbags.stream().map(jmbag -> createSectionMemberFromJmbagAndRank(sectionId, jmbag, rank).orElse(null)).toList();
    }


    public SectionMember deleteSectionMemberBySectionIdAndMemberId(Long sectionId, Long memberId) {
        SectionMember sectionMember = sectionMemberRepository.findSectionMemberByMember_IdAndSection_Id(memberId, sectionId).orElseThrow();
        sectionMemberRepository.delete(sectionMember);
        return sectionMember;
    }
}
