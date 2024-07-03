import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { MySpinner ,OAuth } from "../components";

const SignUp = () => {
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "User",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4040/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response data:", response.data);
      setError(false);
      navigate("/sign-in");
    } catch (error) {
      setError(true);
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="First Name"
          className="bg-slate-100 p-3 rounded-lg"
          id="first_name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="bg-slate-100 p-3 rounded-lg"
          id="last_name"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          id="password"
        />
        <select
          id="role"
          onChange={handleChange}
          className="bg-slate-100 p-3 rounded-lg"
          value={formData.role}
        >
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 flex justify-center"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went Wrong!"}</p>
    </div>
  );
};

export default SignUp;
