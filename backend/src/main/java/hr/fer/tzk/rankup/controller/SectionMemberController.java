package hr.fer.tzk.rankup.controller;

import hr.fer.tzk.rankup.dto.SectionMemberDto;
import hr.fer.tzk.rankup.form.SectionMemberForm;
import hr.fer.tzk.rankup.mapper.SectionMemberMapper;
import hr.fer.tzk.rankup.model.SectionMember;
import hr.fer.tzk.rankup.model.SectionSemester;
import hr.fer.tzk.rankup.service.SectionMemberService;
import hr.fer.tzk.rankup.service.SectionSemesterService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sections/{idSection}/members")
public class SectionMemberController {

    private final SectionMemberService sectionMemberService;
    private final SectionSemesterService sectionSemesterService;

    @Autowired
    public SectionMemberController(SectionMemberService sectionMemberService, SectionSemesterService sectionSemesterService) {
        this.sectionMemberService = sectionMemberService;
        this.sectionSemesterService = sectionSemesterService;
    }

    /**
     * Handles GET requests to retrieve all section members for a given section ID.
     *
     * @role ADMIN
     * @param idSection the ID of the section whose members are to be retrieved.
     * @return ResponseEntity containing a list of SectionMemberGetDto objects and an HTTP OK status.
     */
    @GetMapping
    public ResponseEntity<List<SectionMemberDto>> findAllSectionMembers(@PathVariable Long idSection) {
        List<SectionMember> members = sectionMemberService.findAllSectionMembersByIdSection(idSection);
        List<SectionMemberDto> membersDto = members.stream()
                .map(SectionMemberMapper::toDto)
                .toList();
        return ResponseEntity.ok(membersDto);
    }

    /**
     * Handles GET request to retrieve specific section member by section ID.
     *
     * @roles ADMIN
     * @param idSection the ID of the section to which the member belongs.
     * @param idMember the ID of the member to be retrieved.
     * @return ResponseEntity containing the SectionMemberGetDto object and an HTTP OK status if found,
     *         or an HTTP Not Found status if the member does not exist.
     */
    @GetMapping("/{idMember}")
    public ResponseEntity<SectionMemberDto> findSectionMemberById(@PathVariable Long idSection, @PathVariable Long idMember) {
        Optional<SectionMember> memberOpt = sectionMemberService.findSectionMemberByIdSection(idMember, idSection);
        if (memberOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        SectionMember member = memberOpt.get();
        SectionMemberDto memberDto = SectionMemberMapper.toDto(member);
        return ResponseEntity.ok(memberDto);
    }

    /**
     * Creates a new section member.
     *
     * @param idSection the ID of the section to which the member will be added.
     * @param member the form containing the member's details.
     * @return ResponseEntity containing the created SectionMemberDto object and an HTTP CREATED status,
     *         or an HTTP Not Found status if the member could not be created.
     */
    @PostMapping
    public ResponseEntity<SectionMemberDto> createSectionMember(@PathVariable Long idSection, @Valid @RequestBody SectionMemberForm member) {
        Optional<SectionMember> newMemberOpt =
                sectionMemberService
                        .createSectionMemberFromJmbagAndRank(
                                idSection,
                                member.getJmbag(),
                                member.getRankName());
        if (newMemberOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        SectionMember newMember = newMemberOpt.get();

        sectionSemesterService.createSectionSemesterForAllSemesters(newMember);

        SectionMemberDto newMemberDto = SectionMemberMapper.toDto(newMember);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newMember.getId())
                .toUri();
        return ResponseEntity.status(HttpStatus.CREATED).location(location).body(newMemberDto);

    }


    @DeleteMapping("/{memberId}")
    public ResponseEntity<SectionMemberDto> deleteSectionMember(@PathVariable Long idSection, @PathVariable Long memberId) {
        SectionMember sectionMember = sectionMemberService.deleteSectionMemberBySectionIdAndMemberId(idSection, memberId);
        return ResponseEntity.ok(SectionMemberMapper.toDto(sectionMember));
    }
}
