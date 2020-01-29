import Link from "next/link";
import { FC } from "react";

const AboutPage: FC = () => (
  <>
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </>
);

export default AboutPage;
