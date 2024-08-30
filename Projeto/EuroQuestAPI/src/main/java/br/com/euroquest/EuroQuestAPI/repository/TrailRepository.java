package br.com.euroquest.EuroQuestAPI.repository;

import br.com.euroquest.EuroQuestAPI.model.Trail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrailRepository extends JpaRepository<Trail,Long> {

}
