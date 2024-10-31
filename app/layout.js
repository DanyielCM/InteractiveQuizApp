import "./globals.css";

export const metadata = {
  title: "QuizMaster",
  description: "A quiz app created with next",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
