'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import classes from './page.module.css';
import Header from '@/app/components/header';

export default function Categories() {
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('/api/quizzes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch the quizzes');
        }
        return response.json();
      })
      .then((data) => {
        const apiQuizzes = data.quizzes || [];

        const savedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
        setQuizzes([...apiQuizzes, ...savedQuizzes]);

        const savedQuest = JSON.parse(localStorage.getItem('questions')) || [];
        setQuestions(savedQuest);
      })
      .catch((error) => {
        console.error('Error fetching quizzes:', error);
      });
  }, []);

  console.log(quizzes)
  console.log(questions)

  return (
    <>
      <Header></Header>
      <div className={classes.container}>
        <h2>Choose a Quiz</h2>
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <Link href={`/quiz/${quiz.id}${quiz.name}`}>
                <button>{quiz.name}</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
