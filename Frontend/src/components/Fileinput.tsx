import React , {useRef, useState} from 'react'
import Modal from './Modal'
import Loaders from './Loaders'
import { toast } from 'react-toastify'
function Fileinput() {
  const [loading,setloading] = useState<boolean>(false)
  const [modal,setmodal] = useState<boolean>(false)
  const [image,setimage] = useState<File>()
  const [url,seturl] = useState<string>('')
  const fileref = useRef<HTMLInputElement>(null)
  const handelchange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.files?.[0])
    
    if( e.target.files?.[0].type === 'image/jpeg' || e.target.files?.[0].type === 'image/png' && e.target.files[0].size <  5242880){
      setmodal(true)
      const file = e.target.files?.[0]
      setimage(e.target.files?.[0])
      const imageurl = file ? URL.createObjectURL(file) : ''
      seturl(imageurl)
    }
    else{
      generateerror('only images/jpeg and images/png below 5 mb accepted')
      if(fileref.current){
      fileref.current.value = ''
      }
    }
   
  }
  const clearfile = ()=>{
    if(fileref.current){
    fileref.current.value = ''
    }
  }
  const generateerror = (err: string) => {
    toast.error(err, {
      position: "top-center",
    });
  };
 
 
  return (
    <>
    {
      modal && <Modal url={url} setmodal = {setmodal} setloading = {setloading} image = {image} clearfile = {clearfile}  />
    }
    <div className="flex justify-center align-middle m-10   ">
        <h1 className="items-center font-bold text-2xl  dark:text-white">
          Upload Images 
        </h1>
      </div>
    
    <div className="flex justify-center m-10 cursor-pointer">
     {
      loading ? <Loaders/> :  <div>
      <input
      onChange={(e)=>handelchange(e)}
      ref={fileref}
        className=" block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
        accept="jpg"
      ></input>
    </div>
     }
    </div>
    </>
  );
}

export default Fileinput;
