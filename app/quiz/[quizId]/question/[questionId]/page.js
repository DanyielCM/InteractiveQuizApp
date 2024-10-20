'use client';

import React, { useEffect, useState } from 'react';

import classes from './page.module.css';
import Answer from './answer';
import Link from 'next/link';
import Header from '@/app/components/header';

export default function Question({ params }) {
  const quiz = params.quizId.split('');
  const quizId = quiz.slice(0, 1).join('');
  const quizName = quiz.slice(1, params.quizId.lenght).join('');

  const [questions, setQuestions] = useState([]);
  const [questionsIndex, setQuestionsIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [additionalClass, setAdditionalClass] = useState('');
  const [disabled, setDisabled] = useState(false);

  const quizCompleted = questionsIndex === questions[quizId]?.length;
  const currentQuestion = questions[quizId]?.[questionsIndex];


  useEffect(() => {
    const questionsLS = JSON.parse(localStorage.getItem('questions')) || [];
    const foundQuestions = questionsLS.find((questions) => questions[quizId]);
    const savedQuestions = foundQuestions ? foundQuestions : 0;
 
    if (savedQuestions) {
      setQuestions(savedQuestions);
    } else {
      fetch('/api/questions')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch the questions');
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      })

      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
    }
    
  }, [quizId]);

  function handleAnswer(option) {
    if (disabled) return;
    setDisabled(true);

    checkAnswer(option);
    setTimeout(() => {
      setQuestionsIndex((prevIndex) => prevIndex + 1);
      setDisabled(false);
    }, '2000');
  }

  function checkAnswer(option) {
    setSelectedAnswer(option);
    if (option === questions[quizId][questionsIndex].correctAnswer) {
      setCorrectAnswers((prevCount) => prevCount + 1);
      setAdditionalClass(classes.correct);
    } else {
      setAdditionalClass(classes.wrong);
    }
  }

  return (
    <>
      <Header></Header>
      <div className={classes.container}>
        <>
          {quizCompleted ? (
            <Link
              href={`/quiz/${quizId}${quizName}/summary/${correctAnswers}${questionsIndex}`}
            >
              <h2>Check Summary</h2>
            </Link>
          ) : (
            <>
              {currentQuestion ? (
                <>
                  <h2>{questions[quizId][questionsIndex].question}</h2>
                  <ul>
                    {questions[quizId][questionsIndex].options.map((option) => {
                      const isSelected = selectedAnswer === option;
                      return (
                        <li key={option}>
                          <Answer
                            quizId={quizId}
                            handleAnswer={handleAnswer}
                            isSelected={isSelected}
                            additionalClass={additionalClass}
                          >
                            {option}
                          </Answer>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <h2>Loading your questions...</h2>
              )}
            </>
          )}
        </>
      </div>
    </>
  );
}
