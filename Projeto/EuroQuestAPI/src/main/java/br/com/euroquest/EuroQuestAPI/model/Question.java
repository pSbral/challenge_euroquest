package br.com.euroquest.EuroQuestAPI.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tb_question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String questionText;
    private String[] options;
    private int correctOptionIndex;

    @ManyToOne(optional = false)
    @JoinColumn(name = "trail_id")
    private Trail trail;


    public boolean isCorrectAnswer(int selectedOptionIndex) {
        return selectedOptionIndex == correctOptionIndex;
    }
}
