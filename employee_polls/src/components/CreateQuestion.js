import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveQuestion } from '../reducers/questionSlice';
import 'primeflex/primeflex.css';

export const CreateQuestion = () => {
  const [firstOption, setFirstOption] = useState('');
  const [secondOption, setSecondOption] = useState('');
  const [hasError, setHasError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve currentUser from session storage
  const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
  const currentUser = storedUser ? storedUser : [];

  const handleSubmit = () => {
    if (firstOption && secondOption) {
      const questionData = {
        optionOneText: firstOption,
        optionTwoText: secondOption,
        author: currentUser[0], // Assuming currentUser[0] contains the username
      };
      dispatch(saveQuestion(questionData));
      navigate('/home');
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="flex justify-content-center align-items-center w-full h-full">
      {hasError && <h1 className="error">Please fill in both options</h1>}
      <Card>
        <h1>Would You Rather</h1>
        <h2>Create Your Own Poll</h2>
        <div className="options">
          <div>
            <h3>First Option</h3>
            <InputText 
              value={firstOption} 
              data-testid="optionOne" 
              onChange={(e) => setFirstOption(e.target.value)} 
            />
          </div>
          <div>
            <h3>Second Option</h3>
            <InputText 
              value={secondOption} 
              data-testid="optionTwo" 
              onChange={(e) => setSecondOption(e.target.value)} 
            />
          </div>
        </div>
        <div>
          <Button 
            label="Submit" 
            data-testid="add" 
            className="mt-2" 
            onClick={handleSubmit} 
          />
        </div>
      </Card>
    </div>
  );
};
