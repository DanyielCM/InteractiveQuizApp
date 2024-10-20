import Link from "next/link";
import Image from "next/image";

import classes from "./header.module.css";
import quizLogo from "@/assets/quiz-logo.png";

export default function Header() {
  return (
    <>
      <header className={classes.header}>
        <Image className={classes.logo} src={quizLogo} alt="A cronometer"  priority></Image>
        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
