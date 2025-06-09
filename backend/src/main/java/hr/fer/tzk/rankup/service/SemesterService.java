package hr.fer.tzk.rankup.service;

import hr.fer.tzk.rankup.form.SemesterForm;
import hr.fer.tzk.rankup.model.Semester;
import hr.fer.tzk.rankup.repository.SemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class SemesterService {

    private final SemesterRepository semesterRepository;

    @Autowired
    public SemesterService(SemesterRepository semesterRepository) {
        this.semesterRepository = semesterRepository;
    }

    public List<Semester> findAllSemesters() {
        return semesterRepository.findAllSemestersOrderedByDateToDesc();
    }

    public Optional<Semester> findSemesterById(Long id) {
        return semesterRepository.findById(id);
    }

    public Optional<Semester> findSemesterByName(String name) {
        return semesterRepository.findByName(name);
    }

    public Optional<Semester> findCurrentSemester() {
        return semesterRepository.findSemesterByDate(LocalDate.now());
    }

    public Optional<Semester> findSemesterByDate(LocalDate date) {
        return semesterRepository.findSemesterByDate(date);
    }

    public Optional<Semester> findLatestSemester() {
        List<Semester> semesters = semesterRepository.findAllSemestersOrderedByDateToDesc();
        return semesters.isEmpty() ? Optional.empty() : Optional.of(semesters.get(0));
    }

    public List<Semester> findLatestNSemesters(int n) {
        List<Semester> semesters = semesterRepository.findAllSemestersOrderedByDateToDesc();
        return semesters.stream()
                .limit(n)
                .toList();
    }

    public Semester createSemester(Semester semester) {
        return semesterRepository.save(semester);
    }

    public Semester updateSemester(Semester semester) {
        return semesterRepository.save(semester);
    }

    public Semester deleteSemester(Semester semester) {
        semesterRepository.delete(semester);
        return semester;
    }

    public boolean checkDateFromBeforeDateTo(SemesterForm semester) {
        return semester.getDateFrom().isAfter(semester.getDateTo());
    }

    public boolean checkDateFromAndToWithOthers(SemesterForm semester, Long idSemester) {
        List<Semester> semesters = findAllSemesters();
        List<Semester> semesterList = semesterRepository.findAllOverlapSemesters(semester.getDateFrom(), semester.getDateTo());
        if (semesterList.isEmpty()) {
            return false;
        } else if (semesterList.size()==1 && semesterList.get(0).getId().equals(idSemester)) {
            return false;
        } else {
            return true;
        }
        /*long size = semesters.stream().filter(streamSemester -> {
            if (!Objects.equals(streamSemester.getId(), idSemester)) {
                boolean beforeAndBefore = streamSemester.getDateFrom().isBefore(semester.getDateFrom())
                        && streamSemester.getDateFrom().isBefore(semester.getDateTo())
                        && streamSemester.getDateTo().isBefore(semester.getDateTo())
                        && streamSemester.getDateTo().isBefore(semester.getDateFrom());
                boolean afterAndAfter = streamSemester.getDateFrom().isAfter(semester.getDateFrom())
                        && streamSemester.getDateFrom().isAfter(semester.getDateTo())
                        && streamSemester.getDateTo().isAfter(semester.getDateTo())
                        && streamSemester.getDateTo().isAfter(semester.getDateFrom());
                return !(beforeAndBefore || afterAndAfter);
            } else {
                return false;
            }
        }).count();
        return size>0;*/
    }

    public Semester updateSemesterFromForm(Semester semester, SemesterForm form) {
        semester.setDateFrom(form.getDateFrom());
        semester.setDateTo(form.getDateTo());
        semester.setName(form.getName());
        return updateSemester(semester);
    }
}
