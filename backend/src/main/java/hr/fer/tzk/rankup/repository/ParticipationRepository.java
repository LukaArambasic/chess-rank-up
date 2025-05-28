package hr.fer.tzk.rankup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import hr.fer.tzk.rankup.model.Participation;

import java.util.List;

@Repository
@RepositoryRestResource(exported = false)
public interface ParticipationRepository extends JpaRepository<Participation, Long> {

    List<Participation> findAllByMember_Id(Long idMember);
    List<Participation> findAllByEvent_Id(Long idEvent);
    Participation findByEvent_IdAndMember_Id(Long idEvent, Long idMember);
}
