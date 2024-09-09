package br.com.euroquest.EuroQuestAPI.repository;

import br.com.euroquest.EuroQuestAPI.model.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThemeRepository extends JpaRepository<Theme, Long> {
}
