import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import axios from "axios"
import {BASE_URL} from './../utils/constants'
import { useDispatch, useSelector } from "react-redux"
import {addUser} from './../utils/userSlice'
import { useEffect } from "react"
function Body() {
    const dispatch = useDispatch();   
    const navigate = useNavigate(); 

    const user = useSelector((store) => store.user)

    const fetchUser  = async() => {
        try {
            if (user) return
            const userData = await axios.get(BASE_URL + '/profile/view', {
                withCredentials: true
            })
            console.log(userData);
           
            dispatch(addUser(userData.data))
        } catch (error) {
            console.log(error);
            if (error.status === 401) 
                navigate('/login')
        }
    }

    useEffect(()=> {
            fetchUser()
    }, [])
return (
    <>
       <NavBar />
       <Outlet />
       <Footer />
    </>
)
}

export default Body