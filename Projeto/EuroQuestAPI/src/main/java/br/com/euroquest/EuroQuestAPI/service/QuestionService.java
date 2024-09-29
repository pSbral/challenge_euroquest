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

import java.util.ArrayList;
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
                .map(converter::toDTO)
                .collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public QuestionDTO findById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return converter.toDTO(question);
    }

    @Transactional
    public QuestionDTO insert(QuestionDTO questionDTO) {
        Question question = converter.toEntity(questionDTO);
        Question savedQuestion = questionRepository.save(question);
        return converter.toDTO(savedQuestion);
    }

    @Transactional
    public QuestionDTO addQuestionToTrail(Long trailId, QuestionDTO questionDTO) {
        Trail trail = trailRepository.findById(trailId)
                .orElseThrow(ResourceNotFoundException::new);
        Question question = converter.toEntity(questionDTO);
        question.setTrail(trail);
        Question savedQuestion = questionRepository.save(question);
        return converter.toDTO(savedQuestion);
    }

    @Transactional
    public QuestionDTO addExistingQuestionToTrail(Long trailId, Long questionId) {
        Question originalQuestion = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException(questionId));
        Trail trail = trailRepository.findById(trailId)
                .orElseThrow(() -> new ResourceNotFoundException(trailId));
        Question copiedQuestion = new Question();
        copiedQuestion.setQuestionText(originalQuestion.getQuestionText());
        copiedQuestion.setCorrectOptionIndex(originalQuestion.getCorrectOptionIndex());
        copiedQuestion.setOptions(new ArrayList<>(originalQuestion.getOptions()));
        copiedQuestion.setTrail(trail);
        Question savedQuestion = questionRepository.save(copiedQuestion);
        return converter.toDTO(savedQuestion);
    }


    @Transactional
    public QuestionDTO update(Long id, QuestionDTO questionDTO) {
        Question existingQuestion = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        Trail trail = trailRepository.findById(questionDTO.getTrailId())
                .orElseThrow(() -> new ResourceNotFoundException(questionDTO.getTrailId()));

        existingQuestion.setTrail(trail);
        existingQuestion.setQuestionText(questionDTO.getQuestionText());
        existingQuestion.setOptions(questionDTO.getOptions());
        existingQuestion.setCorrectOptionIndex(questionDTO.getCorrectOptionIndex());
        Question updatedQuestion = questionRepository.save(existingQuestion);
        return converter.toDTO(updatedQuestion);
    }

    @Transactional
    public void delete(Long id) {
        if(!(questionRepository.existsById(id))) {
            throw new ResourceNotFoundException(id);
        }
        questionRepository.deleteById(id);
    }

    //user

    @Transactional(readOnly = true)
    public List<QuestionDTO> findByTrailId(Long trailId) {
        List<Question> questions = questionRepository.findByTrailId(trailId);
        return questions.stream()
                .map(converter::toDTO)
                .toList();
    }

    public boolean checkAnswer(Long trailId, Long questionId, int selectedOptionIndex) {
        Question question = questionRepository.findByIdAndTrailId(questionId, trailId)
                .orElseThrow(ResourceNotFoundException::new);
        return question.isCorrectAnswer(selectedOptionIndex);
    }




}
