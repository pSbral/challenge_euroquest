package br.com.euroquest.EuroQuestAPI.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class QuestionDTO {

    private Long id;

    private String questionText;

    private List<String> options;

    private int correctOptionIndex;

    private Long trailId;

}
