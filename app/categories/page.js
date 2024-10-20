"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import classes from "./page.module.css";
import Header from "@/app/components/header";

export default function Categories() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("/quizzes.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the quizzes");
        }
        return response.json();
      })
      .then((data) => {
        setQuizzes(data.quizzes);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
      });
  }, []);

  return (
    <>
      <Header></Header>
      <div className={classes.container}>
        <h2>Choose a Quiz</h2>
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <Link href={`/quiz/${quiz.id}${quiz.name}`}><button>{quiz.name}</button></Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
