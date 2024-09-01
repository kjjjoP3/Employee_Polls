import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TabView, TabPanel } from 'primereact/tabview';
import { DataView } from 'primereact/dataview'; 
import { Button } from 'primereact/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { getQuestions } from "../reducers/questionSlice";  
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import '../Home.css';

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInUser = useSelector(state => state.currentUser.value);
  const questionsData = useSelector(state => state.questions.value);
  
  const dispatch = useDispatch();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (!loggedInUser.length) {
      navigate('/');
    }
  }, [loggedInUser, navigate]);

  const incomingNotification = location.state?.success;

  useEffect(() => {
    if (incomingNotification) {
      setNotificationContent(incomingNotification);
      setIsNotificationVisible(true);
      const timer = setTimeout(() => {
        setIsNotificationVisible(false);
        setNotificationContent("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [incomingNotification]);

  const questionsArray = Object.values(questionsData);
  const sortedQuestions = JSON.parse(JSON.stringify(questionsArray));
  sortedQuestions.sort((firstItem, secondItem) => secondItem.timestamp - firstItem.timestamp);
  sortedQuestions.forEach(item => item.timestamp = new Date(item.timestamp).toLocaleString());

  const newQuestionsList = sortedQuestions.filter(item => 
    !item.optionOne.votes.includes(loggedInUser[0]) &&
    !item.optionTwo.votes.includes(loggedInUser[0])
  );

  const completedQuestionsList = sortedQuestions.filter(item => 
    item.optionOne.votes.includes(loggedInUser[0]) ||
    item.optionTwo.votes.includes(loggedInUser[0])
  );

  const renderQuestionItem = (item) => {
    return (
      <div className="col-12 md:col-4">
        <Card className="m-2">
          <div className="flex flex-column p-3">
            <div className="flex flex-column justify-content-between align-items-start flex-1">
              <div className="flex flex-column align-items-start gap-2">
                <div className="text-xl font-bold">{item.author}</div>      
                <div className="text-gray-600">{item.timestamp}</div>      
              </div>
              <div className="flex align-items-center">
                <Button label="Show" onClick={() => navigate(`/questions/${item.id}`)} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="p-4">
      {isNotificationVisible && (
        <Message severity="info" text={notificationContent} />
      )}
      <TabView>
        <TabPanel header="New Questions">
          <DataView value={newQuestionsList} itemTemplate={renderQuestionItem} layout="grid" />
        </TabPanel>
        <TabPanel header="Done">
          <DataView value={completedQuestionsList} itemTemplate={renderQuestionItem} layout="grid" />
        </TabPanel>
      </TabView>
    </div>
  );
};
