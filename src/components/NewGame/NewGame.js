import React from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Text from "../Text";
import Button from "../Button";
import RadioButtonsGroup from "../RadioButtonsGroup";
import * as S from "./style";

const NewGame = ({
  setStartQuiz,
  setEndQuiz,
  setCurrentQuestion,
  score,
  setScore,
  endQuiz,
  numberOfQuestions,
  setNumberOfQuestions,
  difficulty,
  setDifficulty,
}) => {
  const { width, height } = useWindowSize();
  const questionsRadio = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
  ];
  const difficultyRadio = [
    { value: "mixed", label: "Mixed" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  const render = () => {
    if (endQuiz) {
      return (
        <div>
          <Text size="30px" bold>
            You answered {score} questions out of {numberOfQuestions} correctly!
          </Text>
          <Text size="30px" bold>
            {score / numberOfQuestions > 0.5
              ? "Great Job!"
              : "Better Luck Next Time..."}
          </Text>
          <Confetti width={width} height={height} />
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
      <Text size="16px">Number of Questions:</Text>
      <S.RadioButtonsGroup>
        <RadioButtonsGroup
          onChange={setNumberOfQuestions}
          value={numberOfQuestions}
          radioButtons={questionsRadio}
        />
      </S.RadioButtonsGroup>
      <Text size="16px">Difficulty:</Text>
      <S.RadioButtonsGroup>
        <RadioButtonsGroup
          onChange={setDifficulty}
          value={difficulty}
          radioButtons={difficultyRadio}
        />
      </S.RadioButtonsGroup>
      <S.Button>
        <Button
          label="Start Game"
          variant="contained"
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
