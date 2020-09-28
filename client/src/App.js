import React,{useReducer,createContext, useEffect, useContext} from 'react';
import Navbar from './components/Navbar'
import './App.css';
import {BrowserRouter,Route, Switch, useHistory} from 'react-router-dom';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import Home from './screens/Home';
import CreatePost from './screens/CreatePost'
import {intialState,reducer} from './reducers/userReducer'

export const UserContext = createContext();

function Routing(){
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type:'USER',payload:user})
    }
    else{
      history.push('/signin')
    }
  },[])
  return(
   <Switch> 
     <Route exact path='/'>
       <Home/>
     </Route>
     <Route path='/Signin'>
       <Signin/>
     </Route>
     <Route path='/Signup'>
       <Signup/>
     </Route>
     <Route path='/Profile'>
       <Profile/>
     </Route>
     <Route path='/CreatePost'>
       <CreatePost/>
     </Route>
     </Switch>
  )
}
function App() {
  const [state,dispatch]=useReducer(reducer,intialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
     <Navbar/>
     <Routing/>     
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
