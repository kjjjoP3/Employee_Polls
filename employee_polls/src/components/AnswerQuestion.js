import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestions, saveQuestionAnswer } from "../reducers/questionSlice";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

export const AnswerQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOptionDisabled, setOptionDisabled] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(false);
  const [voteCountOption1, setVoteCountOption1] = useState(0);
  const [voteCountOption2, setVoteCountOption2] = useState(0);
  const [currentUser, setCurrentUser] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [authorDetails, setAuthorDetails] = useState({});
  
  const currentUserState = useSelector((state) => state.currentUser.value);
  const questionsState = useSelector((state) => state.questions.value);
  const usersState = useSelector((state) => state.allUser.value);
  const { question_id } = useParams();

  const question = Object.values(questionsState).find(q => q.id === question_id);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  useEffect(() => {
    setCurrentUser(currentUserState);

    if (!question) {
      navigate("/404");
    } else {
      setCurrentQuestion(question);
      const authorInfo = Object.values(usersState).find(user => user.id === question.author);
      setAuthorDetails(authorInfo || {});
      setVoteCountOption1(question.optionOne.votes.length);
      setVoteCountOption2(question.optionTwo.votes.length);
      setSelectedOption1(question.optionOne.votes.includes(currentUserState[0]));
      setSelectedOption2(question.optionTwo.votes.includes(currentUserState[0]));
      setOptionDisabled(selectedOption1 || selectedOption2);
    }
  }, [currentUserState, question, navigate, usersState]);

  const handleVote = (option) => {
    if (!isOptionDisabled) {
      setOptionDisabled(true);
      const voteData = {
        authedUser: currentUser[0],
        qid: question_id,
        answer: option,
      };

      if (option === 'optionOne') {
        setVoteCountOption1(prevCount => prevCount + 1);
        setSelectedOption1(true);
      } else {
        setVoteCountOption2(prevCount => prevCount + 1);
        setSelectedOption2(true);
      }
      
      dispatch(saveQuestionAnswer(voteData));
    }
  };

  const title = `Poll by ${authorDetails.name}`;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
      <Card title={title} style={{ width: '400px' }}>
        <Image
          src={authorDetails.avatarURL}
          alt={`${authorDetails.name}'s Avatar`}
          style={{ width: '200px', borderRadius: '50%' }}
        />
        <h1>Would You Rather</h1>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button 
            label={currentQuestion.optionOne?.text}
            className={selectedOption1 ? "p-button-success" : "p-button-outlined"}
            onClick={() => handleVote("optionOne")}
            style={{ width: '100%', marginBottom: '10px' }}
            disabled={isOptionDisabled}
          />
          {isOptionDisabled && (
            <span>
              Voted: {voteCountOption1} <br />
              Percentage: {((voteCountOption1 * 100) / (voteCountOption1 + voteCountOption2)).toFixed(2)}%
            </span>
          )}

          <Button 
            label={currentQuestion.optionTwo?.text}
            className={selectedOption2 ? "p-button-success" : "p-button-outlined"}
            onClick={() => handleVote("optionTwo")}
            style={{ width: '100%', marginTop: '10px' }}
            disabled={isOptionDisabled}
          />
          {isOptionDisabled && (
            <span>
              Voted: {voteCountOption2} <br />
              Percentage: {((voteCountOption2 * 100) / (voteCountOption1 + voteCountOption2)).toFixed(2)}%
            </span>
          )}
        </div>
      </Card>
    </div>
  );
};
