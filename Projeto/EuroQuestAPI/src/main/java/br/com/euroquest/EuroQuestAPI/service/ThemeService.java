package br.com.euroquest.EuroQuestAPI.service;

import br.com.euroquest.EuroQuestAPI.dto.ThemeDTO;
import br.com.euroquest.EuroQuestAPI.dto.TrailDTO;
import br.com.euroquest.EuroQuestAPI.model.Theme;
import br.com.euroquest.EuroQuestAPI.repository.ThemeRepository;
import br.com.euroquest.EuroQuestAPI.repository.TrailRepository;
import br.com.euroquest.EuroQuestAPI.service.exception.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class ThemeService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ThemeRepository themeRepository;

    @Autowired
    private TrailRepository trailRepository;


    @Autowired
    private TrailService trailService;

    private ThemeDTO convertToDTO(Theme theme) {
        return modelMapper.map(theme, ThemeDTO.class);
    }
    private Theme convertToEntity(ThemeDTO themeDTO) {
        return modelMapper.map(themeDTO, Theme.class);
    }


    /*
    @Transactional(readOnly = true)
    public List<TrailDTO> getTrailsByThemeId(Long themeId) {
        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(ResourceNotFoundException::new);
        return theme.getTrails().stream()
                .map(trailService::convertToDTO)
                .collect(Collectors.toList());
    }

     */

    @Transactional(readOnly = true)
    public List<TrailDTO> findTrailsByThemeId(Long themeId) {
        return trailRepository.findByThemeId(themeId).stream().map(trailService::convertToDTO).toList();
    }


    @Transactional(readOnly = true)
    public List<ThemeDTO> findAll() {
        List<Theme> themes = themeRepository.findAll();
        return themes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public ThemeDTO findById(Long id) {
        Theme theme = themeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return convertToDTO(theme);
    }

    @Transactional
    public ThemeDTO insert(ThemeDTO dto) {
        Theme theme = convertToEntity(dto);
        Theme createdTheme = themeRepository.save(theme);
        return convertToDTO(createdTheme);
    }


}
