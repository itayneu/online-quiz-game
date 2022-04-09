import React, { useState, useEffect } from "react";
import Text from "../Text";
import Button from "../Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as S from "./style";

const Question = ({
  question,
  answers,
  correct_answer,
  setCurrentQuestion,
  setScore,
}) => {
  const handleClick = (answer) => {
    if (answer === correct_answer) setScore((currentScore) => currentScore + 1);
    setCurrentQuestion((currentQuestion) => currentQuestion + 1);
  };

  function Test() {
    const [timeLeft, setTimeLeft] = useState(5);

    useEffect(() => {
      if (timeLeft === 0) {
        setCurrentQuestion((currentQuestion) => currentQuestion + 1);
        setTimeLeft(5);
      }

      if (!timeLeft) return;

      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }, [timeLeft]);

    return (
      <React.Fragment>
        {timeLeft}
        <Button onClick={() => setTimeLeft(5)}>TEST</Button>
      </React.Fragment>
    );
  }

  return (
    <S.UserList>
      <ToastContainer position="top-center" hideProgressBar={true} />
      <S.Header>
        <Text size="18px" bold>
          {question}
        </Text>
      </S.Header>
      {answers.map((answer) => {
        return (
          <S.Button>
            <Button
              label={answer}
              variant="contained"
              onClick={() => handleClick(answer)}
            />
          </S.Button>
        );
      })}
      Countdown: {Test()}
    </S.UserList>
  );
};

export default Question;
