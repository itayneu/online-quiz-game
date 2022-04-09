import React, { useState } from "react";
import { decode } from "he";
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
    correctAnswer = questions[currentQuestion]?.correct_answer;
    answers = [correctAnswer, ...questions[currentQuestion]?.incorrect_answers];
    answers.forEach((answer, index) => {
      answers[index] = decode(answer);
    });

    let correctIndex = Math.floor(Math.random() * answers.length);
    let tmp = answers[correctIndex];
    answers[correctIndex] = answers[0];
    answers[0] = tmp;
  }

  const render = () => {
    if (startQuiz) {
      return (
        <Question
          currentQuestion={currentQuestion}
          question={question}
          answers={answers}
          numberOfQuestions={questions.length}
          correctAnswer={correctAnswer}
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
          setStartQuiz={setStartQuiz}
          setEndQuiz={setEndQuiz}
          setCurrentQuestion={setCurrentQuestion}
          score={score}
          setScore={setScore}
          endQuiz={endQuiz}
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
