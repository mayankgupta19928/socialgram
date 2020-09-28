import React,{useContext, useCallback} from 'react';
import {Link,useHistory} from 'react-router-dom';
import contain from '../contain-name'
import {UserContext} from '../App'


const Navbar = () =>{
  const {state,dispatch} =useContext(UserContext)
  const history = useHistory();
  const logout = () =>{
    localStorage.clear();
    dispatch({type:'CLEAR'})
    history.push('/signin')    
  }

  const renderList = ()=>{
    if(state){
      return [<li><Link to={contain.profile}>{contain.profile}</Link></li>,
              <li><Link to={contain.CreatePost}>{contain.CreatePost}</Link></li>,
              <button className="btn waves-effect #c62828 red darken-3" type="submit" name="action" onClick={()=>{logout()}}>  Logout
                </button>
          ]    }
    else{
     return [ <li><Link to={contain.signin}>{contain.signin}</Link></li>,
              <li><Link to={contain.signup}>{contain.signup}</Link></li>
       ] }
  }
    return(
        <nav>
        <div className="nav-wrapper white">
          <Link to={state?'/':'/signin'} className="brand-logo left">{contain.appname}</Link>
          <ul id="nav-mobile" className="right ">         
          {renderList()}  
          </ul>
        </div>
      </nav>
    )
}

export default Navbar;
