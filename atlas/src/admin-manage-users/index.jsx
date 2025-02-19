import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react"; // Import trash icon
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitalizeFirstLetter = (string) => {
    if (!string) return ""; // Return an empty string if the input is undefined or falsy
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getUsers");

        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }

        const users = await response.json();
        console.log("Users:", users);

        setUsers(users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/deleteUser/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }

      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User deleted successfully!"); // Toast message
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user!"); // Error toast message
    }
  };

  const changeUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`http://localhost:5000/api/changeUserRole/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }), // Ensure you send the correct body structure
      });

      if (!response.ok) {
        throw new Error(`Failed to change role: ${response.statusText}`);
      }

      // Update the user in the state immediately
      setUsers(users.map(user => 
        user.id === userId ? { ...user, public_metadata: { ...user.public_metadata, role: newRole } } : user
      ));
      toast.success("User role updated successfully!"); // Toast message
    } catch (error) {
      console.error("Error changing user role:", error);
      toast.error("Error updating user role!"); // Error toast message
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-teal-50">
        <p className="text-teal-600 text-lg font-semibold">Loading users...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-teal-50">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 text-center">
        Manage Users
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full"></div>
      <div className="overflow-x-auto w-full max-w-4xl mt-2">
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="py-4 px-6 text-left">Profile</th>
              <th className="py-4 px-6 text-left">First Name</th>
              <th className="py-4 px-6 text-left">Last Name</th>
              <th className="py-4 px-6 text-left">Email</th>
              <th className="py-4 px-6 text-left">Role</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-teal-100 transition-all"
              >
                <td className="py-4 px-6">
                  <img
                    src={user.image_url || "https://via.placeholder.com/50"}
                    alt="Profile"
                    className="w-14 h-14 rounded-full object-cover border-2 border-teal-400"
                  />
                </td>
                <td className="py-4 px-6 text-gray-700">{user.first_name}</td>
                <td className="py-4 px-6 text-gray-700">{user.last_name}</td>
                <td className="py-4 px-6 text-gray-700">
                  {user.email_addresses[0]?.email_address || "No email"}
                </td>
                <td className="py-4 px-6 text-gray-700">
                  {/* Display current role */}
                  {capitalizeFirstLetter(user.public_metadata?.role) || "Member"}
                </td>
                <td className="py-4 px-6 text-center flex items-center justify-center gap-2">
                  <select
                    value={user.public_metadata?.role || "member"}
                    onChange={(e) => changeUserRole(user.id, e.target.value)}
                    className="border border-gray-300 rounded-lg px-2 py-1"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-red-600 transition-all"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminManageUsers;
