package br.com.euroquest.EuroQuestAPI.dto;

import br.com.euroquest.EuroQuestAPI.model.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class QuizDTO {

    private Long id;
    private TrailDTO trail;

    private int currentQuestionIndex = 0;
    private int score = 0;

    private List<QuestionDTO> questions;

}
