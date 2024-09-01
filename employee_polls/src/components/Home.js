import { useDispatch, useSelector} from "react-redux"
import { TabView, TabPanel } from 'primereact/tabview';
import { useEffect } from "react";
import { getQuestions } from "../reducers/questionSlice";  
import { DataView } from 'primereact/dataview'; 
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(state => (state.currentUser.value));
  const data = useSelector(state => state.questions.value);
  const a = Object.values(data);
  const b = JSON.parse(JSON.stringify(a));
  b.sort((firstItem, secondItem) => secondItem.timestamp - firstItem.timestamp);
  b.forEach(val => val.timestamp = new Date(val.timestamp).toLocaleString())
  const newQuestions = b.filter(val=>{
    return val.optionOne.votes.includes(currentUser[0]) === false &&
    val.optionTwo.votes.includes(currentUser[0]) === false
  } )

    const doneQuestions = b.filter(val=> val.optionOne.votes.includes(currentUser[0]) === true ||
    val.optionTwo.votes.includes(currentUser[0]) === true)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  const showQuestion = ()=> {
  }

  const itemTemplate = (b) => {
    return (
        <div className="col-4">
             <div className="m-2 border-1 surface-border surface-card border-round">
            <div className="flex flex-column p-4 gap-4">
                <div className="flex flex-column justify-content-between align-items-center flex-1 gap-4">
                    <div className="flex flex-column align-items-center gap-3">
                        <div className="text-2xl font-bold text-900">{b.author}</div>      
                        <div className="">{b.timestamp}</div>      
                    </div>
                    <div className="flex align-items-center ">
                        <Button label="Show" onClick={()=> navigate(`/questions/${b.id}`)}></Button>
                      </div>
                </div>
            </div>
            </div>
        </div>
    );
};
  return (<div>
    <div className="card">
            <TabView>
                <TabPanel header="New Questions">
                <DataView value={newQuestions} itemTemplate={itemTemplate} />
                </TabPanel>
                <TabPanel header="Done">
                    <DataView value={doneQuestions} itemTemplate={itemTemplate} />
                </TabPanel>
                
            </TabView>
        </div>

        
  </div>);
}