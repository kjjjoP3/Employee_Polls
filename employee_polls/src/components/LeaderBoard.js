
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../reducers/questionSlice";

export const LeaderBoard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUser.value);
  const question = useSelector((state) => state.questions.value);

 let a = [];
 useEffect(()=> {
  dispatch(getQuestions());
 }, [])
  Object.values(users).map(val => {
    a.push({name: val.name, avatarURL: val.avatarURL,answer:  (Object.values(question).filter(item => item.optionOne.votes.includes(val.id) === true || item.optionTwo.votes.includes(val.id)=== true)).length, 
    create: Object.values(question).filter(item => item.author === val.id).length})
  })
  

a.sort((firstItem, secondItem) => (secondItem.answer + secondItem.create) - (firstItem.answer + firstItem.create));
console.log(a)
  return (
    <div>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Users</th>
              <th>Answered</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {a.map((val) => {
              return (
                <tr key={val.name}>
                  <td>
                    <img
                      src={val.avatarURL}
                      height="40"
                    />
                    <span>{val.name}</span>
                  </td>
                  <td>{val.answer}</td>
                  <td>{val.create}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
