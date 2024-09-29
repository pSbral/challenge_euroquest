package br.com.euroquest.EuroQuestAPI.util;

import br.com.euroquest.EuroQuestAPI.dto.QuestionDTO;
import br.com.euroquest.EuroQuestAPI.dto.ThemeDTO;
import br.com.euroquest.EuroQuestAPI.dto.TrailDTO;
import br.com.euroquest.EuroQuestAPI.model.Question;
import br.com.euroquest.EuroQuestAPI.model.Theme;
import br.com.euroquest.EuroQuestAPI.model.Trail;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class Converter {

    public ThemeDTO toDTO(Theme entity) {
        ThemeDTO dto = new ThemeDTO();
        dto.setId(entity.getId());
        dto.setNome(entity.getNome());
        if (entity.getTrails() != null) {
            List<TrailDTO> trails = entity.getTrails().stream()
                    .map(trail -> {
                        TrailDTO trailDTO = new TrailDTO();
                        trailDTO.setId(trail.getId());
                        trailDTO.setName(trail.getName());
                        trailDTO.setDescription(trail.getDescription());
                        trailDTO.setThemeId(entity.getId());
                        return trailDTO;
                    })
                    .collect(Collectors.toList());
            dto.setTrails(trails);
        }
        return dto;
    }


    public Theme toEntity(ThemeDTO dto) {
        Theme theme = new Theme();
        theme.setNome(dto.getNome());

        if (dto.getTrails() != null) {
            List<Trail> trails = dto.getTrails().stream()
                    .map(trailDTO -> {
                        Trail trail = new Trail();
                        trail.setName(trailDTO.getName());
                        trail.setDescription(trailDTO.getDescription());
                        trail.setTheme(theme);
                        return trail;
                    })
                    .collect(Collectors.toList());
            theme.setTrails(trails);
        }
        return theme;
    }



    public TrailDTO toDTO(Trail trail) {
        if (trail == null) return null;

        TrailDTO trailDTO = new TrailDTO();
        trailDTO.setId(trail.getId());
        trailDTO.setName(trail.getName());
        trailDTO.setDescription(trail.getDescription());
        trailDTO.setThemeId(trail.getTheme().getId());
        trailDTO.setCurrentQuestionIndex(trail.getCurrentQuestionIndex());

        if (trail.getQuestions() != null && !trail.getQuestions().isEmpty()) {
            List<QuestionDTO> questions = trail.getQuestions().stream()
                    .map(question -> {
                        QuestionDTO dto = new QuestionDTO();
                        dto.setId(question.getId());
                        dto.setQuestionText(question.getQuestionText());
                        dto.setCorrectOptionIndex(question.getCorrectOptionIndex());
                        dto.setOptions(question.getOptions());
                        dto.setTrailId(trail.getId());
                        return dto;
                    }).collect(Collectors.toList());

            trailDTO.setQuestions(questions);
        } else {
            trailDTO.setQuestions(new ArrayList<>());  // Evitar null pointers
        }
        return trailDTO;
    }

    public Trail toEntity(TrailDTO dto) {
        Trail trail = new Trail();
        trail.setName(dto.getName());
        trail.setDescription(dto.getDescription());
        Theme theme = new Theme();
        theme.setId(dto.getThemeId());
        trail.setTheme(theme);

        if (dto.getQuestions() != null && !dto.getQuestions().isEmpty()) {
            List<Question> questions = dto.getQuestions().stream()
                    .map(questionDTO -> {
                        Question question = new Question();
                        question.setQuestionText(questionDTO.getQuestionText());
                        question.setCorrectOptionIndex(questionDTO.getCorrectOptionIndex());
                        question.setOptions(questionDTO.getOptions());
                        question.setTrail(trail);
                        return question;
                    }).collect(Collectors.toList());

            trail.setQuestions(questions);
        } else {
            trail.setQuestions(new ArrayList<>());  // Evitar null pointers
        }

        return trail;
    }



    public QuestionDTO toDTO(Question question) {
        if (question == null) return null;
        QuestionDTO questionDTO = new QuestionDTO();
        questionDTO.setId(question.getId());
        questionDTO.setQuestionText(question.getQuestionText());
        questionDTO.setOptions(question.getOptions());
        questionDTO.setCorrectOptionIndex(question.getCorrectOptionIndex());
        questionDTO.setTrailId(question.getTrail() != null ? question.getTrail().getId() : null);
        return questionDTO;
    }

    public Question toEntity(QuestionDTO questionDTO) {
        if (questionDTO == null) return null;
        Question question = new Question();
        question.setId(questionDTO.getId());
        question.setQuestionText(questionDTO.getQuestionText());
        question.setOptions(questionDTO.getOptions());
        question.setCorrectOptionIndex(questionDTO.getCorrectOptionIndex());
        if (questionDTO.getTrailId() != null) {
            Trail trail = new Trail();
            trail.setId(questionDTO.getTrailId());
            question.setTrail(trail);
        }
        return question;
    }
}
