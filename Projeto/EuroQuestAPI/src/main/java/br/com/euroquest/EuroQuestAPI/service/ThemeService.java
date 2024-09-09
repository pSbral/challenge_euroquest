package br.com.euroquest.EuroQuestAPI.service;

import br.com.euroquest.EuroQuestAPI.dto.ThemeDTO;
import br.com.euroquest.EuroQuestAPI.dto.TrailDTO;
import br.com.euroquest.EuroQuestAPI.model.Theme;
import br.com.euroquest.EuroQuestAPI.model.Trail;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class ThemeService {

    private ModelMapper modelMapper;

    private ThemeDTO convertToDTO(Theme theme) {
        return modelMapper.map(theme, ThemeDTO.class);
    }
    private Theme convertToEntity(ThemeDTO themeDTO) {
        return modelMapper.map(themeDTO, Theme.class);
    }
}
