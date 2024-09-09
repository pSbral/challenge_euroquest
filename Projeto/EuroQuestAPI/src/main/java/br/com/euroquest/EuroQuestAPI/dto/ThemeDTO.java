package br.com.euroquest.EuroQuestAPI.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ThemeDTO {

    private Long id;
    private String nome;

    private List<TrailDTO> trails;
}
