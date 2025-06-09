package hr.fer.tzk.rankup.controller;

import hr.fer.tzk.rankup.form.SemesterForm;
import hr.fer.tzk.rankup.mapper.SemesterMapper;
import hr.fer.tzk.rankup.model.Semester;
import hr.fer.tzk.rankup.service.SemesterService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/semesters")
public class SemesterController {
    private final SemesterService semesterService;

    @Autowired
    public SemesterController(SemesterService semesterService) {
        this.semesterService = semesterService;
    }

    @GetMapping
    public ResponseEntity<List<Semester>> findAllSemesters() {
        List<Semester> semesters = semesterService.findAllSemesters();
        return ResponseEntity.ok(semesters);
    }

    @GetMapping("/{idSemester}")
    public ResponseEntity<Semester> findSemesterById(@PathVariable Long idSemester) {
        Semester semester = semesterService.findSemesterById(idSemester).orElse(null);
        return ResponseEntity.ok(semester);
    }

    @PostMapping
    public ResponseEntity<Semester> createSemester(@Valid @RequestBody SemesterForm semester) {
        if (semesterService.checkDateFromBeforeDateTo(semester)) {
            return ResponseEntity.badRequest().body(null);
        }

        boolean datesOverlap = semesterService.checkDateFromAndToWithOthers(semester, (long)-1);

        if (datesOverlap) {
            return ResponseEntity.badRequest().body(null);
        }

        Semester semesterNew = semesterService.createSemester(SemesterMapper.fromForm(semester));
        return ResponseEntity.ok(semesterNew);
    }

    @PostMapping("/{idSemester}")
    public ResponseEntity<Semester> updateSemester(@PathVariable Long idSemester, @Valid @RequestBody SemesterForm semesterForm) {
        Optional<Semester> semesterOpt = semesterService.findSemesterById(idSemester);
        if (semesterOpt.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        if (semesterService.checkDateFromBeforeDateTo(semesterForm)) {
            return ResponseEntity.badRequest().body(null);
        }

        boolean datesOverlap = semesterService.checkDateFromAndToWithOthers(semesterForm, idSemester);

        if (datesOverlap) {
            return ResponseEntity.badRequest().body(null);
        }
        Semester semester = semesterService.updateSemesterFromForm(semesterOpt.get(),semesterForm);
        return ResponseEntity.ok(semester);
    }

    @DeleteMapping("/{idSemester}")
    public ResponseEntity<Semester> deleteSemester(@PathVariable Long idSemester) {
        Optional<Semester> semesterOpt = semesterService.findSemesterById(idSemester);
        if (semesterOpt.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        semesterService.deleteSemester(semesterOpt.get());
        return ResponseEntity.ok(semesterOpt.get());
    }
}
