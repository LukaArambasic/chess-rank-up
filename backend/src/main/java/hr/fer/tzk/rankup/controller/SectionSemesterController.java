package hr.fer.tzk.rankup.controller;

import hr.fer.tzk.rankup.model.SectionSemester;
import hr.fer.tzk.rankup.service.SectionSemesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/sections/{sectionId}/semesters")
public class SectionSemesterController {
    private final SectionSemesterService sectionSemesterService;

    @Autowired
    public SectionSemesterController(SectionSemesterService semesterService) {
        this.sectionSemesterService = semesterService;
    }

    @PostMapping("/selection")
    public ResponseEntity<List<SectionSemester>> enablePeEnrolled(@PathVariable Long sectionId, @RequestParam("semesterId") Long idSemester, @RequestParam("file") MultipartFile file) {
        return null;
    }

}
