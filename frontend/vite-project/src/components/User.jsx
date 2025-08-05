import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const currentUserId = decodedToken.id || decodedToken._id;

    axios
      .get("http://localhost:3000/api/user/allusers?filter=" + filter, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const filteredUsers = response.data.users.filter(
          (user) => user._id !== currentUserId
        );

        const sortedUsers = filteredUsers.sort((a, b) => {
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });

        setUsers(sortedUsers);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error.response?.data || error.message);
      });
  }, [filter]);



  return <div>
    <div className="font-bold mt-6 text-lg">
      Users
    </div>
    <div className="my-2">
      <input onChange={(e) => {
        setFilter(e.target.value)
      }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
    </div>
    <div>
      {users.map(user => <User key={user._id} user={user} />)}
    </div>
  </div>
}

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 items-center py-3 px-4 bg-white rounded-lg shadow-sm mb-3">
      {/* Avatar + Name */}
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center text-xl font-semibold text-gray-700 mr-3">
          {user.firstName[0].toUpperCase()}
        </div>
        <div>
          <div className="font-medium">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      {/* Username column */}
      <div className="text-sm text-gray-600 font-mono">
        @{user.username}
      </div>

      {/* Send Money button */}
      <div className="flex justify-end">
        <Button
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}