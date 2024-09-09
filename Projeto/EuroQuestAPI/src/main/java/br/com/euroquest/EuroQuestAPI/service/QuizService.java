package br.com.euroquest.EuroQuestAPI.service;


import br.com.euroquest.EuroQuestAPI.dto.QuestionDTO;
import br.com.euroquest.EuroQuestAPI.dto.QuizDTO;

import br.com.euroquest.EuroQuestAPI.model.Question;
import br.com.euroquest.EuroQuestAPI.model.Quiz;
import br.com.euroquest.EuroQuestAPI.repository.QuestionRepository;
import br.com.euroquest.EuroQuestAPI.repository.QuizRepository;
import br.com.euroquest.EuroQuestAPI.repository.TrailRepository;
import br.com.euroquest.EuroQuestAPI.service.exception.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private TrailRepository trailRepository;
    @Autowired
    private QuestionRepository questionRepository;

    protected QuizDTO convertToDTO(Quiz quiz) {
            return modelMapper.map(quiz, QuizDTO.class);
    }

    private Quiz convertToEntity(QuizDTO dto) {
        return modelMapper.map(dto, Quiz.class);
    }


    @Transactional(readOnly = true)
    public List<QuizDTO> findAll() {
        List<Quiz> quizzes = quizRepository.findAll();
        return quizzes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public QuizDTO findById(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return convertToDTO(quiz);
    }

    // create quiz
    @Transactional
    public QuizDTO insert(QuizDTO quizDTO) {
        Quiz savedQuiz = quizRepository.save(convertToEntity(quizDTO));
        if (quizDTO.getQuestions() != null) {
            for (QuestionDTO questionDTO : quizDTO.getQuestions()) {
                Question question = new Question();
                question.setQuestionText(questionDTO.getQuestionText());
                question.setOptions(questionDTO.getOptions());
                question.setCorrectOptionIndex(questionDTO.getCorrectOptionIndex());
                question.setQuiz(savedQuiz);
                questionRepository.save(question);
            }
        }
        return convertToDTO(savedQuiz);
    }

    @Transactional
    public void delete(Long id) {
        if (!quizRepository.existsById(id)) {
            throw new ResourceNotFoundException(id);
        }
        quizRepository.deleteById(id);
    }


    public int getQuizScore(Long quizId) {
        QuizDTO quizDTO = findById(quizId);
         return quizDTO.getScore();
    }




}
