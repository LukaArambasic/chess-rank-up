package hr.fer.tzk.rankup.controller;

import hr.fer.tzk.rankup.dto.SectionDto;
import hr.fer.tzk.rankup.form.SectionForm;
import hr.fer.tzk.rankup.mapper.SectionMapper;
import hr.fer.tzk.rankup.model.Section;
import hr.fer.tzk.rankup.service.SectionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/sections")
public class SectionController {
    private final SectionService sectionService;

    @Autowired
    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @GetMapping
    public ResponseEntity<List<SectionDto>> findAllSections() {
        List<Section> sections = sectionService.findAllSections();
        List<SectionDto> sectionDtos = sections.stream()
                .map(SectionMapper::toDto)
                .toList();
        return ResponseEntity.ok(sectionDtos);
    }

    @GetMapping("/{idSection}")
    public ResponseEntity<SectionDto> findSectionById(@PathVariable Long idSection) {
        Optional<Section> sectionOpt = sectionService.findSectionById(idSection);
        if (sectionOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Section section = sectionOpt.get();
        SectionDto sectionDto = SectionMapper.toDto(section);
        return ResponseEntity.ok(sectionDto);
    }

    @PostMapping
    public ResponseEntity<SectionDto> createSection(@Valid @RequestBody SectionForm sectionForm) {
        // TODO: This should create files for description and url instead of how its currently working.
        Section newSection = SectionMapper.fromForm(sectionForm);
        Optional<Section> storedSectionOpt = sectionService.findSectionByName(newSection.getName());
        if (storedSectionOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        Section createdSection = sectionService.createSection(newSection);

        SectionDto createdSectionDto = SectionMapper.toDto(createdSection);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdSection.getId())
                .toUri();

        return ResponseEntity.created(location).body(createdSectionDto);
    }

    @DeleteMapping("/{idSection}")
    public ResponseEntity<Void> deleteSection(@PathVariable Long idSection) {
        try {
            sectionService.deleteSectionById(idSection);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{idSection}")
    public ResponseEntity<SectionDto> updateSection(@PathVariable Long idSection, @Valid @RequestBody SectionForm form) {
        Optional<Section> sectionOpt = sectionService.findSectionById(idSection);
        if (sectionOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Section updatedSection = sectionService.updateSectionById(idSection, form);
        SectionDto updatedSectionDto = SectionMapper.toDto(updatedSection);
        return ResponseEntity.ok(updatedSectionDto);
    }

    @PatchMapping("/{idSection}")
    public ResponseEntity<SectionDto> patchSection(@PathVariable Long idSection, @RequestBody Map<String, Object> updates) {
        try {
            Section patchedSection = sectionService.patchSection(idSection, updates);
            SectionDto patchedSectionDto = SectionMapper.toDto(patchedSection);
            return ResponseEntity.ok(patchedSectionDto);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
