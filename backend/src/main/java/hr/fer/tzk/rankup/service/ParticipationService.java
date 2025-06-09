package hr.fer.tzk.rankup.service;

import hr.fer.tzk.rankup.form.SingleParticipationForm;
import hr.fer.tzk.rankup.model.*;
import hr.fer.tzk.rankup.repository.EventRepository;
import hr.fer.tzk.rankup.repository.MemberRepository;
import hr.fer.tzk.rankup.repository.ParticipationRepository;
import hr.fer.tzk.rankup.utils.JmbagUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ParticipationService {
    private final ParticipationRepository participationRepository;
    private final MemberRepository memberRepository;
    private final EventRepository eventRepository;
    private final SectionMemberService sectionMemberService;
    private final SectionSemesterService sectionSemesterService;
    private final SemesterService semesterService;

    @Autowired
    public ParticipationService(ParticipationRepository participationRepository, MemberRepository memberRepository, EventRepository eventRepository, SectionMemberService sectionMemberService, SemesterService semesterService, SectionSemesterService sectionSemesterService) {
        this.participationRepository = participationRepository;
        this.eventRepository = eventRepository;
        this.memberRepository = memberRepository;
        this.sectionMemberService = sectionMemberService;
        this.semesterService = semesterService;
        this.sectionSemesterService = sectionSemesterService;
    }

    public List<Participation> findAllParticipations() {
        return participationRepository.findAll();
    }

    public List<Participation> findAllParticipationsByEventId(Long eventId) {
        return participationRepository.findAllByEvent_Id(eventId);
    }

    public List<Participation> findAllParticipationsByMemberId(Long memberId) {
        return participationRepository.findAllByMember_Id(memberId);
    }

    public Participation findParticipationById(Long participationId) {
        return participationRepository.findById(participationId).orElse(null);
    }

    public List<Member> findAllWhoPassedThreshold(Long threshold, Long sectionId, Long semesterId) {
        Semester semester = semesterService.findSemesterById(semesterId).orElseThrow();
        List<Member> members = sectionMemberService.findAllSectionMembersByIdSection(sectionId).stream().map(SectionMember::getMember).toList();
        members = members.stream()
                .filter(member -> {
                    Integer count = findAllParticipationsByMemberId(member.getId())
                            .stream()
                            .filter(participation -> participation.getEvent().getDate().isAfter(semester.getDateFrom())
                                    && participation.getEvent().getDate().isBefore(semester.getDateTo())
                                    && participation.getEvent().getSection().getId().equals(sectionId)
                            )
                            .map(participation -> participation.getEvent().getEventType().getDefaultPoints())
                            .reduce(0, Integer::sum);
                    return count >= threshold;
                })
                .toList();
        return members;
    }



    public Participation createParticipation(Participation participation) {
        return participationRepository.save(participation);
    }

    public Participation createParticipation(Long sectionId, SingleParticipationForm form) {
        Member member = memberRepository.findById(form.getMemberId()).orElseThrow();
        Event event = eventRepository.findById(form.getEventId()).orElseThrow();

        SectionMember sectionMember = sectionMemberService.findSectionMemberByIdSection(member.getId(),sectionId).orElseThrow();
        sectionMember.setPointsAll(sectionMember.getPointsAll() + event.getEventType().getDefaultPoints());

        Semester semester = semesterService.findSemesterByDate(event.getDate()).orElseThrow();
        SectionSemester sectionSemester = sectionSemesterService.findSectionSemesterByAlterKey(member.getId(),sectionId,semester.getId()).orElseThrow();
        sectionSemester.setPoints(sectionSemester.getPoints() + event.getEventType().getDefaultPoints());

        Participation participation = new Participation();
        participation.setMember(member);
        participation.setEvent(event);
        participation = participationRepository.save(participation);
        sectionSemesterService.update(sectionSemester);
        sectionMemberService.update(sectionMember);

        return participationRepository.save(participation);
    }

    public List<Participation> createMultipleParticipations(Long sectionId, Long eventId, MultipartFile file) throws IOException {
        List<String> jmbags = readJmbagsFromFile(file);
        Event event = eventRepository.findById(eventId).orElseThrow();

        List<Participation> participations = jmbags.stream()
                .map(jmbag-> memberRepository.findByJmbag(jmbag.strip()).orElse(null))
                .filter(Objects::nonNull)
                .map(member -> {
                    Participation participation = new Participation();
                    participation.setEvent(event);
                    participation.setMember(member);
                    return participation;
                }).toList();

        List<String> tmpJmbags = new ArrayList<>();
        participations = participations.stream().filter(participation -> {

            boolean contains = tmpJmbags.contains(participation.getMember().getJmbag());
            if (!contains) {
                tmpJmbags.add(participation.getMember().getJmbag());
                return true;
            }
            return false;
        }).toList();
        participations.forEach(participation -> {
            SectionMember sectionMember = sectionMemberService.findSectionMemberByIdSection(participation.getMember().getId(), sectionId).orElseThrow();
            sectionMember.setPointsAll(sectionMember.getPointsAll() + event.getEventType().getDefaultPoints());

            Semester semester = semesterService.findSemesterByDate(event.getDate()).orElseThrow();
            SectionSemester sectionSemester = sectionSemesterService.findSectionSemesterByAlterKey(participation.getMember().getId(),sectionId,semester.getId()).orElseThrow();
            sectionSemester.setPoints(sectionSemester.getPoints() + event.getEventType().getDefaultPoints());

            participationRepository.save(participation);
            sectionMemberService.update(sectionMember);
            sectionSemesterService.update(sectionSemester);
        });

        return participations;
    }



    public Participation updateParticipation(Participation participation) {
        return participationRepository.save(participation);
    }

    public Participation deleteParticipation(Participation participation) {
        participationRepository.delete(participation);
        return participation;
    }
    public Participation deleteParticipationById(Long sectionId, Long participationId) {
        Participation participation = participationRepository.findById(participationId).orElseThrow();

        SectionMember sectionMember = sectionMemberService.findSectionMemberByIdSection(participation.getMember().getId(), sectionId).orElseThrow();
        sectionMember.setPointsAll(sectionMember.getPointsAll() - participation.getEvent().getEventType().getDefaultPoints());

        Semester semester = semesterService.findSemesterByDate(participation.getEvent().getDate()).orElseThrow();
        SectionSemester sectionSemester = sectionSemesterService.findSectionSemesterByAlterKey(participation.getMember().getId(), sectionId, semester.getId()).orElseThrow();
        sectionSemester.setPoints(sectionSemester.getPoints() - participation.getEvent().getEventType().getDefaultPoints());

        participationRepository.deleteById(participationId);
        sectionMemberService.update(sectionMember);
        sectionSemesterService.update(sectionSemester);


        return participation;
    }
    public Participation deleteParticipationByEventIdAndMemberId(Long sectionId, Long eventId, Long memberId) {
        Participation participation = participationRepository.findByEvent_IdAndMember_Id(eventId, memberId);
        return deleteParticipationById(sectionId, participation.getIdParticipation());
    }
    public List<Participation> deleteAllParticipationsByEventId(Long sectionId, Long eventId) {
        List<Participation> participations = participationRepository.findAllByEvent_Id(eventId);
        participations.forEach(participation -> deleteParticipationById(sectionId, participation.getIdParticipation()));
        return participations;
    }

    private List<String> readJmbagsFromFile(MultipartFile file) throws IOException {
        String type = file.getContentType();
        assert type != null;

        List<String> jmbags = null;
        if (type.equals("application/octet-stream") || type.equals("text/plain")) {
            byte[] textBytes = file.getBytes();
            String textString = new String(textBytes);
            jmbags = List.of(textString.split("\n"));
        } else if (type.equals("text/csv")) {
            byte[] textBytes = file.getBytes();
            String textString = new String(textBytes);
            List<String> tmp = List.of(textString.split("\n"));

            jmbags = tmp.stream()
                    .map(line -> {
                        List<String> chunks = List.of(line.split(","));
                        String jmbag = null;
                        for (String chunk: chunks) {
                            if (chunk.contains("0036") || chunk.contains("0069") || chunk.contains("0062")  || chunk.contains("0246")) {
                                jmbag = chunk;
                            } else if (chunk.startsWith("36") || chunk.startsWith("69") || chunk.startsWith("62")) {
                                jmbag = "00"+chunk;
                            } else if (chunk.startsWith("246")) {
                                jmbag = "0" + chunk;
                            }
                        }
                        return jmbag;
                    }).toList();
        }

        assert jmbags != null;
        return jmbags;
    }

    public List<SectionSemester> getPointsAllMembers(Long semesterId, Long sectionId) {
        Semester semester = semesterService.findSemesterById(semesterId).orElseThrow();
        List<SectionMember> sectionMembers = sectionMemberService.findAllSectionMembersByIdSection(sectionId);
        List<Member> members = sectionMembers.stream().map(SectionMember::getMember).toList();
        members.forEach(member-> {
            SectionMember sectionMember = sectionMemberService.findSectionMemberByIdSection(member.getId(), sectionId).orElseThrow();
            SectionSemester sectionSemester = sectionSemesterService.findSectionSemesterByAlterKey(member.getId(), sectionId, semesterId).orElse(null);
            if (sectionSemester!=null && sectionMember != null) {
                sectionSemester.setPoints(getPointsByMemberBySemester(sectionId, member.getId(), semester));
                sectionMember.setPointsAll(getPointsAllByMember(sectionId, member.getId()));
                sectionSemesterService.update(sectionSemester);
            }

        });
        return null;
    }

    private Integer getPointsByMemberBySemester(Long sectionId, Long memberId, Semester semester) {
        List<Participation> participations = participationRepository.findAllByMember_Id(memberId);
        List<Event> participatedEvents = participations.stream().map(Participation::getEvent).toList();
        return participatedEvents.stream()
                .filter(event -> event.getDate().isAfter(semester.getDateFrom()) && event.getDate().isBefore(semester.getDateTo()))
                .filter(event -> event.getSection().getId().equals(sectionId))
                .map(event -> event.getEventType().getDefaultPoints())
                .reduce(Integer::sum).orElse(0);
    }

    private Integer getPointsAllByMember(Long sectionId, Long memberId) {
        List<Participation> participations = participationRepository.findAllByMember_Id(memberId);
        return participations.stream()
                .map(Participation::getEvent)
                .filter(event -> event.getSection().getId().equals(sectionId))
                .map(Event::getEventType)
                .map(EventType::getDefaultPoints)
                .reduce(Integer::sum).orElse(0);

    }
}
