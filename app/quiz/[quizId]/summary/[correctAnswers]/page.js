import Link from 'next/link';

import classes from './pages.module.css';
import Header from '@/app/components/header';

export default function Summary({ params }) {
  const quiz = params.quizId.split('');
  const answers = params.correctAnswers.split('');
  const quizId = quiz.slice(0, 1).join('');
  const quizName = quiz.slice(1, params.quizId.lenght).join('');
  const quizCorrectAnswers = answers.slice(0, 1).join('');
  const quizLength = answers.slice(1, 2).join('');

  return (
    <>
      <Header></Header>
      <div className={classes.container}>
        <h2>
          You got {quizCorrectAnswers} correct answers out of {quizLength}!
        </h2>
        {quizCorrectAnswers > quizLength / 2 ? (
          <p>Hurray! You were right about most of them!</p>
        ) : (
          <p>Try your luck next time!</p>
        )}
        <Link href='/categories'>
          <button>Get back to Quiz Categories</button>
        </Link>
      </div>
    </>
  );
}
