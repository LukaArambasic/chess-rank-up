package hr.fer.tzk.rankup.service;

import hr.fer.tzk.rankup.model.SectionMember;
import hr.fer.tzk.rankup.model.SectionSemester;
import hr.fer.tzk.rankup.repository.SectionSemesterRepository;
import hr.fer.tzk.rankup.utils.JmbagUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class SectionSemesterService {

    private final SectionSemesterRepository sectionSemesterRepository;
    private final SemesterService semesterService;

    @Autowired
    public SectionSemesterService(SectionSemesterRepository sectionSemesterRepository, SemesterService semesterService) {
        this.sectionSemesterRepository = sectionSemesterRepository;
        this.semesterService = semesterService;
    }

    public Optional<SectionSemester> findSectionSemesterByAlterKey(Long idMember, Long idSection, Long idSemester) {
        return sectionSemesterRepository.findByMember_IdAndSection_IdAndSemester_Id(idMember, idSection, idSemester);
    }

    public List<SectionSemester> findSectionSemesterByIdSectionAndIdSemester(Long idSection, Long idSemester) {
        return sectionSemesterRepository.findBySection_IdAndSemester_Id(idSection, idSemester);
    }

    public List<SectionSemester> createSectionSemesterForAllSemesters(SectionMember member) {
        List<SectionSemester> sectionSemesters = semesterService.findAllSemesters()
                .stream()
                .map(semester -> {
                    SectionSemester sectionSemester = new SectionSemester();
                    sectionSemester.setSemester(semester);
                    sectionSemester.setSection(member.getSection());
                    sectionSemester.setPoints(0);
                    sectionSemester.setThreshold(12);
                    sectionSemester.setMember(member.getMember());
                    return sectionSemester;
                }).toList();
        sectionSemesters.forEach(sectionSemesterRepository::save);
        return sectionSemesters;
    }

    public SectionSemester update(SectionSemester sectionSemester) {
        return sectionSemesterRepository.save(sectionSemester);
    }

    public List<SectionSemester> updatePeEnrolled(Long sectionId, Long semesterId, MultipartFile file) throws IOException {
        List<String> jmbags = readJmbagsFromFile(file);
        List<SectionSemester> sectionSemesters = findSectionSemesterByIdSectionAndIdSemester(sectionId, semesterId);
        return null;
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

}
