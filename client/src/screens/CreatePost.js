import React,{useState,useEffect} from 'react'; 
import M from 'materialize-css';
import {useHistory} from 'react-router-dom';

const CreatePost = () => {
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [image,setImage] = useState('');
    const [url,setUrl] = useState('');
    const history = useHistory();
    useEffect(()=>{ 
if(!url) return;
fetch('/createpost',{
    method:'post',
    headers:{
        'Content-Type':"application/json",
        'Authorization':"Bearer "+localStorage.getItem('jwt')
    },
    body:JSON.stringify({
        title,
        body,
        pic:url,
    })
}).then((res)=>{
    return res.json()  
})
.then((data)=>{
    if(data.error){
        M.toast({html: data.error,classes:'#b71c1c red darken-4'})
    }
    else{
        M.toast({html: "Create post Successfully",classes:'#2e7d32 green darken-3'})
        history.push('/')
    }
})
.catch(err=>{
    console.log('err',err)
})
    },[url])

    const postData = ()=>{
        
        const formData = new FormData();
        formData.append('file',image);
        formData.append('upload_preset','social_clone');
        formData.append('cloud_name','manku');
        fetch('https://api.cloudinary.com/v1_1/manku/image/upload',{
            method:'post',
            body:formData,
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
       

    }

    return (
        <div className="post">
            <div className="card input-filed"
       style={{
           margin:"30px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center"
       }}>
           <input type="text" placeholder="title"
           value={title}
           onChange={e=>setTitle(e.target.value)}
           />
           <input type="text" placeholder="body"
           value={body}
           onChange={e=>setBody(e.target.value)}
           />

                <div className="file-field input-field">
                <div className="btn">
                <span>File</span>
                <input type="file" onChange={e=>{setImage(e.target.files[0])}}/>
                </div>
                <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
                </div>
                </div>
                <button className="btn waves-effect waves-light darken-1 " type="submit" name="action" onClick={()=>{postData()}}>  Submit post
                </button>
                 
                </div>

         </div>
 
    );
};
 

export default CreatePost;