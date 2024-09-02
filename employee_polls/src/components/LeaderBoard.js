import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../reducers/questionSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";

export const LeaderBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.allUser.value);
  const questions = useSelector((state) => state.questions.value);

  const leaderboardData = [];

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!currentUser || currentUser.length === 0) {
      navigate("/");
    }
  }, [navigate]);

  Object.values(users).forEach((user) => {
    const answeredCount = Object.values(questions).filter(
      (question) =>
        question.optionOne.votes.includes(user.id) ||
        question.optionTwo.votes.includes(user.id)
    ).length;

    const createdCount = Object.values(questions).filter(
      (question) => question.author === user.id
    ).length;

    leaderboardData.push({
      name: user.name,
      avatarURL: user.avatarURL,
      answered: answeredCount,
      created: createdCount,
      score: answeredCount + createdCount,
    });
  });

  if (
    (users && Object.keys(users).length > 0) ||
    (questions && Object.keys(questions).length > 0)
  ) {
    sessionStorage.setItem("leaderboardData", JSON.stringify(leaderboardData));
  }

  let leaderboardSession =
    JSON.parse(sessionStorage.getItem("leaderboardData")) || [];

  if (leaderboardSession.length > 0) {
    leaderboardSession.sort((a, b) => b.score - a.score);
  }

  return (
    <div className="p-4">
      <Card title="Leader Board" className="shadow-2">
        <DataTable value={leaderboardData} paginator rows={10} className="mt-3">
          <Column
            header="Users"
            body={(rowData) => (
              <div className="flex align-items-center">
                {rowData.avatarURL ? (
                  <img
                    src={rowData.avatarURL}
                    alt={rowData.name}
                    height="40"
                    className="mr-2"
                  />
                ) : (
                  <div
                    className="mr-2"
                    style={{
                      height: "40px",
                      width: "40px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "50%",
                    }}
                  ></div>
                )}
                <span>{rowData.name}</span>
              </div>
            )}
          />
          <Column field="answered" header="Answered" />
          <Column field="created" header="Created" />
        </DataTable>
      </Card>
    </div>
  );
};
