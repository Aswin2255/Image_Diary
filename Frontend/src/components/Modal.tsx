import { useDispatch } from "react-redux";
import axiosinstance from "../Axios";
import { toast } from "react-toastify";
import { Imageaction } from "../Redux/Imageslice";
import { Authaction } from "../Redux/Authslice";
type prop = {
  url: string;
  setmodal: (value: boolean) => void;
  setloading: (value: boolean) => void;
  image?: File;
  clearfile : ()=>void;
};

function Modal({ url, setmodal, setloading, image,clearfile }: prop) {
    const dispatch = useDispatch()
    const generateerror = (err: string) => {
        toast.error(err, {
          position: "top-center",
        });
      };
      const generatsucc = (msg: string) => {
        toast.success(msg, {
          position: "top-center",
        });
      };
  const base64 = (image: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(image);
      filereader.onload = () => {
        resolve(filereader.result);
      };
      filereader.onerror = () => {
        reject(filereader.error);
      };
    });
  };

  const uploadimage = async () => {
    try {
      setloading(true);
      setmodal(false);
      if (image) {
        const imagconvert = await base64(image);
        console.log(imagconvert);
        axiosinstance
          .post("/image/upload", { image: imagconvert })
          .then(({ data }) => {
            dispatch(Imageaction.Setimage(data.getallimage));
            setloading(false)
            generatsucc('image uploaded succesfully')
          })
          .catch(() => {
            setloading(false)
            alert("network error ocured");
            dispatch(Authaction.Setlogout())
          });
      } else {
        generateerror("unexpected error happends");
        setloading(false);
      }
    } catch (error) {
      generateerror("cannote upload this type of file sorry");
      setmodal(false);
      setloading(false);
    }
  };
  const closemodal = ()=>{
    clearfile()
    setmodal(false)
  }
  return (
    <div>
      <div>
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <button
                    onClick={closemodal}
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/*body*/}
                <div className="p-2"></div>

                <div className="relative p-6 flex-auto">
                  <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                    <img src={url}></img>
                  </div>

                  <div></div>
                </div>

                {/*footer*/}

                <div className="flex  items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <div>
                    <button
                      type="button"
                      onClick={uploadimage}
                      className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      </div>
    </div>
  );
}

export default Modal;
