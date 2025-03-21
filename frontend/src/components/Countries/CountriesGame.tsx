import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { fetchAlLCountries } from "../../store/slices/countriesSlices";
import {
  Button,
  Card,
  CardMedia,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { colors } from "../../theme/theme";

export const CountriesGame = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { countries, loading, error } = useAppSelector(
    (state) => state.countries
  );
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<
    { question: string; chosen: string; correct: string }[]
  >([]);
  const [showFeedback, setShowFeedback] = useState(false);

  // fetch countries if they are not in the store
  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchAlLCountries());
    }
  }, [dispatch, countries.length]);

  // resetting the game when user navigates away from the game page
  useEffect(() => {
    setGameStarted(false);
    setShowResult(false);
    setAnswers([]);
  }, [location.pathname]);

  // generate the questions including the correct answer and 3 incorrect answers
  const generateQuestions = () => {
    let questionsList = [];
    let shuffledCountries = [...countries]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    for (let country of shuffledCountries) {
      let correctAnswer = country.name.common;
      let flag = country.flags.png;

      let incorrectAnswers = countries
        .filter((c) => c.name.common !== correctAnswer)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((c) => c.name.common);

      let options = [correctAnswer, ...incorrectAnswers].sort(
        () => 0.5 - Math.random()
      );

      questionsList.push({ flag, correctAnswer, options });
    }
    setQuestions(questionsList);
  };

  // handles starting the game
  const startGame = () => {
    setGameStarted(true);
    generateQuestions();
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  // handles answer
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    let isCorrect = answer === questions[currentQuestion].correctAnswer;
    // here you get points for the coreect answer
    if (isCorrect) {
      setScore((prevScore) => prevScore + 5);
    }
    setAnswers((prev) => [
      // list of ansers is updated to show in the end
      ...prev,
      {
        question: questions[currentQuestion].correctAnswer,
        chosen: answer,
        correct: questions[currentQuestion].correctAnswer,
      },
    ]);

    setTimeout(() => {
      if (currentQuestion < 9) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setGameStarted(false);
    setShowResult(false);
    setAnswers([]);
  };

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <Container
      sx={{
        py: 5,
        mt: 0,
        textAlign: "center",
        background: `linear-gradient(45deg, 
                    ${colors.primary} 0%, 
                    ${colors.secondary} 20%, 
                    ${colors.success} 40%, 
                    ${colors.accent} 60%, 
                    ${colors.lightAccent} 80%, 
                    ${colors.textLight} 100%)`,
        color: colors.textLight,
        "&:hover": {
          background: `linear-gradient(45deg, 
                      ${colors.textLight} 0%, 
                      ${colors.lightAccent} 20%, 
                      ${colors.accent} 40%, 
                      ${colors.success} 60%, 
                      ${colors.secondary} 80%, 
                      ${colors.primary} 100%)`,
          color: colors.textLight,
        },
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      {!gameStarted ? (
        <Card
          sx={{
            maxWidth: 600,
            mx: "auto",
            p: 7,
            borderRadius: "16px",
            boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.1)`,
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Wanna test your knowledge about the flags you have seen on the
            countries page?
            <br />
            Then welcome to <strong>Guess the Country</strong>!
          </Typography>
          <Typography variant="body1" sx={{ mt: 4, mb: 2 }}>
            You will be shown a flag of a country and you have to guess the
            country name. You have 10 questions to go.
          </Typography>
          <Button
            variant="contained"
            onClick={startGame}
            sx={{
              background: `linear-gradient(45deg, 
                ${colors.primary} 0%, 
                ${colors.secondary} 20%, 
                ${colors.success} 40%, 
                ${colors.accent} 60%, 
                ${colors.lightAccent} 80%, 
                ${colors.textLight} 100%)`,
              color: colors.textLight,
              "&:hover": {
                background: `linear-gradient(45deg, 
                  ${colors.textLight} 0%, 
                  ${colors.lightAccent} 20%, 
                  ${colors.accent} 40%, 
                  ${colors.success} 60%, 
                  ${colors.secondary} 80%, 
                  ${colors.primary} 100%)`,
                color: colors.textLight,
              },
              borderRadius: "8px",
              padding: "0.8em 1.2em",
              margin: "1em",
              transition: "background 0.3s ease-in-out",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            Start Game
          </Button>
        </Card>
      ) : !showResult ? (
        <Card
          sx={{
            maxWidth: 600,
            mx: "auto",
            p: 7,
            borderRadius: "16px",
            boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.1)`,
          }}
        >
          <Typography variant="h6" sx={{ mb: 3 }}>
            Question {currentQuestion + 1} / 10
          </Typography>
          <Card sx={{ maxWidth: 300, mx: "auto", my: 2 }}>
            <CardMedia
              component="img"
              height="150"
              image={questions[currentQuestion].flag}
              alt="Country Flag"
            />
          </Card>

          {questions[currentQuestion].options.map(
            (option: string, index: number) => (
              <Button
                key={index}
                variant="contained"
                sx={{
                  m: 1,
                  mt: 3,
                  backgroundColor:
                    selectedAnswer === option
                      ? option === questions[currentQuestion].correctAnswer
                        ? "success.main"
                        : "error.main"
                      : "primary.main",
                  "&:hover": {
                    backgroundColor:
                      selectedAnswer === option
                        ? option === questions[currentQuestion].correctAnswer
                          ? "success.dark"
                          : "error.dark"
                        : "primary.dark",
                    filter: "brightness(1.2)", // Slightly brighten on hover in dark mode
                  },
                }}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedAnswer}
              >
                {option}
              </Button>
            )
          )}
          {showFeedback && selectedAnswer && (
            <Typography variant="body1" sx={{ mt: 2, fontWeight: "bold" }}>
              {selectedAnswer === questions[currentQuestion].correctAnswer
                ? "Correct Answer!"
                : "Very close, but wrong!"}
            </Typography>
          )}
        </Card>
      ) : (
        <Card
          sx={{
            maxWidth: 600,
            mx: "auto",
            p: 3,
            borderRadius: "16px",
            boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.1)`,
          }}
        >
          <Typography variant="h5">Game finished! ✨</Typography>
          <Typography variant="h6">
            Your score: <strong>{score}</strong> / 50
          </Typography>

          {/* Table for Answer Overview */}
          <TableContainer
            component={Paper}
            sx={{
              mt: 3,
              borderRadius: "16px",
              boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.1)`,
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Flag</TableCell>
                  <TableCell>Correct Answer</TableCell>
                  <TableCell>Your Answer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {answers.map((answer, index) => {
                  const correctCountry = countries.find(
                    (country) => country.name.common === answer.correct
                  );

                  return (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor:
                          answer.chosen === answer.correct
                            ? "#93ffa0"
                            : "#ff87af",
                      }}
                    >
                      <TableCell
                        sx={{
                          color: (theme) =>
                            theme.palette.mode === "dark" ? "#333" : "inherit",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        {correctCountry && (
                          <img
                            src={correctCountry.flags.png}
                            alt={answer.correct}
                            style={{
                              width: "30px",
                              height: "20px",
                              marginRight: "8px",
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: (theme) =>
                            theme.palette.mode === "dark" ? "#333" : "inherit",
                        }}
                      >
                        {answer.correct}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: (theme) =>
                            theme.palette.mode === "dark" ? "#333" : "inherit",
                        }}
                      >
                        {answer.chosen}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              resetGame();
              startGame();
            }}
            sx={{
              background: `linear-gradient(45deg, 
                ${colors.primary} 0%, 
                ${colors.secondary} 20%, 
                ${colors.success} 40%, 
                ${colors.accent} 60%, 
                ${colors.lightAccent} 80%, 
                ${colors.textLight} 100%)`,
              color: colors.textLight,
              "&:hover": {
                background: `linear-gradient(45deg, 
                  ${colors.textLight} 0%, 
                  ${colors.lightAccent} 20%, 
                  ${colors.accent} 40%, 
                  ${colors.success} 60%, 
                  ${colors.secondary} 80%, 
                  ${colors.primary} 100%)`,
                color: colors.textLight,
              },
              borderRadius: "8px",
              padding: "0.8em 1.2em",
              margin: "1em",
              transition: "background 0.3s ease-in-out",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            Play Again
          </Button>
        </Card>
      )}
    </Container>
  );
};
