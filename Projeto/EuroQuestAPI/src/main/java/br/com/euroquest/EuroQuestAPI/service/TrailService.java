package br.com.euroquest.EuroQuestAPI.service;


import br.com.euroquest.EuroQuestAPI.dto.QuestionDTO;
import br.com.euroquest.EuroQuestAPI.dto.TrailDTO;
import br.com.euroquest.EuroQuestAPI.model.Trail;
import br.com.euroquest.EuroQuestAPI.repository.TrailRepository;
import br.com.euroquest.EuroQuestAPI.service.exception.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class TrailService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TrailRepository trailRepository;

    @Autowired
    private QuestionService questionService;

    protected TrailDTO convertToDTO(Trail trail) {
        return modelMapper.map(trail, TrailDTO.class);
    }

    private Trail convertToEntity(TrailDTO trailDTO) {
        return modelMapper.map(trailDTO, Trail.class);
    }

    @Transactional(readOnly = true)
    public List<QuestionDTO> getQuestionsByTrailId(Long trailId) {
        Trail trail = trailRepository.findById(trailId)
                .orElseThrow(ResourceNotFoundException::new);
        return trail.getQuestions().stream()
                .map(questionService::convertToDTO)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public List<TrailDTO> findAll() {
        List<Trail> trails = trailRepository.findAll();
        return trails.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TrailDTO findById(Long id) {
        Trail trail = trailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return convertToDTO(trail);
    }

    @Transactional
    public TrailDTO insert(TrailDTO trailDTO) {
        Trail trail = convertToEntity(trailDTO);
        Trail savedTrail = trailRepository.save(trail);
        return convertToDTO(savedTrail);
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
        existingTrail.setScore(trailDTO.getScore());
        existingTrail.setQuestions(
                trailDTO.getQuestions().stream()
                        .map(questionService::convertToEntity)
                        .collect(Collectors.toList())
        );

        Trail updatedTrail = trailRepository.save(existingTrail);
        return convertToDTO(updatedTrail);
    }

    public int getTrailScore(Long trailId) {
        Trail trail = trailRepository.findById(trailId)
                .orElseThrow(() -> new ResourceNotFoundException(trailId));
        return trail.getScore();
    }


}
