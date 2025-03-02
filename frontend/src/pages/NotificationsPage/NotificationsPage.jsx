import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./NotificationsPage.css";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    // Simulate fetching notifications from API
    setTimeout(() => {
      setNotifications(sampleNotifications);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleDeleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const getFilteredNotifications = () => {
    switch (activeFilter) {
      case "unread":
        return notifications.filter((notification) => !notification.isRead);
      case "messages":
        return notifications.filter(
          (notification) => notification.type === "message"
        );
      case "events":
        return notifications.filter(
          (notification) => notification.type === "event"
        );
      case "helpdesk":
        return notifications.filter(
          (notification) => notification.type === "helpdesk"
        );
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="notifications-page">
      <Navbar />

      <div className="notifications-container">
        <div className="notifications-header">
          <h1>Notifications</h1>
          <div className="notifications-actions">
            <button
              className="mark-all-read"
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
            >
              <i className="fas fa-check-double"></i> Mark all as read
            </button>
          </div>
        </div>

        <div className="notifications-filters">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All <span className="count">{notifications.length}</span>
          </button>
          <button
            className={`filter-btn ${
              activeFilter === "unread" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("unread")}
          >
            Unread <span className="count">{unreadCount}</span>
          </button>
          <button
            className={`filter-btn ${
              activeFilter === "messages" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("messages")}
          >
            Messages
          </button>
          <button
            className={`filter-btn ${
              activeFilter === "events" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("events")}
          >
            Events
          </button>
          <button
            className={`filter-btn ${
              activeFilter === "helpdesk" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("helpdesk")}
          >
            Helpdesk
          </button>
        </div>

        <div className="notifications-list">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading notifications...</p>
            </div>
          ) : filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${
                  !notification.isRead ? "unread" : ""
                }`}
              >
                <div
                  className="notification-icon"
                  data-type={notification.type}
                >
                  {notification.type === "message" && (
                    <i className="fas fa-comment-alt"></i>
                  )}
                  {notification.type === "friend" && (
                    <i className="fas fa-user-friends"></i>
                  )}
                  {notification.type === "event" && (
                    <i className="fas fa-calendar-check"></i>
                  )}
                  {notification.type === "helpdesk" && (
                    <i className="fas fa-question-circle"></i>
                  )}
                  {notification.type === "university" && (
                    <i className="fas fa-university"></i>
                  )}
                </div>

                <div className="notification-content">
                  <div className="notification-header">
                    <h3 className="notification-title">{notification.title}</h3>
                    <span className="notification-time">
                      {notification.time}
                    </span>
                  </div>
                  <p className="notification-message">{notification.message}</p>

                  {notification.actionLink && (
                    <Link
                      to={notification.actionLink}
                      className="notification-action"
                    >
                      {notification.actionText}{" "}
                      <i className="fas fa-arrow-right"></i>
                    </Link>
                  )}
                </div>

                <div className="notification-actions">
                  {!notification.isRead && (
                    <button
                      className="mark-read-btn"
                      onClick={() => handleMarkAsRead(notification.id)}
                      aria-label="Mark as read"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteNotification(notification.id)}
                    aria-label="Delete notification"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-notifications">
              <div className="empty-icon">
                <i className="fas fa-bell-slash"></i>
              </div>
              <h3>No notifications</h3>
              <p>
                You don't have any {activeFilter !== "all" ? activeFilter : ""}{" "}
                notifications at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sample data
const sampleNotifications = [
  {
    id: 1,
    type: "message",
    title: "New message from David Lee",
    message: "Hey, did you get the notes from yesterday lecture?",
    time: "10 minutes ago",
    isRead: false,
    actionLink: "/messages",
    actionText: "Reply to message",
  },
  {
    id: 2,
    type: "event",
    title: "Event reminder",
    message: "The Computer Science Club meeting starts in 1 hour.",
    time: "1 hour ago",
    isRead: false,
    actionLink: "/clubs/events",
    actionText: "View event details",
  },
  {
    id: 3,
    type: "helpdesk",
    title: "Your question was answered",
    message:
      "Sarah Johnson replied to your question about machine learning courses.",
    time: "2 hours ago",
    isRead: true,
    actionLink: "/helpdesk/question/123",
    actionText: "View answer",
  },
  {
    id: 4,
    type: "friend",
    title: "New friend request",
    message: "Michael Brown sent you a friend request.",
    time: "5 hours ago",
    isRead: false,
    actionLink: "/profile/friends",
    actionText: "Respond to request",
  },
  {
    id: 5,
    type: "university",
    title: "Application update",
    message: "Your application to Stanford University has been received.",
    time: "1 day ago",
    isRead: true,
    actionLink: "/university/applications",
    actionText: "Track your application",
  },
  {
    id: 6,
    type: "event",
    title: "New campus event",
    message: "Spring Career Fair is scheduled for next month. Register now!",
    time: "2 days ago",
    isRead: true,
    actionLink: "/events/career-fair",
    actionText: "Register for event",
  },
  {
    id: 7,
    type: "message",
    title: "New group message",
    message: 'New message in "Biology Study Group"',
    time: "3 days ago",
    isRead: true,
    actionLink: "/messages/groups",
    actionText: "View group chat",
  },
];

export default NotificationsPage;
