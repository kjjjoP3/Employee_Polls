import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestions, saveQuestionAnswer } from "../reducers/questionSlice";
import { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Avatar } from 'primereact/avatar';

export const AnswerQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisable, setIsDisable] = useState(false);
  const [isOption1, setIsOption1] = useState(false);
  const [isOption2, setIsOption2] = useState(false);
  const [voteOption1, setVoteOption1] = useState(0);
  const [voteOption2, setVoteOption2] = useState(0);
  const [currentUser, setCurrentUser] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [questionCurrent, setQuestionCurrent] = useState([]);
  const [authorCurrent, setAuthorCurrent] = useState([]); // Initialize authorCurrent as an array
  const a = useSelector((state) => state.currentUser.value);
  const b = useSelector((state) => state.questions.value);
  const c = useSelector((state) => state.allUser.value);
  const params = useParams();
  const questionId = params.question_id;

  const d = Object.values(b).filter((val) => val.id === questionId);

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  useEffect(() => {
    setCurrentUser(a);
    setQuestions(Object.values(b));
    setUsers(Object.values(c));

    if (!d.length) {
      navigate("/404");
    }

    setQuestionCurrent(d);
    const e = Object.values(c).filter((val) => val.id === d[0]?.author);
    setAuthorCurrent(e); // Set authorCurrent with the filtered users
    setIsOption1(d[0]?.optionOne.votes.includes(a[0]));
    setIsOption2(d[0]?.optionTwo.votes.includes(a[0]));
    setVoteOption1(d[0]?.optionOne.votes.length);
    setVoteOption2(d[0]?.optionTwo.votes.length);
    if (d[0]?.optionOne.votes.includes(a[0]) || d[0]?.optionTwo.votes.includes(a[0])) {
      setIsDisable(true);
    }
  }, [b]);

  const handleAnswer = (val) => {
    if (!isDisable) {
      setIsDisable(true);
      if (val === "optionOne") {
        setVoteOption1(voteOption1 + 1);
        setIsOption1(true);
      } else {
        setVoteOption2(voteOption2 + 1);
        setIsOption2(true);
      }
      const payload = { authedUser: currentUser[0], qid: questionId, answer: val };
      dispatch(saveQuestionAnswer(payload));
    }
  };

  const title = "Poll by " + questionCurrent[0]?.author;

  return (
    <div className="flex justify-content-center text-center">
      <div>
        <h2>{title}</h2>

        {authorCurrent[0]?.avatarURL && (
          <Avatar image={authorCurrent[0]?.avatarURL} size="large" shape="circle" />
        )}

        <h1>Would You Rather</h1>

        <div className="flex justify-content-center">
          <Card className="m-2" style={{ width: '400px' }}>
            <Button
              label={questionCurrent[0]?.optionOne?.text}
              className={isOption1 ? 'p-button-success' : 'p-button-outlined'}
              onClick={() => handleAnswer("optionOne")}
              disabled={isDisable}
            />
            {isDisable && (
              <div>
                <span>Voted people: {voteOption1}</span>
                <br />
                <span>Percentage: {((voteOption1 * 100) / (voteOption1 + voteOption2)).toFixed(2)}%</span>
              </div>
            )}
          </Card>
          <Divider layout="vertical" />
          <Card className="m-2" style={{ width: '400px' }}>
            <Button
              label={questionCurrent[0]?.optionTwo?.text}
              className={isOption2 ? 'p-button-success' : 'p-button-outlined'}
              onClick={() => handleAnswer("optionTwo")}
              disabled={isDisable}
            />
            {isDisable && (
              <div>
                <span>Voted people: {voteOption2}</span>
                <br />
                <span>Percentage: {((voteOption2 * 100) / (voteOption1 + voteOption2)).toFixed(2)}%</span>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
