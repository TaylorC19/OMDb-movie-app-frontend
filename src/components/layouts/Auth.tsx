import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import Header from "../Header";

interface Props {
  isSignIn: boolean;
}

const Auth = ({ isSignIn }: Props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const { user, loginUser, createUser} = UserAuth();
  const navigate = useNavigate();

  // handling alert modal
  const handleClose = () => setOpen(false);

  // handling submit username and password
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // form
    try {
      await loginUser(username, password);
      navigate('/')
    } catch (err) {
      setOpen(true);
      setAlertMessage("Incorrect Username or Password");
      console.error(err);
    }
    // console.log('EMAIL', email, 'PASSWORD', password);
  };

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await createUser(username, email, password);
      navigate('/')
    } catch (err) {
      setOpen(true);
      setAlertMessage(
        "Invaild username, email, or password"
      );
      console.error(err);
    }
  };

  return (
    <div className="">
      <Header></Header>
      <div className="flex flex-wrap flex-col mx-auto content-center">
        {isSignIn ? (
          <p className="text-black mt-9 mb-0 text-large">Welcome Back!</p>
        ) : (
          <p className="text-black mt-9 mb-0 text-large">
            Do not have an account? Sign Up!
          </p>
        )}

        <form
          onSubmit={isSignIn ? handleSubmit : handleSignUp}
          className="flex flex-col"
        >
          {!isSignIn && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              id="email"
              className="w-[80%] h-9 mt-7 mx-auto border-b-2 border-b-slate-500 text-black focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            id="username"
            className="w-[80%] h-9 mt-7 mx-auto border-b-2 border-b-slate-500 text-black focus:outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            id="password"
            className="w-[80%] h-9 mt-7 mx-auto border-b-2 border-b-slate-500 text-black focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          {isSignIn ? (
            <>
              <button
                type="submit"
                className="h-11 font-xl mt-8 bg-blue-600 text-white p-1 rounded mx-auto"
              >
                Sign In
              </button>
              <p className="text-blue-600 mt-6">
                Do not have an account? Sign-up here!
              </p>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="h-11 font-xl mt-8 bg-blue-600 text-white p-1 rounded mx-auto"
              >
                Sign Up
              </button>
              <p className="text-blue-600 mt-6">Already a user? Sign-in!</p>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
