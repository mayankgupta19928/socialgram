import React,{useState,useEffect,useContext} from 'react'; 
import {UserContext} from '../App'
const Home = () => {
    const {state,dispatch} = useContext(UserContext);
    console.log(state)
    const [data,setData]=useState([]);
    const token = localStorage.getItem('jwt');
    useEffect(()=>{
        fetch('/allpost',{
            method:'get',
            headers:{
                "Authorization":'Bearer '+token,
            },                        
        })
        .then(res=>res.json())
        .then((result)=>{
            setData(result.posts)
        }) 
    },[])
    return (
        <div className="home">
           { data.map(item=>{
               return(
<div className="card home-card" key={item._id}>
                <h5> {item.postedBy.name} </h5>
                <div className="card-image">
                    <img src={item.photo}/>
                </div>
                <div className="card-content">
                <i className="material-icons " style={{color:'red'}}>favorite</i>
                <h6>{item.title}</h6>
                <p>{item.body} </p>
                <input type="text" placeholder="Add a comment"/>

                </div>

            </div>
               )
           })
           
           }
        </div>
    );
};
 

export default Home;