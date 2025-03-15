import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { fetchAlLCountries } from "../../store/slices/countriesSlices";
import {
  Box,
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
    <Container sx={{ py: 4, textAlign: "center" }}>
      {!gameStarted ? (
        <Box>
          <Typography variant="h5" gutterBottom>
            Wanna test your knowledge about the flags you have seen on the
            countries page?
            <br />
            Then welcome to <strong>Guess the Country</strong>!
          </Typography>
          <Button variant="contained" color="primary" onClick={startGame}>
            Start Game
          </Button>
        </Box>
      ) : !showResult ? (
        <Box>
          <Typography variant="h6">
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
                  backgroundColor:
                    selectedAnswer === option
                      ? option === questions[currentQuestion].correctAnswer
                        ? "success.main"
                        : "error.main"
                      : "primary.main",
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
        </Box>
      ) : (
        <Box>
          <Typography variant="h5">Game finished! ✨</Typography>
          <Typography variant="h6">
            Your score: <strong>{score}</strong> / 50
          </Typography>

          {/* Table for Answer Overview */}
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Correct Answer</TableCell>
                  <TableCell>Your Answer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {answers.map((answer, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        answer.chosen === answer.correct
                          ? "#C8E6C9"
                          : "#FFCDD2",
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{answer.correct}</TableCell>
                    <TableCell>{answer.chosen}</TableCell>
                  </TableRow>
                ))}
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
            sx={{ mt: 3 }}
          >
            Play Again
          </Button>
        </Box>
      )}
    </Container>
  );
};
