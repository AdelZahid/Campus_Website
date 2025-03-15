import { useState } from "react";
import { Users, MessageSquare, Users2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ChatUserCard from "../chat/ChatUserCard";
import AddFriendButton from "../chat/AddFriendDialog";
import ChatView from "../chat/ChatView";
import "./Home.css";
import Navbar from "../../../components/Navbar/Navbar";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const res = await fetch("/api/user/getUserProfile", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch friends");
      }
      const data = await res.json();
      console.log("Friends data:", data); // Log the response
      return data;
    },
  });

  const filteredFriends = friends.filter(
    (friend) =>
      (friend.username || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (friend.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-container">
      <Navbar />
      <div className="chat-content">
        <div className="header-card">
          <h1 className="header-title">Find Your Friends</h1>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="tabs-container">
          <div className="tab-list">
            <button
              className={`tab-button ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              <Users className="h-4 w-4" />
              All
            </button>
            <button
              className={`tab-button ${
                activeTab === "connected" ? "active" : ""
              }`}
              onClick={() => setActiveTab("connected")}
            >
              <MessageSquare className="h-4 w-4" />
              Connected
            </button>
            <button
              className={`tab-button ${
                activeTab === "community" ? "active" : ""
              }`}
              onClick={() => setActiveTab("community")}
            >
              <Users2 className="h-4 w-4" />
              Community
            </button>
          </div>
          <div className="chat-list">
            {isLoading ? (
              <div className="empty-state">
                <p>Loading...</p>
              </div>
            ) : (
              <>
                {filteredFriends.length > 0 ? (
                  filteredFriends.map((friend) => (
                    <ChatUserCard
                      key={friend._id}
                      user={friend}
                      onClick={() => setSelectedUser(friend)}
                    />
                  ))
                ) : (
                  <div className="empty-state">
                    <p>No friends found</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <AddFriendButton />

      {selectedUser && (
        <ChatView user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
