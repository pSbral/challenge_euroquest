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

import java.util.List;


@Service
public class ThemeService {



    private Converter converter;
    private ThemeRepository themeRepository;
    private TrailRepository trailRepository;

    @Autowired
    public ThemeService(ThemeRepository themeRepository, TrailRepository trailRepository) {
        this.themeRepository = themeRepository;
        this.trailRepository = trailRepository;
    }


    @Transactional(readOnly = true)
    public List<TrailDTO> findTrailsByThemeId(Long themeId) {
        return trailRepository.findByThemeId(themeId).stream()
                .map(trail -> converter.toDTO(trail, TrailDTO.class))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ThemeDTO> findAll() {
        List<Theme> themes = themeRepository.findAll();
        return themes.stream()
                .map(theme -> converter.toDTO(theme, ThemeDTO.class))
                .toList();
    }
    @Transactional(readOnly = true)
    public ThemeDTO findById(Long id) {
        Theme theme = themeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return converter.toDTO(theme, ThemeDTO.class);
    }

    @Transactional
    public ThemeDTO insert(ThemeDTO dto) {
        Theme theme = converter.toEntity(dto, Theme.class);
        Theme createdTheme = themeRepository.save(theme);
        return converter.toDTO(createdTheme, ThemeDTO.class);
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
        existingTheme.setTrails(themeDTO.getTrails().stream()
                .map(trailDTO -> converter.toEntity(trailDTO, Trail.class))
                .toList());
        Theme updatedTheme = themeRepository.save(existingTheme);
        return converter.toDTO(updatedTheme, ThemeDTO.class);
    }
    



}
