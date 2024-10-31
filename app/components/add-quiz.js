'use client';

import React, { useEffect, useState } from 'react';

import classes from './add-quiz.module.css';

export default function AddQuiz() {
//   localStorage.removeItem('quizzes');
//   localStorage.removeItem('questions');
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '' },
  ]);
  const [lastId, setLastId] = useState(null);

  useEffect(() => {
    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    if (savedQuizzes.length > 0) {
      const maxId = Math.max(...savedQuizzes.map((quiz) => quiz.id));
      setLastId(maxId);
    } else {
      fetch('/api/quizzes')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch the quizzes');
          }
          return response.json();
        })
        .then((data) => {
          const lastQuiz = data.quizzes[data.quizzes.length - 1];
          setLastId(lastQuiz.id);
        })
        .catch((error) => {
          console.error('Error fetching quizzes:', error);
        });
    }
  }, []);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuiz = {
      id: lastId + 1,
      name: quizTitle,
    };

    const existingQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const updatedQuizzes = [...existingQuizzes, newQuiz];
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));

    const newQuestions = {
      [lastId + 1]: questions,
    };

    const existingQuestions =
      JSON.parse(localStorage.getItem('questions')) || [];
    const updatedQuestions = [...existingQuestions, newQuestions];
    localStorage.setItem(`questions`, JSON.stringify(updatedQuestions));

    // Reset form
    setQuizTitle('');
    setQuestions([
      { question: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <label>Quiz Title:</label>
          <input
            type='text'
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            required
          />
        </div>

        {questions.map((question, qIndex) => (
          <div key={qIndex}>
            <label>Question {qIndex + 1}:</label>
            <input
              type='text'
              value={question.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              required
            />

            {question.options.map((option, oIndex) => (
              <div key={oIndex}>
                <label>Possible Answer {oIndex + 1}:</label>
                <input
                  type='text'
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  required
                />
              </div>
            ))}

            <div>
              <label>Correct Answer:</label>
              <select
                value={question.correctAnswer}
                onChange={(e) =>
                  handleCorrectAnswerChange(qIndex, e.target.value)
                }
                required
              >
                <option value=''>Select correct answer</option>
                {question.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <button type='button' onClick={addNewQuestion}>
          Add Question
        </button>

        <button type='submit'>Save New Quiz</button>
      </form>
    </>
  );
}
