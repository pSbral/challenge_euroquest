package br.com.euroquest.EuroQuestAPI.controller;

import br.com.euroquest.EuroQuestAPI.dto.QuestionDTO;
import br.com.euroquest.EuroQuestAPI.dto.ThemeDTO;
import br.com.euroquest.EuroQuestAPI.dto.TrailDTO;
import br.com.euroquest.EuroQuestAPI.service.QuestionService;
import br.com.euroquest.EuroQuestAPI.service.ThemeService;
import br.com.euroquest.EuroQuestAPI.service.TrailService;
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
    @PostMapping("/theme/{themeId}/trail")
    public ResponseEntity<TrailDTO> createTrail(@RequestBody TrailDTO trailDTO) {
        TrailDTO createdTrail = trailService.insert(trailDTO);
        return ResponseEntity.ok(createdTrail);
    }

    @PutMapping("/theme/{themeId}/trail/{trailId}")
    public ResponseEntity<TrailDTO> updateTrail(@PathVariable Long trailId, @RequestBody TrailDTO trailDTO) {
        TrailDTO updatedTrail = trailService.update(trailId, trailDTO);
        return ResponseEntity.ok(updatedTrail);
    }

    @DeleteMapping("/theme/{themeId}/trail/{trailId}")
    public ResponseEntity<Void> deleteTrail(@PathVariable Long trailId) {
        trailService.delete(trailId);
        return ResponseEntity.noContent().build();
    }

    // Question Endpoints
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

    @PutMapping("/theme/{themeId}/trail/{trailId}/question/{questionId}")
    public ResponseEntity<QuestionDTO> updateQuestion(@PathVariable Long questionId, @RequestBody QuestionDTO questionDTO) {
        QuestionDTO updatedQuestion = questionService.update(questionId, questionDTO);
        return ResponseEntity.ok(updatedQuestion);
    }

    @DeleteMapping("/theme/{themeId}/trail/{trailId}/question/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long questionId) {
        questionService.delete(questionId);
        return ResponseEntity.noContent().build();
    }
}
