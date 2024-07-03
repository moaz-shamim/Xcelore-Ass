import axios from "axios";
import { useEffect, useState } from "react";

const EditFormSection = ({ userId, setEditUserId }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4040/api/user/${userId}`
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:4040/api/user/update/${userId}`,
        user,
        { withCredentials: true }
      );
      console.log("User updated successfully:", response.data);
      setEditUserId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
      <form onSubmit={handleUpdateUser}>
        {/* Form fields for editing user data */}
        <div>
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block mb-1">Role</label>
          <input
            type="text"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            required
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFormSection;
