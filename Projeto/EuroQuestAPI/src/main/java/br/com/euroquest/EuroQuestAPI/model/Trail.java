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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @ManyToOne(optional = false)
    @JoinColumn(name = "theme_id")
    private Theme theme;


    @OneToMany(mappedBy = "trail", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Quiz> quizzes;


}
