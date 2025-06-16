import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { FiAlertTriangle } from "react-icons/fi";

function AdminManageUsers() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // ✅ XSS protection: Validate image URLs
  const isValidImageUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      return ["http:", "https:"].includes(parsedUrl.protocol);
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/getUsers`
        );

        if (!response.ok)
          throw new Error(`Error fetching users: ${response.statusText}`);
        const users = await response.json();
        setUsers(users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleConfirmDelete = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/deleteUser/${userId}`,
        { method: "DELETE" }
      );

      if (!response.ok)
        throw new Error(`Failed to delete user: ${response.statusText}`);

      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user!");
    }
  };

  const changeUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/changeUserRole/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok)
        throw new Error(`Failed to change role: ${response.statusText}`);

      setUsers(
        users.map((user) =>
          user.id === userId
            ? {
                ...user,
                public_metadata: { ...user.public_metadata, role: newRole },
              }
            : user
        )
      );
      toast.success("User role updated successfully!");
    } catch (error) {
      console.error("Error changing user role:", error);
      toast.error("Error updating user role!");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-teal-50">
        <p className="text-teal-600 text-lg font-semibold">Loading users...</p>
      </div>
    );

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn || user?.publicMetadata?.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-6">
        <div className="text-red-500 mb-4">
          <FiAlertTriangle className="w-16 h-16" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Access Denied
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          You do not have permission to view this page. If you believe this is a
          mistake, please contact the administrator or sign in with an admin
          account.
        </p>
        <div className="flex gap-4">
          <a href="/">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full shadow-md">
              Go to Home
            </Button>
          </a>
          {!isSignedIn && (
            <SignInButton mode="modal">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full shadow-md">
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-teal-50">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 text-center">
        Manage Users
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full"></div>
      <div className="overflow-x-auto w-full max-w-4xl mt-2">
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md text-sm md:text-base">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="py-3 px-4 text-left">Profile</th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">
                First Name
              </th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">
                Last Name
              </th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left hidden md:table-cell">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-teal-100 transition-all"
              >
                <td className="py-3 px-4">
                  <img
                    src={
                      isValidImageUrl(user.image_url)
                        ? user.image_url
                        : "https://via.placeholder.com/50"
                    }
                    alt="Profile"
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4 text-gray-700 hidden sm:table-cell">
                  {user.first_name}
                </td>
                <td className="py-3 px-4 text-gray-700 hidden sm:table-cell">
                  {user.last_name}
                </td>
                <td className="py-3 px-4 text-gray-700 break-words max-w-[140px] md:max-w-xs">
                  {user.email_addresses[0]?.email_address || "No email"}
                </td>
                <td className="py-3 px-4 text-gray-700 hidden md:table-cell">
                  {capitalizeFirstLetter(user.public_metadata?.role) ||
                    "Member"}
                </td>
                <td className="py-3 px-4 text-center flex flex-col sm:flex-row items-center justify-center gap-2">
                  <select
                    value={user.public_metadata?.role || "member"}
                    onChange={(e) => changeUserRole(user.id, e.target.value)}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-xs md:text-sm"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => handleConfirmDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-red-600 transition-all text-xs md:text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Delete User?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteUser(selectedUserId);
                  setShowDeleteModal(false);
                }}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default AdminManageUsers;
