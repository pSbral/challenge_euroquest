package br.com.euroquest.EuroQuestAPI.service;

import br.com.euroquest.EuroQuestAPI.dto.ThemeDTO;
import br.com.euroquest.EuroQuestAPI.dto.TrailDTO;
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

@Service
public class ThemeService {

    private Converter converter;
    private ThemeRepository themeRepository;
    private TrailRepository trailRepository;

    @Autowired
    public ThemeService(ThemeRepository themeRepository, TrailRepository trailRepository, Converter converter) {
        this.themeRepository = themeRepository;
        this.trailRepository = trailRepository;
        this.converter = converter;
    }


    @Transactional(readOnly = true)
    public List<TrailDTO> findTrailsByThemeId(Long themeId) {
        return trailRepository.findByThemeId(themeId).stream()
                .map(trail -> converter.toDTO(trail))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ThemeDTO> findAll() {
        List<Theme> themes = themeRepository.findAll();
        return themes.stream()
                .map(theme -> converter.toDTO(theme))
                .toList();
    }
    @Transactional(readOnly = true)
    public ThemeDTO findById(Long id) {
        Theme theme = themeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return converter.toDTO(theme);
    }

    @Transactional
    public ThemeDTO insert(ThemeDTO dto) {
        Theme theme = converter.toEntity(dto);
        Theme createdTheme = themeRepository.save(theme);
        return converter.toDTO(createdTheme);
    }

    @Transactional
    public void delete(Long id) {
        if(!(themeRepository.existsById(id))) {
            throw new ResourceNotFoundException(id);
        }
        themeRepository.deleteById(id);
    }


    @Transactional
    public ThemeDTO update(Long id, ThemeDTO themeDTO) {
        Theme existingTheme = themeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        existingTheme.setNome(themeDTO.getNome());
        if (themeDTO.getTrails() != null) {
            existingTheme.setTrails(themeDTO.getTrails().stream()
                    .map(trailDTO -> converter.toEntity(trailDTO))
                    .toList());
        } else {
            themeDTO.setTrails(new ArrayList<>());
        }
        Theme updatedTheme = themeRepository.save(existingTheme);
        return converter.toDTO(updatedTheme);
    }
    



}
