import  { useState, ChangeEvent } from "react";

function Usevalidate() {
  type logintype = {
    username?: string;
    email?: string;
    pass?: string;
    cpass?: string;
  };
  type Errortype = {
    username?: string;
    email?: string;
    pass?: string;
    cpass?: string;
  };
  const [values, setvalues] = useState<logintype>({});
  const [errors, seterrors] = useState<Errortype>({});
  const handelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name;
    const value: string = event.target.value.trim();
    setvalues((prevvalues: logintype) => {
      return {
        ...prevvalues,
        [name]: value,
      };
    });

    validate( name, value, values);
  };

  const removevalue = () => {
    setvalues({});
  };
  const validate = (
  
    name: string,
    value: string,
    values: logintype
  ) => {
    switch (name) {
      case "username":
        if (value.length <= 4) {
          seterrors({
            ...errors,
            username: "Username atleast have 5 letters",
          });
        } else {
          const newobj = { ...errors };
          delete newobj.username;
          seterrors(newobj);
        }

        break;
      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          seterrors({
            ...errors,
            email: "Enter a valid email address",
          });
        } else {
          const newobj = { ...errors };
          delete newobj.email;
          seterrors(newobj);
        }
        break;

      case "pass":
        if (value.length <= 4) {
          seterrors({
            ...errors,
            pass: "Password should atleast have 5 letters",
          });
        } else {
          const newobj = { ...errors };
          delete newobj.pass;
          seterrors(newobj);
        }
        break;
      case "cpass":
        if (values.pass !== value) {
          seterrors({
            ...errors,
            cpass: "Password not match",
          });
        } else {
          const newobj = { ...errors };
          delete newobj.cpass;
          seterrors(newobj);
        }
        break;

      default:
        break;
    }
  };
  return {
    values,
    errors,
    handelChange,
    removevalue,
  };
}

export default Usevalidate;
