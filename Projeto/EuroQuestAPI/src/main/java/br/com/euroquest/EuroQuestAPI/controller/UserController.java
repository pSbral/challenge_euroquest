package br.com.euroquest.EuroQuestAPI.controller;

import br.com.euroquest.EuroQuestAPI.dto.QuestionDTO;
import br.com.euroquest.EuroQuestAPI.dto.TrailDTO;
import br.com.euroquest.EuroQuestAPI.service.QuestionService;
import br.com.euroquest.EuroQuestAPI.service.TrailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("euro/user")
public class UserController {


    private TrailService trailService;
    private QuestionService questionService;

    @Autowired
    public UserController(TrailService trailService, QuestionService questionService) {
        this.trailService = trailService;
        this.questionService = questionService;
    }

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

    @GetMapping("/trail/{trailId}/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestionsByTrailId(@PathVariable Long trailId) {
        List<QuestionDTO> questions = questionService.findByTrailId(trailId);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/trail/{trailId}/question/{questionId}/answer")
    public ResponseEntity<String> submitAnswer(
            @PathVariable Long trailId,
            @PathVariable Long questionId,
            @RequestParam int selectedOptionIndex) {

        boolean isCorrect = questionService.checkAnswer(trailId, questionId, selectedOptionIndex);
        if (isCorrect) {
            return ResponseEntity.ok("Correct answer!");
        } else {
            return ResponseEntity.ok("Wrong answer, try again!");
        }
    }

    @GetMapping("/trail/{trailId}/progress")
    public ResponseEntity<String> getUserProgress(@PathVariable Long quizId) {
        int score = trailService.getTrailScore(quizId);
        return ResponseEntity.ok("Your current score is: " + score);
    }



}
