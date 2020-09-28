import React,{useState,useContext} from 'react'; 
import contain from '../contain-name'
import {NavLink ,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../App' 

const Signin = () => {
    const {state,dispatch} = useContext(UserContext)
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const history = useHistory()


   const  formSubmit=()=>{  
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email",classes:'#b71c1c red darken-3'})
            return;
        }
        fetch('/signin',{
            method:'post',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                email,
                password,
            })
        }).then((res)=>{
            return res.json()  
        })
        .then((data)=>{
            if(data.error){
                M.toast({html: data.error,classes:'#b71c1c red darken-4'})
            }
            else{
                localStorage.setItem('jwt',data.token)
                localStorage.setItem('user',JSON.stringify(data.user))
                dispatch({type:'USER',payload:data.user})

                M.toast({html: "Signing Success",classes:'#2e7d32 green darken-3'})
                history.push('/')
            }
        })
        .catch(err=>{
            console.log('err',err)
        })

    }

    return (
        <div className='mycard'>
            <div className='card auth-card input-field'>
                <h2>{contain.appname}</h2>
                <input 
                type='text'
                placeholder={contain.login_email}
                value={email}
                onChange={e=>setEmail(e.target.value)}
                />
                <input 
                type='password'
                placeholder={contain.login_password}
                value={password}
                onChange={e=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light margin-side5 " type="submit" name="action" onClick={()=>formSubmit()}> {contain.login_login}
                </button>
                 <h5>
                <NavLink className=" pointer " to={contain.signup_signup} > Doesn't have account
                </NavLink>
                </h5>


            </div>

        </div>
    );
};
 
export default Signin;