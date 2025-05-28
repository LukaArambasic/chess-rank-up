package hr.fer.tzk.rankup.service;

import hr.fer.tzk.rankup.form.SingleParticipationForm;
import hr.fer.tzk.rankup.model.Event;
import hr.fer.tzk.rankup.model.Member;
import hr.fer.tzk.rankup.model.Participation;
import hr.fer.tzk.rankup.model.SectionMember;
import hr.fer.tzk.rankup.repository.EventRepository;
import hr.fer.tzk.rankup.repository.MemberRepository;
import hr.fer.tzk.rankup.repository.ParticipationRepository;
import hr.fer.tzk.rankup.utils.JmbagUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Service
public class ParticipationService {
    private final ParticipationRepository participationRepository;
    private final MemberRepository memberRepository;
    private final EventRepository eventRepository;
    private final SectionMemberService sectionMemberService;

    @Autowired
    public ParticipationService(ParticipationRepository participationRepository, MemberRepository memberRepository, EventRepository eventRepository, SectionMemberService sectionMemberService) {
        this.participationRepository = participationRepository;
        this.eventRepository = eventRepository;
        this.memberRepository = memberRepository;
        this.sectionMemberService = sectionMemberService;
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

    public List<Member> findAllWhoPassedThreshold(Long threshold, Long sectionId) {
        List<Member> members = sectionMemberService.findAllSectionMembersByIdSection(sectionId).stream().map(SectionMember::getMember).toList();
        members = members.stream()
                .filter(member ->
                        findAllParticipationsByMemberId(member.getId())
                                .stream()
                                .filter(participation -> participation.getEvent().getSection().getId().equals(sectionId))
                                .count() >= threshold)
                .toList();
        return members;
    }



    public Participation createParticipation(Participation participation) {
        return participationRepository.save(participation);
    }

    public Participation createParticipation(SingleParticipationForm form) {
        Member member = memberRepository.findById(form.getMemberId()).orElseThrow();
        Event event = eventRepository.findById(form.getEventId()).orElseThrow();

        Participation participation = new Participation();
        participation.setMember(member);
        participation.setEvent(event);

        return participationRepository.save(participation);
    }

    public List<Participation> createMultipleParticipations(Long eventId, MultipartFile file) throws IOException {
        List<String> jmbags = readJmbagsFromFile(file);
        System.out.println(jmbags.size());
        Event event = eventRepository.findById(eventId).orElseThrow();

        List<Participation> participations = jmbags.stream()
                .map(jmbag-> memberRepository.findByJmbag(jmbag).orElse(null))
                .filter(Objects::nonNull)
                .map(member -> {
                    Participation participation = new Participation();
                    participation.setEvent(event);
                    participation.setMember(member);
                    return participation;
                }).toList();
        participations.forEach(participationRepository::save);

        return participations;
    }

    public Participation updateParticipation(Participation participation) {
        return participationRepository.save(participation);
    }

    public Participation deleteParticipation(Participation participation) {
        participationRepository.delete(participation);
        return participation;
    }
    public Participation deleteParticipationById(Long participationId) {
        Participation participation = participationRepository.findById(participationId).orElseThrow();
        participationRepository.deleteById(participationId);
        return participation;
    }
    public Participation deleteParticipationByEventIdAndMemberId(Long eventId, Long memberId) {
        Participation participation = participationRepository.findByEvent_IdAndMember_Id(eventId, memberId);
        participationRepository.delete(participation);
        return participation;
    }
    public List<Participation> deleteAllParticipationsByEventId(Long eventId) {
        List<Participation> participations = participationRepository.findAllByEvent_Id(eventId);
        participations.forEach(participation -> deleteParticipationById(participation.getIdParticipation()));
        return participations;
    }

    private List<String> readJmbagsFromFile(MultipartFile file) throws IOException {
        String type = file.getContentType();
        System.out.println(type);
        System.out.println(file.getOriginalFilename());
        assert type != null;

        List<String> jmbags = null;
        if (type.equals("application/octet-stream") || type.equals("text/plain")) {
            System.out.println("txt");
            byte[] textBytes = file.getBytes();
            String textString = new String(textBytes);
            jmbags = List.of(textString.split("\n"));
        } else if (type.equals("text/csv")) {
            System.out.println("csv");
            byte[] textBytes = file.getBytes();
            String textString = new String(textBytes);
            List<String> tmp = List.of(textString.split("\n"));

            System.out.println(textString);

            System.out.println();
            System.out.println();
            jmbags = tmp.stream()
                    .map(line -> {
                        List<String> chunks = List.of(line.split(","));
                        String jmbag = null;
                        for (String chunk: chunks) {
                            if (chunk.contains("0036") || chunk.contains("0069") || chunk.contains("0062")  || chunk.contains("0246")) {
                                boolean goodJmbag = JmbagUtils.validateJmbag(chunk);
                                System.out.println(goodJmbag);
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
        System.out.println(jmbags.size());
        return jmbags;
    }

}
