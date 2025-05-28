package hr.fer.tzk.rankup.mapper;

import hr.fer.tzk.rankup.form.SemesterForm;
import hr.fer.tzk.rankup.model.Semester;

public class SemesterMapper {

    public static Semester fromForm(SemesterForm form) {
        if (form == null) {
            return null;
        }
        Semester semester = new Semester();
        semester.setDateFrom(form.getDateFrom());
        semester.setDateTo(form.getDateTo());
        semester.setName(form.getName());

        return semester;
    }
}
