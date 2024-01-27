import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await res.json();
    if (data.message == "Success") {
      localStorage.setItem("token", data.token);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center h-screen items-center gap-8 p-4 bg-gray-100">
          <h1 className="text-2xl">Login</h1>
          <div className="username">
            <label class="block mb-2 text-sm font-medium text-gray-900 ">
              Username
            </label>

            <input
              className=" block w-full h-5 p-4 text-gray-900 border border-gray-300 rounded-lg"
              type="text"
              value={username}
              name="username"
              onChange={(e) => {
                console.log(e.target.value);
                setUsername(e.target.value);
              }}
            ></input>
          </div>
          <div className="password">
            <label class="block mb-2 text-sm font-medium text-gray-900 ">
              Password
            </label>

            <input
              className=" block w-full h-5 p-4 text-gray-900 border border-gray-300 rounded-lg"
              type="text"
              value={password}
              name="username"
              onChange={(e) => {
                console.log(e.target.value);
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <button
            type="submit"
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Submit
            </span>
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
