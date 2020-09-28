import React from 'react'; 
import contain from '../contain-name'
import {NavLink,withRouter} from 'react-router-dom'
import M from 'materialize-css'

class Signup extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'',
            email:'',
            password:'',

    }
    }
    onChangeVal = (key,event)=>{ 
        this.setState({
            [key]:event.target.value
        }) 

    }
    formSubmit=()=>{ 
        const {name,email,password}= this.state;
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email",classes:'#b71c1c red darken-3'})
            return;
        }
        fetch('/signup',{
            method:'post',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                name,
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
                M.toast({html: data.message,classes:'#2e7d32 green darken-3'})
                this.props.history.push('/signin')
            }
        })
        .catch(err=>{
            console.log(err)
        })

    }
    render(){
    return (
        <div className='mycard'>
            <div className='card auth-card input-field'>
                <h2>{contain.appname}</h2>
                <input 
                type='text'
                placeholder={contain.signup_name}
                value={this.state.name}
                onChange={(event)=>this.onChangeVal('name',event)}
                />
                <input 
                type='text'
                placeholder={contain.login_email}
                value={this.state.email}
                onChange={(event)=>this.onChangeVal('email',event)}
                />
                <input 
                type='password'
                placeholder={contain.login_password}
                value={this.state.password}
                onChange={(event)=>this.onChangeVal('password',event)}
                />
                <button className="btn waves-effect waves-light btn-small margin-side5 " type="submit" name="action" onClick={this.formSubmit}> {contain.signup_signup}
                </button>
                <h5>
                <NavLink className="     " to={contain.signin} > If you have account
                </NavLink>
                </h5>


            </div>

        </div>
    );
    }
};
 
export default withRouter(Signup);