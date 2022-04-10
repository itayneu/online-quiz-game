import React, { useState } from "react";
import { decode } from "he";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Text from "../../components/Text";
import NewGame from "../../components/NewGame";
import Question from "../../components/Question";
import { useQuestionsFetch } from "../../hooks";
import * as S from "./style";

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState("5");
  const [difficulty, setDifficulty] = useState("mixed");

  const { questions } = useQuestionsFetch(
    startQuiz,
    numberOfQuestions,
    difficulty
  );

  let question = "",
    answers = [],
    correctAnswer = "";

  if (questions.length > 0 && currentQuestion < questions.length) {
    question = decode(questions[currentQuestion]?.question);
    correctAnswer = decode(questions[currentQuestion]?.correct_answer);
    let incorrectAnswers = questions[currentQuestion]?.incorrect_answers;
    incorrectAnswers.forEach((answer, index) => {
      incorrectAnswers[index] = decode(answer);
    });
    answers = [correctAnswer, ...incorrectAnswers];

    let correctIndex = Math.floor(Math.random() * answers.length);
    let tmp = answers[correctIndex];
    answers[correctIndex] = answers[0];
    answers[0] = tmp;
  }

  const render = () => {
    if (startQuiz) {
      return (
        <Question
          numberOfQuestions={questions.length}
          question={question}
          answers={answers}
          correctAnswer={correctAnswer}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          score={score}
          setScore={setScore}
          setStartQuiz={setStartQuiz}
          setEndQuiz={setEndQuiz}
        />
      );
    } else
      return (
        <NewGame
          setCurrentQuestion={setCurrentQuestion}
          score={score}
          setScore={setScore}
          setStartQuiz={setStartQuiz}
          endQuiz={endQuiz}
          setEndQuiz={setEndQuiz}
          numberOfQuestions={numberOfQuestions}
          setNumberOfQuestions={setNumberOfQuestions}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      );
  };

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <ToastContainer hideProgressBar={true} />
          <Text size="64px" bold>
            Online Quiz Game
          </Text>
        </S.Header>
        {render()}
      </S.Content>
    </S.Home>
  );
};

export default Home;
