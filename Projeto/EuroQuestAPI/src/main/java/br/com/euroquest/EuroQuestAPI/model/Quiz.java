package br.com.euroquest.EuroQuestAPI.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tb_quiz")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "trail_id")
    private Trail trail;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true) // Define o relacionamento
    @JoinColumn(name = "quiz_id")
    private List<Question> questions;


    private int currentQuestionIndex = 0;
    private int score = 0;

    public Quiz(List<Question> questions) {
        this.questions = questions;
    }

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
            score++;
        }
    }

    public int getTotalQuestions() {
        return questions.size();
    }


}
