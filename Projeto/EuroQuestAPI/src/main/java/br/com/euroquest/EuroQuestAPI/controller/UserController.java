package br.com.euroquest.EuroQuestAPI.controller;

import br.com.euroquest.EuroQuestAPI.dto.QuestionDTO;
import br.com.euroquest.EuroQuestAPI.dto.QuizDTO;
import br.com.euroquest.EuroQuestAPI.dto.TrailDTO;
import br.com.euroquest.EuroQuestAPI.service.QuestionService;
import br.com.euroquest.EuroQuestAPI.service.QuizService;
import br.com.euroquest.EuroQuestAPI.service.TrailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("euro/user")
public class UserController {

    @Autowired
    private TrailService trailService;

    @Autowired
    private QuizService quizService;

    @Autowired
    private QuestionService questionService;


    @GetMapping("/trails")
    public ResponseEntity<List<TrailDTO>> getAllTrails() {
        List<TrailDTO> trails = trailService.findAll();
        return ResponseEntity.ok(trails);
    }

    @GetMapping("/trail/{id}")
    public ResponseEntity<TrailDTO> getTrailById(@PathVariable Long id) {
        TrailDTO trailDTO = trailService.findById(id);
        return ResponseEntity.ok(trailDTO);
    }

    /*
    @GetMapping("/trail{trailId}/quizzes")
    public ResponseEntity<List<QuizDTO>> getQuizzesByTrailId(@PathVariable Long quizId) {
        List<QuizDTO> quizzes = questionService.findByQuizId(quizId);
        return ResponseEntity.ok(questions);
    }


     */

    // Endpoint para visualizar todas as perguntas de um quiz específico
    @GetMapping("/quiz/{quizId}/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestionsByQuizId(@PathVariable Long quizId) {
        List<QuestionDTO> questions = questionService.findByQuizId(quizId);
        return ResponseEntity.ok(questions);
    }

    // Endpoint para enviar uma resposta para uma pergunta específica
    @PostMapping("/quiz/{quizId}/question/{questionId}/answer")
    public ResponseEntity<String> submitAnswer(
            @PathVariable Long quizId,
            @PathVariable Long questionId,
            @RequestParam int selectedOptionIndex) {

        boolean isCorrect = questionService.checkAnswer(quizId, questionId, selectedOptionIndex);
        if (isCorrect) {
            return ResponseEntity.ok("Correct answer!");
        } else {
            return ResponseEntity.ok("Wrong answer, try again!");
        }
    }

    // Endpoint para obter o progresso ou pontuação de um usuário em um quiz específico
    @GetMapping("/quiz/{quizId}/progress")
    public ResponseEntity<String> getUserProgress(@PathVariable Long quizId) {
        int score = quizService.getQuizScore(quizId);
        return ResponseEntity.ok("Your current score is: " + score);
    }



}
