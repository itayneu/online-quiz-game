import React, { useState, useEffect } from "react";
import Text from "../Text";
import Button from "../Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as S from "./style";
import "./Question.css";
import { decode } from "he";

const Question = ({
  question,
  answers,
  correct_answer,
  setCurrentQuestion,
  setScore,
}) => {
  const [timeLeft, setTimeLeft] = useState(20);

  const nextQuestion = () => {
    setCurrentQuestion((currentQuestion) => currentQuestion + 1);
    setTimeLeft(20);
  };

  const handleClick = (answer) => {
    if (answer === correct_answer) setScore((currentScore) => currentScore + 1);
    nextQuestion();
  };

  useEffect(() => {
    if (timeLeft === 0) {
      nextQuestion();
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <div>
      <ToastContainer position="top-center" hideProgressBar={true} />
      <S.Header>
        <Text size="30px" bold>
          {decode(question)}
        </Text>
      </S.Header>
      {answers.map((answer) => {
        return (
          <S.Button>
            <Button
              label={decode(answer)}
              variant="contained"
              onClick={() => handleClick(answer)}
            />
          </S.Button>
        );
      })}
      {timeLeft}
    </div>
  );
};

export default Question;
