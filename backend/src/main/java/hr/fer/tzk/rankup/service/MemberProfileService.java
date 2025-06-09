package hr.fer.tzk.rankup.service;

import hr.fer.tzk.rankup.dto.ActivityPageDto;
import hr.fer.tzk.rankup.dto.ProfileEventDto;
import hr.fer.tzk.rankup.dto.ProfileGeneralInfoDto;
import hr.fer.tzk.rankup.mapper.ParticipationMapper;
import hr.fer.tzk.rankup.model.*;
import hr.fer.tzk.rankup.repository.ParticipationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberProfileService {

    private final MemberService memberService;
    private final SectionMemberService sectionMemberService;
    private final SemesterService semesterService;
    private final SectionSemesterService sectionSemesterService;
    private final ParticipationRepository participationRepository;

    @Autowired
    public MemberProfileService(MemberService memberService, SectionMemberService sectionMemberService, SemesterService semesterService, SectionSemesterService sectionSemesterService, ParticipationRepository participationRepository) {
        this.memberService = memberService;
        this.sectionMemberService = sectionMemberService;
        this.semesterService = semesterService;
        this.sectionSemesterService = sectionSemesterService;
        this.participationRepository = participationRepository;
    }

    public ProfileGeneralInfoDto getGeneralProfileInfo(Long idSection, Long idMember) {
        Optional<SectionMember> sectionMemberOpt = sectionMemberService.findSectionMemberByIdSection(idMember, idSection);
        //System.out.println("1");
        if (sectionMemberOpt.isEmpty()) {
            return null;
        }
        //System.out.println("2");

        SectionMember sectionMember = sectionMemberOpt.get();
        //System.out.println("Sekcija: " + sectionMember.getSection().getName());

        Optional<Semester> currentSemesterOpt = semesterService.findCurrentSemester();
        Optional<Semester> latestSemesterOpt = semesterService.findLatestSemester();
        Semester semester;
        if (currentSemesterOpt.isEmpty()) {
            if (latestSemesterOpt.isEmpty()) {
                return null;
            }
            semester = latestSemesterOpt.get();
        } else {
            semester = currentSemesterOpt.get();
        }

        //System.out.println("3");

        Long idSemester = semester.getId();
        Optional<SectionSemester> sectionSemesterOpt = sectionSemesterService.findSectionSemesterByAlterKey(idMember, idSection, idSemester);
        int pointsModifier;
        int threshold;
        int pointsSemester;

        if (sectionSemesterOpt.isEmpty()) {
            return null;
        }
        //System.out.println("4");

        SectionSemester sectionSemester = sectionSemesterOpt.get();
        pointsModifier = sectionMember.getRank().getPointsModifier();
        threshold = sectionSemester.getThreshold();
        pointsSemester = sectionSemester.getPoints();
        ProfileGeneralInfoDto profileGeneralInfo = new ProfileGeneralInfoDto();
        profileGeneralInfo.setSectionId(sectionMember.getSection().getId());
        profileGeneralInfo.setFirstName(sectionMember.getMember().getFirstName());
        profileGeneralInfo.setLastName(sectionMember.getMember().getLastName());
        profileGeneralInfo.setJmbag(sectionMember.getMember().getJmbag());
        profileGeneralInfo.setRankName(sectionMember.getRank().getName());
        //System.out.println("sectionMember: " + sectionMember.getMember().getLastName() + ' ' + sectionMember.getPointsAll());
        profileGeneralInfo.setPointsTotal(sectionMember.getPointsAll());
        profileGeneralInfo.setPointsSemester(pointsSemester);
        profileGeneralInfo.setAdditionalPointsNeeded(Math.max(threshold - pointsModifier - pointsSemester, 0));
        return profileGeneralInfo;
    }

    public ActivityPageDto getActivityPage(Long idSection, Long idMember) {
        //System.out.println("\n\nLet's start");
        Optional<SectionMember> sectionMemberOpt = sectionMemberService.findSectionMemberByIdSection(idMember, idSection);
        if (sectionMemberOpt.isEmpty()) {
            return null;
        }
        SectionMember sectionMember = sectionMemberOpt.get();

        Member member = sectionMember.getMember();
        //System.out.println("Section id: " + idSection + ", Member id: " + idMember);
        List<Participation> participations = participationRepository.findAllByMember_Id(idMember);
        //System.out.println("Here");
        List<ProfileEventDto> events = participations.stream()
                .filter(participation -> participation.getEvent().getSection().getId().equals(idSection))
                .map(ParticipationMapper::toProfileDto)
                .toList();

        String firstName = member.getFirstName();
        String lastName = member.getLastName();

        ActivityPageDto activityPage = new ActivityPageDto();
        activityPage.setFirstName(firstName);
        activityPage.setLastName(lastName);
        activityPage.setEvents(events);

        return activityPage;
    }
}
