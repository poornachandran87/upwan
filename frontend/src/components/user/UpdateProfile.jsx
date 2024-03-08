import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { updateProfile as updateProfileAction,clearAuthError } from "../../actions/userActions"
import { clearUpdateProfile } from "../../slices/authSlice";


export default function UpdateProfile(){

    const {user,error,isUpdated} =  useSelector(state => state.authState)
    const dispatch = useDispatch()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    
    const submitHandler = (e) =>{
        e.preventDefault()
        const userData = new FormData()
        userData.append('name',name)
        userData.append('email',email)
        dispatch(updateProfileAction(userData))
    }
       
       
    useEffect(()=>{
        if(user){
            setName(user.name)
            setEmail(user.email)
            
        }
        if(isUpdated){
            toast("Profile is Updated",{
                type:'success',
                onOpen:() =>{
                    dispatch(clearUpdateProfile())
                }
            })
            return
        }
        if(error) {
            toast(error,{
               type:'error',
               onOpen:() =>{
                   dispatch(clearAuthError)
               }
            })
            return
     }
    },[user,isUpdated,error,dispatch])
    

    return (
        <>
        <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg" >
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                    </form>
                </div>
            </div>
        </>
    )
}