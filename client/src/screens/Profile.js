import React,{useState,useEffect,useContext} from 'react'; 
import {UserContext} from '../App'
const Profile = () => {
    const [profile,setProfile]=useState([]);
    const {state,dispatch} = useContext(UserContext);
    useEffect(()=>{
        fetch('/mypost',{
            method:'get',
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then((data)=>{ 
            console.log(data.posts)
            setProfile(data.posts)
        })
    },[])
    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
        <div style={{
           margin:"18px 0px",
            borderBottom:"1px solid grey"
        }}>

      
        <div style={{
            display:"flex",
            justifyContent:"space-around",
           
        }}>
            <div>
                <img style={{width:"160px",height:"160px",borderRadius:"80px"}}  src="https://images.unsplash.com/photo-1597688770033-77623166fe97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"  />
              
            </div>
            <div>
            <h4>{state?state.name:'Loading'}</h4>
                   <h5>{state?state.email:'Loading'}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6> posts</h6>
                       <h6>2 followers</h6>
                       <h6> 2 following</h6>
                   </div>
            </div>
            
            </div>

            </div>  
           
            <div className="gallery">
                { 
                profile.map((pic,i)=>{
                    return(
                        <img key={i} className="item" src={pic.photo} alt={pic.titile}/>  
                    )
                }) 
                }
                    


           </div>
            </div>

       
    );
};
 

export default Profile;