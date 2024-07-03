import axios from "axios";
import { useEffect, useState } from "react";
import EditFormSection from "./EditFormSection";

const DashboardSection = () => {
  const [data, setData] = useState([]);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4040/api/user");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [editUserId]);

  const handleDeleteAccount = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4040/api/user/delete/${userId}`,
        { withCredentials: true }
      );
      if (response.status === 200 || response.status === 204) {
        setData((prevData) => prevData.filter((user) => user._id !== userId));
        console.log("User deleted successfully");
      } else {
        console.log("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditAccount = (userId) => {
    setEditUserId(userId); // Set the userId to edit
  };

  const handleUpdateUser = async (updatedUserData) => {
    try {
      const response = await axios.put(
        `http://localhost:4040/api/user/update/${editUserId}`,
        updatedUserData
      );
      console.log("User updated successfully:", response.data);
      // Optionally handle success update logic
      setEditUserId(null); // Clear editUserId to hide the form
      // Fetch data again to update the list
      fetchData();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4040/api/user");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container px-6 py-8 mx-auto">
      {editUserId ? (
        <EditFormSection
          key={editUserId} 
          userId={editUserId}
          onUpdateUser={handleUpdateUser} 
          setEditUserId={setEditUserId} 
        />
      ) : (
        <>
          <div className="mt-4">
            <div className="flex flex-wrap -mx-6">
              <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      {data.length}
                    </h4>
                    <div className="text-gray-500">Total Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        First Name
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Last Name
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Email
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Role
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"></th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"></th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {data.map((user, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {user.first_name}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {user.last_name}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {user.email}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {user.role}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                          <button
                            href="#"
                            className="text-green-600 hover:text-green-900"
                            onClick={() => handleEditAccount(user._id)}
                          >
                            Edit
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                          <button
                            href="#"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteAccount(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardSection;
