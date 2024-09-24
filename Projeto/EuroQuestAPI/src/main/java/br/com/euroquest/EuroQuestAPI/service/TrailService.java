package br.com.euroquest.EuroQuestAPI.service;


import br.com.euroquest.EuroQuestAPI.dto.TrailDTO;
import br.com.euroquest.EuroQuestAPI.model.Question;
import br.com.euroquest.EuroQuestAPI.model.Trail;
import br.com.euroquest.EuroQuestAPI.repository.TrailRepository;
import br.com.euroquest.EuroQuestAPI.service.exception.ResourceNotFoundException;
import br.com.euroquest.EuroQuestAPI.util.Converter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class TrailService {


    private final Converter converter;
    private final TrailRepository trailRepository;


    public TrailService(Converter converter, TrailRepository trailRepository) {
        this.converter = converter;
        this.trailRepository = trailRepository;
    }

    @Transactional(readOnly = true)
    public List<TrailDTO> findAll() {
        List<Trail> trails = trailRepository.findAll();
        return trails.stream()
                    .map(trail -> converter.toDTO(trail, TrailDTO.class))
                .toList();
    }

    @Transactional(readOnly = true)
    public TrailDTO findById(Long id) {
        Trail trail = trailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return converter.toDTO(trail, TrailDTO.class);
    }

    @Transactional
    public TrailDTO insert(TrailDTO trailDTO) {
        Trail trail = converter.toEntity(trailDTO, Trail.class);
        Trail savedTrail = trailRepository.save(trail);
        return converter.toDTO(savedTrail, TrailDTO.class);
    }

    @Transactional
    public void delete(Long id) {
        if (!trailRepository.existsById(id)) {
            throw new ResourceNotFoundException(id);
        }
        trailRepository.deleteById(id);
    }

    @Transactional
    public TrailDTO update(Long id, TrailDTO trailDTO) {
        Trail existingTrail = trailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        existingTrail.setName(trailDTO.getName());
        existingTrail.setTheme(trailDTO.getTheme());
        existingTrail.setQuestions(
                trailDTO.getQuestions().stream()
                        .map(questionDTO -> converter.toEntity(questionDTO, Question.class))
                        .toList()
        );

        Trail updatedTrail = trailRepository.save(existingTrail);
        return converter.toDTO(updatedTrail, TrailDTO.class);
    }

    public int getTrailScore(Long trailId) {
        Trail trail = trailRepository.findById(trailId)
                .orElseThrow(() -> new ResourceNotFoundException(trailId));
        return trail.getScore();
    }


}
