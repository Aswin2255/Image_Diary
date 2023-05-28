import {FormEvent, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Usevalidate from '../hooks/Usevalidate'
import axiosinstance from '../Axios'
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { Authaction } from '../Redux/Authslice';
import Loaders from './Loaders';

function Signin() {
  const [loader,setloader] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const {handelChange,values,errors} = Usevalidate()
    const generateerror = (err: string) => {
      toast.error(err, {
        position: "top-center",
      });
    };
    const handelsubmit = (e:FormEvent<HTMLFormElement>)=>{
           e.preventDefault()
           setloader(true)
           if(Object.keys(values).length === 2 && Object.keys(errors).length === 0){
            axiosinstance.post('/auth/login',values).then(({data})=>{
              dispatch(Authaction.Setlogin(data.userfind[0].username));
                navigate('/')
            }).catch(()=>{
               generateerror('invalid username or password')
               setloader(false)
            })
           }
           else{
            generateerror('input fields have errors')
            setloader(false)
           }
    }
  return (
    <div className=" dark:bg-gray-900">
    <div className="flex justify-center align-middle m-10  ">
      <h1 className="items-center font-bold text-2xl  dark:text-white">
        Sign in to your account
      </h1>
    </div>
    <div className="flex justify-center items-center align-middle m-10  ">
     {
      loader ? <Loaders/> :  <form className="w-full max-w-lg" onSubmit={handelsubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 dark:text-white">
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            required={true}
            maxLength={20}
            value={values.email}
            placeholder="example@gmail.com"
            name="email"
            onChange={handelChange}
          ></input>
          <p className="text-red-500 text-xs italic h-4">{errors.email}</p>
        </div>
        <div className="w-full px-3 mt-4">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  dark:text-white ">
            Password
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="password"
            required={true}
            maxLength={10}
            value={values.pass}
            placeholder="*****"
            name="pass"
            onChange={handelChange}
          ></input>
          <p className="text-red-500 text-xs italic h-4">{errors.pass}</p>
        </div>
      </div>

      <div className="flex justify-center align-middle ">
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Sign in
        </button>
      </div>
      <p className=" m-4 text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <Link
          to={'/signup'}
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign up
        </Link>
      </p>
    </form>
     }
    </div>
  </div>
  )
}

export default Signin
