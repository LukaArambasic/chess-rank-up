package hr.fer.tzk.rankup.repository;

import hr.fer.tzk.rankup.model.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@RepositoryRestResource(exported = false)
public interface SemesterRepository extends JpaRepository<Semester, Long> {

    Optional<Semester> findByName(String name);

    @Query("SELECT s FROM Semester s WHERE :date BETWEEN s.dateFrom AND s.dateTo")
    Optional<Semester> findSemesterByDate(@Param("date") LocalDate date);

    @Query("SELECT s FROM Semester s ORDER BY s.dateTo DESC")
    List<Semester> findAllSemestersOrderedByDateToDesc();

    @Query("SELECT s FROM Semester s WHERE s.dateFrom BETWEEN :dateFrom AND :dateTo OR s.dateTo BETWEEN :dateFrom AND :dateTo")
    List<Semester> findAllOverlapSemesters(@Param("dateFrom") LocalDate dateFrom, @Param("dateTo") LocalDate dateTo);
}
