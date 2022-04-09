import React, { useState } from "react";
import Text from "../../components/Text";
import Question from "../../components/Question";
import NewGame from "../../components/NewGame";
import { useQuestionsFetch } from "../../hooks";
import { decode } from "he";
import * as S from "./style";

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  const [endQuiz, setEndQuiz] = useState(false);

  const { questions } = useQuestionsFetch(startQuiz);
  let question = "",
    answers = [],
    correctAnswer = "";

  if (questions.length > 0 && currentQuestion < questions.length) {
    question = decode(questions[currentQuestion]?.question);
    correctAnswer = questions[currentQuestion]?.correct_answer;
    let incorrectAnswers = questions[currentQuestion]?.incorrect_answers;
    answers = [correctAnswer, ...incorrectAnswers];
    answers.forEach((answer, index) => {
      answers[index] = decode(answer);
    });
    let correctIndex = Math.floor(Math.random() * answers.length);
    let tmp = answers[correctIndex];
    answers[correctIndex] = answers[0];
    answers[0] = tmp;
    console.log(question);
  }

  console.log(questions);
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
