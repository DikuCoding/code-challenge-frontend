import React, { useState, useEffect } from "react";
import ActionCable from "actioncable";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    const subscription = cable.subscriptions.create("NotificationsChannel", {
      received: (data) => {
        setNotifications((prev) => [...prev, data.message]);
        setIsNotificationVisible(true);
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showNotifications) {
      setIsNotificationVisible(false);
    }
  };

  return (
    <div>
      <button onClick={toggleNotifications}>
        Notifications {isNotificationVisible && <span>({notifications.length})</span>}
      </button>
      {showNotifications && (
        <div>
          <h3>All Notifications</h3>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
