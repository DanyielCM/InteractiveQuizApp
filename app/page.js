import Image from 'next/image';
import Link from 'next/link';

import Header from './components/header';
import classes from './page.module.css';

export default function Home() {
  return (
    <main>
      <Header></Header>
      <div className={classes.container}>
        <h2>Welcome to QuizMaster!</h2>
        <p>
          Get ready to test your knowledge and have some fun! Whether
          you&apos;re a trivia expert or just looking to challenge yourself,
          we&apos;ve got exciting questions lined up just for you. Choose your
          category, start the quiz, and see how many you can get right! Good
          luck, and let&apos;s get quizzing!
        </p>
        <Link href='/categories' className={classes.link}>
          <button>Explore Categories</button>
        </Link>
      </div>
    </main>
  );
}
