package br.com.euroquest.EuroQuestAPI.service;


import br.com.euroquest.EuroQuestAPI.dto.QuestionDTO;
import br.com.euroquest.EuroQuestAPI.dto.TrailDTO;
import br.com.euroquest.EuroQuestAPI.model.Question;
import br.com.euroquest.EuroQuestAPI.model.Theme;
import br.com.euroquest.EuroQuestAPI.model.Trail;
import br.com.euroquest.EuroQuestAPI.repository.ThemeRepository;
import br.com.euroquest.EuroQuestAPI.repository.TrailRepository;
import br.com.euroquest.EuroQuestAPI.service.exception.ResourceNotFoundException;
import br.com.euroquest.EuroQuestAPI.util.Converter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class TrailService {


    private final Converter converter;
    private final TrailRepository trailRepository;
    private final ThemeRepository themeRepository;

    @Autowired
    public TrailService(Converter converter, TrailRepository trailRepository, ThemeRepository themeRepository) {
        this.converter = converter;
        this.trailRepository = trailRepository;
        this.themeRepository = themeRepository;
    }

    @Transactional(readOnly = true)
    public List<TrailDTO> findAllByThemeId(Long themeId) {
        List<Trail> trails = trailRepository.findByThemeId(themeId);
        return trails.stream()
                    .map(converter::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TrailDTO> findAll() {
        List<Trail> trails = trailRepository.findAll();
        return trails.stream()
                .map(converter::toDTO)
                .toList();
    }


    @Transactional(readOnly = true)
    public TrailDTO findById(Long id) {
        Trail trail = trailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return converter.toDTO(trail);
    }

    @Transactional
    public TrailDTO insert(TrailDTO trailDTO) {
        Trail trail = converter.toEntity(trailDTO);
        Trail savedTrail = trailRepository.save(trail);
        return converter.toDTO(savedTrail);
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
        existingTrail.setDescription(trailDTO.getDescription());
        Theme theme = themeRepository.findById(trailDTO.getThemeId())
                .orElseThrow(() -> new ResourceNotFoundException(trailDTO.getThemeId()));
        existingTrail.setTheme(theme);
        if (trailDTO.getQuestions() != null) {
            existingTrail.getQuestions().removeIf(
                    question -> trailDTO.getQuestions().stream()
                            .noneMatch(q -> q.getId() != null && q.getId().equals(question.getId()))
            );
            for (QuestionDTO questionDTO : trailDTO.getQuestions()) {
                if (questionDTO.getId() != null) {
                    existingTrail.getQuestions().stream()
                            .filter(q -> q.getId().equals(questionDTO.getId()))
                            .findFirst()
                            .ifPresent(existingQuestion -> {
                                existingQuestion.setQuestionText(questionDTO.getQuestionText());
                                existingQuestion.setCorrectOptionIndex(questionDTO.getCorrectOptionIndex());
                                existingQuestion.setOptions(questionDTO.getOptions());
                            });
                } else {
                    Question newQuestion = converter.toEntity(questionDTO);
                    newQuestion.setTrail(existingTrail);
                    existingTrail.getQuestions().add(newQuestion);
                }
            }
        }
        Trail updatedTrail = trailRepository.save(existingTrail);
        return converter.toDTO(updatedTrail);
    }





    // logica
    public int getTrailScore(Long trailId) {
        Trail trail = trailRepository.findById(trailId)
                .orElseThrow(() -> new ResourceNotFoundException(trailId));
        return trail.getScore();
    }


}
