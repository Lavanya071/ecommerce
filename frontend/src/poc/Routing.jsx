import {useEffect, useState} from 'react';
import {Routes,Route, Link, useParams,Navigate} from 'react-router-dom'
function Routing(){
    return(
        <div>
            <h1>Routing Example</h1>
            <nav>
                <ul>
                    <li>
                        <Link to='/home'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to="/listing">Listing</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/home" element={<Home></Home>}></Route>
                <Route path="/about/*" element={<About></About>}></Route>
                <Route path="/listing" element={<Listing></Listing>}></Route>
                <Route path="/" element={<Navigate to='/home'></Navigate>}></Route>
                <Route path="/users/:id" element={<Users></Users>} isAdmin={true}></Route>
            </Routes>
        </div>
    )
    function Users(props){
        
        let params=useParams();
        console.log("useeffect");
        let [user,setUser]=useState(null)
        useEffect(()=>{
            (async()=>{
                const response=await fetch(`https://fakestoreapi.com/users/${params.id}`);
                const userData=await response.json();
               
               setUser(userData)

            })()
        },[params.id]);
        console.log('renderes')
     return (
<>

{user == null ? 

<h1>Loading.....</h1> : 
<>
<h1>Username: {user.username}</h1>
<h1>name : {user.name.firstname+" "+user.name.lastname}</h1>
<h1>phone no: {user.phone}</h1>
</>

}

</>
     )
    }
    function Home(){
        return<h1>Home Page</h1>
    }
    function About(){
        return(<>
        <h1> Page</h1>
       <Routes>
        <Route>
             <Route path='company' element={<Company></Company>}></Route>
             <Route path='founder' element={<Founder></Founder>}></Route>
        </Route>
       </Routes></>
    )
    }
    function Company(){
        return <h1>chukkaye</h1>
    }
    function Founder(){
        return <h1>Koshiniya</h1>
    }
    function Listing(){
        return<h1>Home </h1>
    }

}
export default Routing