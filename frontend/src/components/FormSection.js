import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FormSection = ({ currentSection }) => {
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
      currentSection("dashboard");
    } catch (error) {
      setError(true);
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Add User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="bg-slate-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          id="first_name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="bg-slate-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          id="last_name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          id="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          id="password"
          onChange={handleChange}
          required
        />
        <select
          id="role"
          onChange={handleChange}
          className="bg-slate-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          value={formData.role}
        >
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <button
          disabled={loading}
          className={`bg-slate-700 text-white p-3 rounded-lg uppercase ${
            loading ? "opacity-75 cursor-not-allowed" : "hover:opacity-95"
          }`}
        >
          {loading ? "Loading..." : "Add User"}
        </button>
      </form>

      {error && (
        <p className="text-red-700 mt-5 text-center">Something went wrong!</p>
      )}
    </div>
  );
};

export default FormSection;
