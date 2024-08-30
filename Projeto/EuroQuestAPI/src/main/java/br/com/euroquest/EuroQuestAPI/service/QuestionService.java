package br.com.euroquest.EuroQuestAPI.service;

import br.com.euroquest.EuroQuestAPI.dto.QuestionDTO;
import br.com.euroquest.EuroQuestAPI.model.Question;
import br.com.euroquest.EuroQuestAPI.model.Quiz;
import br.com.euroquest.EuroQuestAPI.repository.QuestionRepository;
import br.com.euroquest.EuroQuestAPI.repository.QuizRepository;
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
    private QuizRepository quizRepository;

    private QuestionDTO convertToDTO(Question question) {
        return modelMapper.map(question, QuestionDTO.class);
    }

    private Question convertToEntity(QuestionDTO dto) {
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
    public QuestionDTO addQuestionToQuiz(Long quizId, QuestionDTO questionDTO) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(ResourceNotFoundException::new);
        Question question = convertToEntity(questionDTO);
        question.setQuiz(quiz);
        return convertToDTO(questionRepository.save(question));
    }

    @Transactional
    public QuestionDTO addExistingQuestionToQuiz(Long quizId, Long questionId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(ResourceNotFoundException::new);

        Question question = questionRepository.findById(questionId)
                .orElseThrow(ResourceNotFoundException::new);

        // Associe a pergunta ao quiz
        question.setQuiz(quiz);
        Question updatedQuestion = questionRepository.save(question);

        return convertToDTO(updatedQuestion);
    }

    //user


    @Transactional(readOnly = true)
    public List<QuestionDTO> findByQuizId(Long quizId) {
        List<Question> questions = questionRepository.findByQuizId(quizId);
        return questions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public boolean checkAnswer(Long quizId, Long questionId, int selectedOptionIndex) {
        Question question = questionRepository.findByIdAndQuizId(questionId, quizId)
                .orElseThrow(ResourceNotFoundException::new);
        return question.isCorrectAnswer(selectedOptionIndex);
    }




}
