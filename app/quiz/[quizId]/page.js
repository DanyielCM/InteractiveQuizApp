import Link from 'next/link';

import classes from './page.module.css';
import Header from '@/app/components/header';

export default function Quiz({ params }) {
  const quiz = params.quizId.split('');
  const quizId = quiz.slice(0, 1).join('');
  const quizName = quiz.slice(1, params.quizId.lenght).join('');

  return (
    <>
      <Header></Header>
      <div className={classes.container}>
        <h2>Welcome to {quizName} Quiz!</h2>
        <p>
          Test your {quizName} skills and see how much you really know! Answer
          each question carefully, and don&apos;t worry — there&apos;s always
          something new to learn. Good luck, and let the challenge begin!
        </p>
        <Link href={`/quiz/${quizId}${quizName}/question/0`}>
          <button>Begin Quiz</button>
        </Link>
      </div>
    </>
  );
}
