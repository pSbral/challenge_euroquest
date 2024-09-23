package br.com.euroquest.EuroQuestAPI.service;

import br.com.euroquest.EuroQuestAPI.dto.QuestionDTO;
import br.com.euroquest.EuroQuestAPI.model.Question;
import br.com.euroquest.EuroQuestAPI.model.Trail;
import br.com.euroquest.EuroQuestAPI.repository.QuestionRepository;
import br.com.euroquest.EuroQuestAPI.repository.TrailRepository;
import br.com.euroquest.EuroQuestAPI.service.exception.ResourceNotFoundException;
import br.com.euroquest.EuroQuestAPI.util.Converter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class QuestionService {


    private final Converter converter;
    private final QuestionRepository questionRepository;
    private final TrailRepository trailRepository;

    @Autowired
    public QuestionService(Converter converter, QuestionRepository questionRepository, TrailRepository trailRepository) {
        this.converter = converter;
        this.questionRepository = questionRepository;
        this.trailRepository = trailRepository;
    }

    @Transactional(readOnly = true)
    public List<QuestionDTO> findAll() {
        List<Question> questions = questionRepository.findAll();
        return questions.stream()
                .map(question -> converter.toDTO(question, QuestionDTO.class))
                .collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public QuestionDTO findById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return converter.toDTO(question, QuestionDTO.class);
    }

    //admin
    @Transactional
    public QuestionDTO insert(QuestionDTO questionDTO) {
        Question question = converter.toEntity(questionDTO, Question.class);
        Question savedQuestion = questionRepository.save(question);
        return converter.toDTO(savedQuestion, QuestionDTO.class);
    }

    @Transactional
    public QuestionDTO addQuestionToTrail(Long trailId, QuestionDTO questionDTO) {
        Trail trail = trailRepository.findById(trailId)
                .orElseThrow(ResourceNotFoundException::new);
        Question question = converter.toEntity(questionDTO, Question.class);
        question.setTrail(trail);
        Question savedQuestion = questionRepository.save(question);
        return converter.toDTO(savedQuestion, QuestionDTO.class);
    }

    @Transactional
    public QuestionDTO addExistingQuestionToTrail(Long trailId, Long questionId) {
        Trail trail = trailRepository.findById(trailId)
                .orElseThrow(ResourceNotFoundException::new);

        Question question = questionRepository.findById(questionId)
                .orElseThrow(ResourceNotFoundException::new);
        question.setTrail(trail);
        Question updatedQuestion = questionRepository.save(question);
        return converter.toDTO(updatedQuestion, QuestionDTO.class);
    }

    //user

    @Transactional(readOnly = true)
    public List<QuestionDTO> findByTrailId(Long trailId) {
        List<Question> questions = questionRepository.findByTrailId(trailId);
        return questions.stream()
                .map(question -> converter.toDTO(question, QuestionDTO.class))
                .toList();
    }

    public boolean checkAnswer(Long trailId, Long questionId, int selectedOptionIndex) {
        Question question = questionRepository.findByIdAndTrailId(questionId, trailId)
                .orElseThrow(ResourceNotFoundException::new);
        return question.isCorrectAnswer(selectedOptionIndex);
    }




}
