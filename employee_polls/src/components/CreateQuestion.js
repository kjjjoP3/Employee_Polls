import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { useState } from 'react';

import 'primeflex/primeflex.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveQuestion} from '../reducers/questionSlice';

export const CreateQuestion = () => {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.currentUser.value);
  const questions = useSelector(state => state.questions.value);
 

  const addQuestion= () => {
    if(optionOne && optionTwo) {
      dispatch(saveQuestion({optionOneText: optionOne, optionTwoText: optionTwo, author: currentUser[0]}));
      navigate('/home');
    }
    else setError(true);
  }
  return (
    <div>
      {error && <h1 className='error'>Missing input</h1>}
      <div className="flex justify-content-center align-items-center w-full h-full">
      <Card>
          <h1>Would You Rather</h1>
          <h2>Create Your Own Poll</h2>
          <div className='options'>
            <div>
              <h3>First Option</h3>
              <InputText value={optionOne} data-testid='optionOne' onChange={(e) => setOptionOne(e.target.value)} />
            </div>
            <div>
              <h3>Second Option</h3>
              <InputText value={optionTwo} data-testid='optionTwo' onChange={(e) => setOptionTwo(e.target.value)} />
            </div>

          </div>
          <div>
          <Button label="Submit" data-testid='add' className='mt-2' onClick={addQuestion}/>
          </div>
          </Card>
      </div>
    </div>
  );
}