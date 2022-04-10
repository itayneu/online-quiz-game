import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Text from "../Text";
import Button from "../Button";
import * as S from "./style";

const Question = ({
  numberOfQuestions,
  question,
  answers,
  correctAnswer,
  currentQuestion,
  setCurrentQuestion,
  score,
  setScore,
  setStartQuiz,
  setEndQuiz,
}) => {
  const [timeLeft, setTimeLeft] = useState(20);

  const nextQuestion = () => {
    setTimeout(() => {
      if (currentQuestion === numberOfQuestions - 1) {
        setStartQuiz(false);
        setEndQuiz(true);
      }
      setCurrentQuestion((currentQuestion) => currentQuestion + 1);
      setTimeLeft(20);
    }, 750);
  };

  const handleClick = (answer) => {
    if (answer === correctAnswer) {
      toast.success("Correct answer!", {
        position: "top-left",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setScore((currentScore) => currentScore + 1);
    } else {
      toast.error(`Incorrect answer, Correct answer is ${correctAnswer}`, {
        position: "top-left",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    nextQuestion();
  };

  useEffect(() => {
    if (timeLeft === 0) {
      toast.warn(`Time is up, Correct answer is ${correctAnswer}`, {
        position: "top-left",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      nextQuestion();
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <S.Question>
      <Text size="16px">Score: {score}</Text>
      <Text size="16px">Time: {timeLeft}</Text>
      <S.Header>
        <Text size="24px" bold>
          {question}
        </Text>
      </S.Header>
      <S.Answers>
        {answers.map((answer) => {
          return (
            <S.Button>
              <Button
                label={answer}
                variant="outlined"
                onClick={() => handleClick(answer)}
              />
            </S.Button>
          );
        })}
      </S.Answers>
    </S.Question>
  );
};

export default Question;
