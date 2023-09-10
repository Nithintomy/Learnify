import logo from "../../../assets/stud logo.jpg";
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import  axiosInstance  from '../../../Axios/axios'




function SignUp() {
    
    const [studentName,setStudentName]=useState('')
    const [studentEmail,setStudentEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [password,setPassword]=useState('')
    const [confimPassword,setConfirmPassword]=useState('')
    const isStrongPassword = (password:string):boolean=>{
        return password.length >=8;
    }
    const navigate =useNavigate()

    const handleSubmit =async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const trimmedstudentName = studentName.trim()
        const trimmedstudentEmail = studentEmail.trim()
        const trimmedPhone = phone.trim()
        const trimmedpassword = password.trim()

        if(trimmedstudentName==='' || trimmedstudentEmail==='' || trimmedPhone==='' || trimmedpassword==='' ){
            toast.error("Require All fields")
            return
        }

        if (!isStrongPassword(password)) {
            toast.error("password Must be atleast 8 characters")
            return
        }
        

        if(password!==confimPassword){
            toast.error("Password Not Match")
            return 
        }

     
        try {
            console.log("before axios call")
            const response = await axiosInstance.post('/student/register',{
                studentName:trimmedstudentName,
                studentEmail:trimmedstudentEmail,
                phone:trimmedPhone,
                password:trimmedpassword
            })
            console.log(response,"mfjkadfnhdfn")
            setTimeout(()=> {
              navigate('/login')
            }, 3000)
            toast.success("User Created SuccessFuly")

        }
        catch(error:any){
         
          console.log(error)
           toast.error(error.response.data.message)
        }
    }


  return (

    <div >

      <section className="bg-gray-50 dark:bg-gray-900 ">
      <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <img
                className="mx-auto h-10 w-auto"
                src={`${logo}?color=indigo&shade=600`}
                alt="Learnify"
              />
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
               Sign In
              </h1>
              <form className="space-y-4 md:space-y-6 " onSubmit={(e)=>handleSubmit(e)}>
              <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                   FullName
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Your FullName"
                    onChange={(e)=>setStudentName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                   Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={studentEmail}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                    onChange={(e)=>setStudentEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                   Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Your Phone Number"
                    onChange={(e)=>setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="••••••••"
                    onChange={(e)=>setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    value={confimPassword}
                    placeholder="••••••••"
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-light text-gray-500 dark:text-gray-300">
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <Link to={'/login'}>Login here</Link>
                              
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>   
    </div>

  );
}

export default SignUp;
