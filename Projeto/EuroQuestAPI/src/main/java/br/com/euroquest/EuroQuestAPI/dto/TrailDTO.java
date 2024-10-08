package br.com.euroquest.EuroQuestAPI.dto;


import br.com.euroquest.EuroQuestAPI.model.Question;
import br.com.euroquest.EuroQuestAPI.model.Theme;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TrailDTO {


    private Long id;

    private String name;

    private String description;

    private Long themeId;


    private int currentQuestionIndex = 0;
    private int score = 0;


    private List<QuestionDTO> questions = new ArrayList<>();




}
