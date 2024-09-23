package br.com.euroquest.EuroQuestAPI.controller;

import br.com.euroquest.EuroQuestAPI.dto.QuestionDTO;
import br.com.euroquest.EuroQuestAPI.dto.TrailDTO;
import br.com.euroquest.EuroQuestAPI.service.QuestionService;
import br.com.euroquest.EuroQuestAPI.service.TrailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("euro/admin")
public class AdminController {


    //classe alterada
    @Autowired
    private QuestionService questionService;
    @Autowired
    private TrailService trailService;

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


    @PostMapping("/question")
    public ResponseEntity<QuestionDTO> createQuestion(@RequestBody QuestionDTO questionDTO) {
        QuestionDTO createdQuestion = questionService.insert(questionDTO);
        return ResponseEntity.ok(createdQuestion);
    }

    @PostMapping("/trails/{trailId}/questions")
    public ResponseEntity<QuestionDTO> addQuestionToTrail(@PathVariable Long trailId, @RequestBody QuestionDTO questionDTO) {
        QuestionDTO createdQuestion = questionService.addQuestionToTrail(trailId, questionDTO);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }

    @PostMapping("/trails/{trailId}/questions/{questionId}")
    public ResponseEntity<QuestionDTO> addExistingQuestionToTrail(
            @PathVariable Long trailId,
            @PathVariable Long questionId) {
        QuestionDTO updatedQuestion = questionService.addExistingQuestionToTrail(trailId, questionId);
        return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
    }



}
    