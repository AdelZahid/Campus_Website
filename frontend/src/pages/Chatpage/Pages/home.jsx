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

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/user");
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      return res.json();
    },
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                {activeTab === "all" && (
                  <>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <ChatUserCard
                          key={user.id}
                          user={user}
                          onClick={() => setSelectedUser(user)}
                        />
                      ))
                    ) : (
                      <div className="empty-state">
                        <p>No users found</p>
                      </div>
                    )}
                  </>
                )}

                {activeTab === "connected" && (
                  <div className="empty-state">
                    <p>Connected users will appear here</p>
                  </div>
                )}

                {activeTab === "community" && (
                  <div className="empty-state">
                    <p>Community features coming soon</p>
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
