package hr.fer.tzk.rankup.controller;

import hr.fer.tzk.rankup.dto.BasicMemberDto;
import hr.fer.tzk.rankup.dto.DetailedMemberDto;
import hr.fer.tzk.rankup.dto.EventDto;
import hr.fer.tzk.rankup.dto.ParticipationDto;
import hr.fer.tzk.rankup.form.SingleParticipationForm;
import hr.fer.tzk.rankup.mapper.EventMapper;
import hr.fer.tzk.rankup.mapper.MemberMapper;
import hr.fer.tzk.rankup.mapper.ParticipationMapper;
import hr.fer.tzk.rankup.model.Member;
import hr.fer.tzk.rankup.model.Participation;
import hr.fer.tzk.rankup.model.SectionSemester;
import hr.fer.tzk.rankup.service.ParticipationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/sections/{sectionId}/participations")
public class ParticipationController {
    private final ParticipationService participationService;

    @Autowired
    public ParticipationController(ParticipationService participationService) {
        this.participationService = participationService;
    }

    @GetMapping
    public ResponseEntity<List<ParticipationDto>> findAllParticipations(@PathVariable Long sectionId) {
        return null;
    }

    @GetMapping("/{participationId}")
    public ResponseEntity<ParticipationDto> findParticipationById(@PathVariable Long sectionId, @PathVariable Long participationId) {
        return null;
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<EventDto>> findAllParticipationsByMemberId(@PathVariable Long sectionId, @PathVariable Long memberId) {
        List<EventDto> participationList = participationService.findAllParticipationsByMemberId(memberId)
                .stream()
                .map(Participation::getEvent)
                .map(EventMapper::toDto).toList();
        return ResponseEntity.ok(participationList);
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<DetailedMemberDto>> findAllParticipationsByEventId(@PathVariable Long sectionId, @PathVariable Long eventId) {
        List<DetailedMemberDto> participationList = participationService.findAllParticipationsByEventId(eventId)
                .stream()
                .map(Participation::getMember)
                .map(MemberMapper::toDetailedDto).toList();
        return ResponseEntity.ok(participationList);
    }

    @GetMapping("/pass/{threshold}/semester/{semesterId}")
    public ResponseEntity<List<BasicMemberDto>> findAllWhoPassedThreshold(@PathVariable Long sectionId, @PathVariable Long threshold, @PathVariable Long semesterId) {
        List<Member> members = participationService.findAllWhoPassedThreshold(threshold, sectionId, semesterId);
        List<BasicMemberDto> dtos = members.stream().map(MemberMapper::toBasicDto).toList();
        return ResponseEntity.ok(dtos);
    }



    @PostMapping
    public ResponseEntity<ParticipationDto> createParticipation(@PathVariable Long sectionId, @Valid @RequestBody SingleParticipationForm form) {
        Participation participation = participationService.createParticipation(sectionId, form);
        ParticipationDto dto = ParticipationMapper.toDto(participation);
        return ResponseEntity.ok(dto);
    }


    @PostMapping("/auto/{eventId}")
    public ResponseEntity<List<ParticipationDto>> createParticipationsFromFile(@PathVariable Long sectionId, @PathVariable Long eventId, @RequestParam("file") MultipartFile file){
        List<Participation> participations;
        try {
            participations = participationService.createMultipleParticipations(sectionId, eventId, file);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
        List<ParticipationDto> participationDtos = participations.stream().map(ParticipationMapper::toDto).toList();
        return ResponseEntity.ok(participationDtos);

    }

    @GetMapping("/check-points/{semesterId}")
    public ResponseEntity<String> checkPoints(@PathVariable Long sectionId, @PathVariable Long semesterId) {
        participationService.getPointsAllMembers(semesterId, sectionId);
        return null;
    }


    @PostMapping("/{participationId}")
    public ResponseEntity<ParticipationDto> updateParticipation(@PathVariable Long sectionId, @PathVariable Long participationId, @Valid @RequestBody SingleParticipationForm form) {
        return null;
    }

    @DeleteMapping("/{participationId}")
    public ResponseEntity<ParticipationDto> deleteParticipation(@PathVariable Long sectionId, @PathVariable Long participationId) {
        ParticipationDto participationDto = ParticipationMapper.toDto(participationService.deleteParticipationById(sectionId, participationId));
        return ResponseEntity.ok(participationDto);
    }
    @DeleteMapping("/{eventId}/{memberId}")
    public ResponseEntity<ParticipationDto> deleteParticipationByEventIdAndMemberId(@PathVariable Long sectionId, @PathVariable Long eventId, @PathVariable Long memberId) {
        Participation participation = participationService.deleteParticipationByEventIdAndMemberId(sectionId, eventId, memberId);
        ParticipationDto dto = ParticipationMapper.toDto(participation);
        return ResponseEntity.ok(dto);
    }

}
