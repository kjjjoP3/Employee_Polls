import { Menubar } from 'primereact/menubar';
import logo from './../logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { logout } from '../reducers/currentUserSlice';
import { useNavigate } from 'react-router-dom';

 const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(state => state.currentUser.value);

  
  const onLogout = event => {
    dispatch(logout());
    navigate("/");

  }
  const items = [
    {
      label: 'Home',
      command: () => {navigate("/home")}
    },
    {
      label: 'Leaderboard',
      command: () => { navigate('/leaderboard')}
    },
    {
      label: 'New',
      command: () => { navigate('/add')}
    }
  ]
  const start = <img alt="logo" src={logo} height="40" className="mr-2"></img>;
  const end = 
    <div className='flex align-items-center'>
      <img src={data[1]?.avatarURL} height="40" className="mr-2 border-circle"/> <span className='mr-4'>{data[0]}</span>
      <Button label="Logout" text onClick={()=> onLogout()} />
    </div>;
  
  return (
    <div className="card">
      <Menubar model={items} start={start} end={end}/>
    </div>
  );
}
export default Navigation;