package br.com.euroquest.EuroQuestAPI.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tb_trail")
public class Trail {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "trail_seq")
    @SequenceGenerator(name = "trail_seq", sequenceName = "trail_sequence", allocationSize = 1)
    private Long id;

    private String name;

    private String description;

    @ManyToOne(optional = false)
    @JoinColumn(name = "theme_id")
    private Theme theme;


    @OneToMany(mappedBy = "trail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions;

    @Transient
    private int currentQuestionIndex = 0;
    @Transient
    private int score = 0;

    
    public boolean hasNextQuestion() {
        return currentQuestionIndex < questions.size();
    }

    public Question getNextQuestion() {
        if (hasNextQuestion()) {
            return questions.get(currentQuestionIndex++);
        }
        return null;
    }

    public void submitAnswer(int selectedOptionIndex) {
        Question currentQuestion = questions.get(currentQuestionIndex - 1);
        if (currentQuestion.isCorrectAnswer(selectedOptionIndex)) {
            score = getScore() / questions.size() * 100;
        }
    }

    public int getTotalQuestions() {
        return questions.size();
    }



}
