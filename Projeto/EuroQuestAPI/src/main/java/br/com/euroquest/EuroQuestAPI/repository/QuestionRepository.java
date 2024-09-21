package br.com.euroquest.EuroQuestAPI.repository;

import br.com.euroquest.EuroQuestAPI.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByTrailId(Long trailId);
    Optional<Question> findByIdAndTrailId(Long questionId, Long trailId);
}
