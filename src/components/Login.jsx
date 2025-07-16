import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"

function Login() {

    const [emailId, setEmailId] = useState('akshay@tinder.com')
    const [password, setPassword] = useState('Akshay@1234')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log('login buttoin clicked')
        const result = await axios.post(BASE_URL + '/login', {
            emailId,
            password
        }, {withCredentials: true})
        console.log(result);
        dispatch(addUser(result.data.user))
        navigate('/')
    }
return (
    <>
    <div className="flex justify-center my-10">

  <div className="card card-border bg-base-100 w-96">
  <div className="card-body">
    <h2 className="card-title">Login</h2>
    <fieldset className="fieldset">
    <legend className="fieldset-legend">Email</legend>
    <input type="text" className="input" placeholder="Type here" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
     <legend className="fieldset-legend">Password</legend>
    <input type="password" className="input" placeholder="Type here" value={password} onChange={(e) => setPassword(e.target.value)}/>
    </fieldset>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={() => handleLogin()}>Login</button>
    </div>
  </div>
</div>
    </div>
    </>
)
}

export default Login