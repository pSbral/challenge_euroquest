package br.com.euroquest.EuroQuestAPI.controller;

import br.com.euroquest.EuroQuestAPI.dto.QuestionDTO;
import br.com.euroquest.EuroQuestAPI.dto.QuizDTO;
import br.com.euroquest.EuroQuestAPI.dto.TrailDTO;
import br.com.euroquest.EuroQuestAPI.service.QuestionService;
import br.com.euroquest.EuroQuestAPI.service.QuizService;
import br.com.euroquest.EuroQuestAPI.service.TrailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("euro/admin")
public class AdminController {

    @Autowired
    private QuestionService questionService;
    @Autowired
    private QuizService quizService;
    @Autowired
    private TrailService trailService;

    // Endpoints para trail
    @PostMapping("/trail")
    public ResponseEntity<TrailDTO> createTrail(@RequestBody TrailDTO trailDTO) {
        TrailDTO createdTrail = trailService.insert(trailDTO);
        return ResponseEntity.ok(createdTrail);
    }

    @DeleteMapping("/trail/{id}")
    public ResponseEntity<Void> deleteTrail(@PathVariable Long id) {
        trailService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoints para Quiz
    @PostMapping("/quiz")
    public ResponseEntity<QuizDTO> createQuiz(@RequestBody QuizDTO quizDTO) {
        QuizDTO createdQuiz = quizService.insert(quizDTO);
        return new ResponseEntity<>(createdQuiz, HttpStatus.CREATED);
    }

    @DeleteMapping("/quiz/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        quizService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoints para Question
    @PostMapping("/question")
    public ResponseEntity<QuestionDTO> createQuestion(@RequestBody QuestionDTO questionDTO) {
        QuestionDTO createdQuestion = questionService.insert(questionDTO);
        return ResponseEntity.ok(createdQuestion);
    }

    @PostMapping("/quizzes/{quizId}/questions")
    public ResponseEntity<QuestionDTO> addQuestionToQuiz(@PathVariable Long quizId, @RequestBody QuestionDTO questionDTO) {
        QuestionDTO createdQuestion = questionService.addQuestionToQuiz(quizId, questionDTO);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }

    @PostMapping("/quizzes/{quizId}/questions/{questionId}")
    public ResponseEntity<QuestionDTO> addExistingQuestionToQuiz(
            @PathVariable Long quizId,
            @PathVariable Long questionId) {
        QuestionDTO updatedQuestion = questionService.addExistingQuestionToQuiz(quizId, questionId);
        return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
    }



}
    