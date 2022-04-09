import React from "react";
import Text from "../Text";
import Button from "../Button";
import * as S from "./style";

const NewGame = ({
  setStartQuiz,
  setEndQuiz,
  setCurrentQuestion,
  score,
  setScore,
  endQuiz,
}) => {
  const render = () => {
    if (endQuiz) {
      return (
        <div>
          <Text size="30px" bold>
            Your score is {score}
          </Text>
        </div>
      );
    } else
      return (
        <Text size="30px" bold>
          Welcome!
        </Text>
      );
  };

  return (
    <S.NewGame>
      <S.Header>{render()}</S.Header>
      <S.Button>
        <Button
          label="Click to start a new game"
          variant="outlined"
          onClick={() => {
            setStartQuiz(true);
            setScore(0);
            setTimeout(() => {
              setCurrentQuestion(0);
              setEndQuiz(false);
            }, 500);
          }}
        />
      </S.Button>
    </S.NewGame>
  );
};

export default NewGame;
