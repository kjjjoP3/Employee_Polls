import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestions, saveQuestionAnswer } from "../reducers/questionSlice";
import { useEffect, useState } from "react";

export const AnswerQuestion = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const [isDisable, setIsDisable] = useState(false);
const [isOption1, setIsOption1] = useState(false);
const [isOption2, setIsOption2] = useState(false);
const [voteOption1, setVoteOption1] = useState(0);
const [voteOption2, setVoteOption2] = useState(0);
const [answer, setAnswer] = useState("");
const [currentUser, setCurrentUser] = useState([]);
const [questions, setQuestions] = useState([]);
const [users, setUsers] = useState([]);
const [questionCurrent, setQuestionCurrent] = useState([]);
const [authorCurrent, setAuthorCurrent] = useState({});
const a = useSelector((state) => state.currentUser.value);
const b = useSelector((state) => state.questions.value);
const c = useSelector((state) => state.allUser.value);
const params = useParams();
const questionId = params.question_id;

const d = Object.values(b).filter((val) => {
    return val.id === questionId;
});
const s = useSelector(state => state.questions.value)
console.log(s)
useEffect(()=> {
dispatch(getQuestions())

}, [])
useEffect(() => {
    
    setCurrentUser(a);
    setQuestions(Object.values(b));
    setUsers(Object.values(c));
    
    if (!d.length) {
    navigate("/404");
    }
    setQuestionCurrent(d);
    const e = Object.values(c).filter((val) => val.id === d[0]?.author);
    setAuthorCurrent(e);
    setIsOption1(d[0]?.optionOne.votes.includes(
    a[0]
    ));
    
    setIsOption2(d[0]?.optionTwo.votes.includes(
    a[0]
    ));
    setVoteOption1(d[0]?.optionOne.votes.length)
    setVoteOption2(d[0]?.optionTwo.votes.length)
    if (d[0]?.optionOne.votes.includes(
    a[0]
    ) || d[0]?.optionTwo.votes.includes(
    a[0]
    )) {
    setIsDisable(true);
    }
}, [b]);
const handleAnswer = (val) => {
    if (isDisable == false) {
    setIsDisable(true);
    setAnswer(val);
    if(val == 'optionOne') {
        setVoteOption1( voteOption1+ 1);
        setIsOption1(true);
    }
    else {
        setVoteOption2(voteOption2 + 1);
        setIsOption2(true);
    }
    const a = { authedUser: currentUser[0], qid: questionId, answer: val };
    dispatch(saveQuestionAnswer(a));
    }
};

const title = "Poll by " + questionCurrent[0]?.author;
return (
    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
    <div>
        <h2>{title}</h2>

        <img
        src={authorCurrent[0]?.avatarURL}
        alt="Image"
        style={{ width: '200px', borderRadius: '50%'}}
        
        />
        <h1>Would You Rather</h1>

        <div
        className="answer"
        style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
        }}
        >
        <div
            style={
            isOption1
                ? {
                    background: "#76db9b",
                    display: "inline-block",
                    padding: "10px",
                    marginRight: "10px",
                    width: '400px'
                }
                : {
                    border: "1px solid #85b2f9",
                    display: "inline-block",
                    padding: "10px",
                    marginRight: "10px",
                    width: '400px'
                }
            }
        >
            <h3 onClick={()=> handleAnswer("optionOne")}>
            {questionCurrent[0]?.optionOne?.text}{" "}
            </h3>
            <br />
            <span
            style={
                isDisable
                ? { display: "inline-block" }
                : { display: "none" }
            }
            >
            voted people: {voteOption1}
            <br /> percentage:
            {((voteOption1 * 100) /
                (voteOption1+ voteOption2)).toFixed(2)}
            %
            </span>
            
        </div>
        <div
            style={
            isOption2
                ? {
                    background: "#76db9b",
                    display: "inline-block",
                    padding: "10px",
                    width: '400px'
                }
                : {
                    border: "1px solid #85b2f9",
                    display: "inline-block",
                    padding: "10px", width: '400px'
                }
            }
        >
            <h3 onClick={() => handleAnswer("optionTwo")}>
            {questionCurrent[0]?.optionTwo?.text}{" "}
            </h3>
            <br />
            <span
            style={
                isDisable
                ? { display: "inline-block" }
                : { display: "none" }
            }
            >
            voted people: {voteOption2}
            <br /> percentage:
            {((voteOption2 * 100) /
                (voteOption1+ voteOption2)).toFixed(2)}
            %
            </span>
        </div>
        </div>
    </div>
    </div>
);
};