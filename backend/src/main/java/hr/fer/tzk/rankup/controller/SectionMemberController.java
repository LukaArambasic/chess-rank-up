package hr.fer.tzk.rankup.controller;

import hr.fer.tzk.rankup.dto.SectionMemberDto;
import hr.fer.tzk.rankup.form.SectionMemberForm;
import hr.fer.tzk.rankup.mapper.SectionMemberMapper;
import hr.fer.tzk.rankup.model.SectionMember;
import hr.fer.tzk.rankup.service.SectionMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sections/{idSection}/members")
public class SectionMemberController {

    private final SectionMemberService sectionMemberService;

    @Autowired
    public SectionMemberController(SectionMemberService sectionMemberService) {
        this.sectionMemberService = sectionMemberService;
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

    // TODO
    @PostMapping
    public ResponseEntity<SectionMemberDto> createSectionMember(@PathVariable Long idSection, @RequestBody SectionMemberForm member) {
        return null;
    }
}
