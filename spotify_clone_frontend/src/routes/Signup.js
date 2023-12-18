import { useState } from 'react';
import {useCookies} from 'react-cookie';
import {Link,useNavigate} from 'react-router-dom'
import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import PasswordInput from '../components/shared/PasswordInput';
import {makeUnauthenticatedPOSTRequest} from '../utils/serverHelper'

const SignupComponent = () =>{

    const [email,setEmail] = useState("");
    const [confirmEmail,setConfirmEmail] = useState("");
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");

    const [cookie , setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const signUp = async () =>{
        if(email !== confirmEmail){
            alert("Email and Confirm Email field must match. Please try again");
            return;
        }
        const Data = {email,password,userName,firstName,lastName};
        const response = await makeUnauthenticatedPOSTRequest(
            "/auth/register",
            Data
        );
        if(response && !response.err){
            console.log(response);
            const token=response.token;
            const date =new Date();
            date.setDate(date.getDate() + 30)
            setCookie("token" , token , {path : "/" , expires : date});
            alert("success");
            navigate("/home");
        }else{
            alert("failure")
        }
    };

    return (
        <div className="">
            <div className='flex flex-col items-center w-full h-full bg-gradient-to-b from-neutral-900 to-black font-poppins'>
                <div className='logo p-8 w-full flex bg-black '>
                    <Icon icon="logos:spotify" width="118" className='ml-3'/>
                </div>
                <div className='InputRegion w-fixed py-10 flex items-center justify-center flex-col bg-black mt-8 rounded-md'>
                    <div className="font-extrabold p-8 text-4xl text-white">Sign up for free to start listening</div>
                    {/* i will have our inputs --> email and password with submit button */}
                    <TextInput 
                        label="Email address"
                        placeholder="name@domain.com"
                        className="my-3 w-1/2"
                        value={email}
                        setValue={setEmail}
                        labelClassName={"text-white"}
                    />
                    <TextInput 
                        label="Confirm Email Address"
                        placeholder="Enter your email again"
                        className="mb-3 w-1/2"
                        value={confirmEmail}
                        setValue={setConfirmEmail}
                        labelClassName={"text-white"}
                    />
                    <TextInput 
                        label="Username"
                        placeholder="What should we call you?"
                        className="mb-3 w-1/2"
                        value={userName}
                        setValue={setUserName}
                        labelClassName={"text-white"}
                    />
                    <PasswordInput 
                        label="Create Password"
                        placeholder="Enter a strong password here"
                        className="mb-3 w-1/2"
                        value={password}
                        setValue={setPassword}
                    />
                    <div className='w-full flex space-x-4 items-center justify-center'>
                        <TextInput
                            label="First Name"
                            placeholder="Enter your First name"
                            className="mb-3 w-6/25"
                            value={firstName}
                            setValue={setFirstName}
                            labelClassName={"text-white"}
                        />
                        <TextInput
                            label="Last Name"
                            placeholder="Enter your Last name"
                            className="mb-3 w-6/25"
                            value={lastName}
                            setValue={setLastName}
                            labelClassName={"text-white"}
                        />
                    </div>

                    <button
                        className="bg-green-500 text-l font-semibold p-2 w-1/2 rounded-full my-8 hover:font-bold transform transition-transform hover:scale-105"
                        onClick={(e) => {
                            e.preventDefault();
                            signUp();
                        }}
                    >
                        Sign Up
                    </button>

                    <div className='w-3/4 border  my-1 border-solid border-white'></div>
                    
                    <div className="font-bold my-7 text-sm text-zinc-400">
                        Already have an account?
                        <Link to="/login" className='px-2 underline-offset-1 underline text-white hover:text-green-500'>
                            LOG IN INSTEAD
                        </Link>
                    </div>
                </div>
            </div>
        </div>        
    );
};

export default SignupComponent;
