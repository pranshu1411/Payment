import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Search } from "lucide-react";
import React, { useRef } from "react";

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

  const searchInputRef = useRef(null);
  React.useEffect(() => {
      const handleKeyDown = (e) => {
          if (e.key === '/' && document.activeElement !== searchInputRef.current) {
              e.preventDefault();
              searchInputRef.current?.focus();
          }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return <div className="mt-12">
    <div className="font-extrabold text-2xl text-white mb-6">
      Contacts
    </div>
    <div className="my-4 relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input 
        ref={searchInputRef}
        onChange={(e) => setFilter(e.target.value)} 
        type="text" 
        placeholder="Search for friends or merchants... (Press / to focus)" 
        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 backdrop-blur-sm shadow-sm"
      />
    </div>
    <div className="space-y-4 mt-6">
      {users.map((user, idx) => <User key={user._id} user={user} index={idx} />)}
    </div>
  </div>
}

function User({ user, index }) {
  const navigate = useNavigate();

  return (
    <div 
      className="group flex flex-col sm:flex-row sm:items-center justify-between py-4 px-5 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 relative overflow-hidden"
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -translate-x-full group-hover:translate-x-full"></div>

      <div className="flex items-center space-x-4 mb-4 sm:mb-0 relative z-10">
        <div className="rounded-full h-14 w-14 bg-indigo-500/20 border border-indigo-500/30 flex justify-center items-center text-2xl font-black text-indigo-400 shadow-inner group-hover:bg-indigo-500/30 transition-colors">
          {user.firstName[0].toUpperCase()}
        </div>
        <div>
          <div className="font-bold text-xl text-white tracking-wide">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-slate-400 font-medium tracking-wide">
            @{user.username}
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full sm:w-40 relative z-10">
        <Button
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName + "&username=" + user.username);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}