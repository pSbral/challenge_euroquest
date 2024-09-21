package br.com.euroquest.EuroQuestAPI.service;

import br.com.euroquest.EuroQuestAPI.dto.QuestionDTO;
import br.com.euroquest.EuroQuestAPI.model.Question;
import br.com.euroquest.EuroQuestAPI.model.Trail;
import br.com.euroquest.EuroQuestAPI.repository.QuestionRepository;
import br.com.euroquest.EuroQuestAPI.repository.TrailRepository;
import br.com.euroquest.EuroQuestAPI.service.exception.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class QuestionService {

    @Autowired
    private ModelMapper modelMapper;


    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TrailRepository trailRepository;

    public QuestionDTO convertToDTO(Question question) {
        return modelMapper.map(question, QuestionDTO.class);
    }

    public Question convertToEntity(QuestionDTO dto) {
        return modelMapper.map(dto, Question.class);
    }


    @Transactional(readOnly = true)
    public List<QuestionDTO> findAll() {
        List<Question> questions = questionRepository.findAll();
        return questions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public QuestionDTO findById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return convertToDTO(question);
    }

    //admin
    @Transactional
    public QuestionDTO insert(QuestionDTO questionDTO) {
        Question question = convertToEntity(questionDTO);
        Question savedQuestion = questionRepository.save(question);
        return convertToDTO(savedQuestion);
    }

    @Transactional
    public QuestionDTO addQuestionToTrail(Long trailId, QuestionDTO questionDTO) {
        Trail trail = trailRepository.findById(trailId)
                .orElseThrow(ResourceNotFoundException::new);
        Question question = convertToEntity(questionDTO);
        question.setTrail(trail);
        return convertToDTO(questionRepository.save(question));
    }

    @Transactional
    public QuestionDTO addExistingQuestionToTrail(Long trailId, Long questionId) {
        Trail trail = trailRepository.findById(trailId)
                .orElseThrow(ResourceNotFoundException::new);

        Question question = questionRepository.findById(questionId)
                .orElseThrow(ResourceNotFoundException::new);
        question.setTrail(trail);
        Question updatedQuestion = questionRepository.save(question);
        return convertToDTO(updatedQuestion);
    }

    //user

    @Transactional(readOnly = true)
    public List<QuestionDTO> findByTrailId(Long trailId) {
        List<Question> questions = questionRepository.findByTrailId(trailId);
        return questions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public boolean checkAnswer(Long trailId, Long questionId, int selectedOptionIndex) {
        Question question = questionRepository.findByIdAndTrailId(questionId, trailId)
                .orElseThrow(ResourceNotFoundException::new);
        return question.isCorrectAnswer(selectedOptionIndex);
    }




}
