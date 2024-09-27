package br.com.euroquest.EuroQuestAPI.controller;

import br.com.euroquest.EuroQuestAPI.dto.QuestionDTO;
import br.com.euroquest.EuroQuestAPI.dto.ThemeDTO;
import br.com.euroquest.EuroQuestAPI.dto.TrailDTO;
import br.com.euroquest.EuroQuestAPI.model.Trail;
import br.com.euroquest.EuroQuestAPI.service.QuestionService;
import br.com.euroquest.EuroQuestAPI.service.ThemeService;
import br.com.euroquest.EuroQuestAPI.service.TrailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("euro/admin")
public class AdminController {

    private QuestionService questionService;
    private TrailService trailService;
    private ThemeService themeService;

    @Autowired
    public AdminController(QuestionService questionService, ThemeService themeService, TrailService trailService) {
        this.questionService = questionService;
        this.themeService = themeService;
        this.trailService = trailService;
    }

    // Theme Endpoints
    @PostMapping("/theme")
    public ResponseEntity<ThemeDTO> createTheme(@RequestBody ThemeDTO themeDTO) {
        ThemeDTO createdTheme = themeService.insert(themeDTO);
        return ResponseEntity.ok(createdTheme);
    }

    @GetMapping("/theme")
    public ResponseEntity<List<ThemeDTO>> getAllThemes() {
        List<ThemeDTO> themes = themeService.findAll();
        return ResponseEntity.ok(themes);
    }

    @GetMapping("/theme/{themeId}")
    public ResponseEntity<ThemeDTO> getThemeById(@PathVariable Long themeId) {
        ThemeDTO themeDTO = themeService.findById(themeId);
        return ResponseEntity.ok(themeDTO);
    }

    @PutMapping("/theme/{themeId}")
    public ResponseEntity<ThemeDTO> updateTheme(@PathVariable Long themeId, @RequestBody ThemeDTO themeDTO) {
        ThemeDTO updatedTheme = themeService.update(themeId, themeDTO);
        return ResponseEntity.ok(updatedTheme);
    }

    @DeleteMapping("/theme/{themeId}")
    public ResponseEntity<Void> deleteTheme(@PathVariable Long themeId) {
        themeService.delete(themeId);
        return ResponseEntity.noContent().build();
    }


    // Trail Endpoints


    @GetMapping("/theme/{themeId}/trail")
    public ResponseEntity<List<TrailDTO>> getAllTrails() {
        List<TrailDTO> trails = trailService.findAll();
        return ResponseEntity.ok(trails);
    }


    @PostMapping("/theme/{themeId}/trail")
    public ResponseEntity<TrailDTO> createTrail(@PathVariable Long themeId, @RequestBody TrailDTO trailDTO) {
        trailDTO.setThemeId(themeId);
        TrailDTO createdTrail = trailService.insert(trailDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTrail);
    }

    @PutMapping("/theme/{themeId}/trail/{trailId}")
    public ResponseEntity<TrailDTO> updateTrail(@PathVariable  @Valid Long trailId, @RequestBody TrailDTO trailDTO) {
        TrailDTO updatedTrail = trailService.update(trailId, trailDTO);
        return ResponseEntity.ok(updatedTrail);
    }

    @DeleteMapping("/theme/{themeId}/trail/{trailId}")
    public ResponseEntity<Void> deleteTrail(@PathVariable Long trailId) {
        trailService.delete(trailId);
        return ResponseEntity.noContent().build();
    }

    // Question Endpoints

    @GetMapping("/theme/{themeId}/trail/{trailId}/question")
    public ResponseEntity<List<QuestionDTO>> getAllQuestionsByTrail(@PathVariable Long trailId) {
        List<QuestionDTO> questions = questionService.findByTrailId(trailId);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/questions")
    public ResponseEntity<List<QuestionDTO>> getAllQuestions() {
        List<QuestionDTO> questions = questionService.findAll();
        return ResponseEntity.ok(questions);
    }



    @PostMapping("/theme/{themeId}/trail/{trailId}/question")
    public ResponseEntity<QuestionDTO> addQuestionToTrail(@PathVariable Long trailId, @RequestBody QuestionDTO questionDTO) {
        QuestionDTO createdQuestion = questionService.addQuestionToTrail(trailId, questionDTO);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }

    @PostMapping("/theme/{themeId}/trail/{trailId}/question/{questionId}/existing")
    public ResponseEntity<QuestionDTO> addExistingQuestionToTrail(
            @PathVariable Long trailId,
            @PathVariable Long questionId) {
        QuestionDTO updatedQuestion = questionService.addExistingQuestionToTrail(trailId, questionId);
        return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
    }

    @PostMapping("/questions/new")
    public ResponseEntity<QuestionDTO> createNewQuestion(@RequestBody QuestionDTO questionDTO) {
        QuestionDTO createdQuestion = questionService.insert(questionDTO);
        return ResponseEntity.ok(createdQuestion);
    }

    @PutMapping({"/theme/{themeId}/trail/{trailId}/question/{questionId}", "/questions/{questionId}"})
    public ResponseEntity<QuestionDTO> updateQuestion(@PathVariable Long questionId, @RequestBody QuestionDTO questionDTO) {
        QuestionDTO updatedQuestion = questionService.update(questionId, questionDTO);
        return ResponseEntity.ok(updatedQuestion);
    }

    @DeleteMapping({"/theme/{themeId}/trail/{trailId}/question/{questionId}", "/questions/{questionId}"})
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long questionId) {
        questionService.delete(questionId);
        return ResponseEntity.noContent().build();
    }
}
