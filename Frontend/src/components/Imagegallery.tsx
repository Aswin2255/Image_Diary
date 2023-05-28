import { useEffect, useState } from "react";
import axiosinstance from "../Axios";
import { useDispatch, useSelector } from "react-redux";
import { Imageaction } from "../Redux/Imageslice";
import Loaders from "./Loaders";
import { Authaction } from "../Redux/Authslice";

function Imagegallery() {
  const [loading, setloading] = useState<boolean>(true);
  type state = {
    Image: {
      imageurl: [];
    };
  };
  type images = {
    _id: string;
    imageurl: string;
  };
  const dispatch = useDispatch();
  const allimage = useSelector((state: state) => state.Image.imageurl);
  useEffect(() => {
    axiosinstance
      .get("/image/allimage")
      .then(({ data }) => {
        dispatch(Imageaction.Setimage(data.getallimage));
        setloading(false);
      })
      .catch(() => {
        alert("unexpected error ocured");
        dispatch(Authaction.Setlogout());
      });
  }, [dispatch]);
  return (
    <>
      <div className="flex justify-center align-middle m-10   ">
        <h1 className="items-center font-bold text-2xl  dark:text-white">
          Your Images
        </h1>
      </div>
      <div className="flex justify-center">
        {loading ? (
          <Loaders />
        ) : (
          <div className="lg:grid  grid-cols-3 gap-4">
            {allimage.map((e: images) => {
              return (
                <>
                  <div key={e._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="h-full w-full" src={e.imageurl}></img>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Imagegallery;
