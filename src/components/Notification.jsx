import React from "react";
import '../css/notification.css';


function Notification(isNotification, message) {
  return (
    <div>
      {isNotification && <div className="notification">{message}</div>}
    </div>
  );
}

export default Notification;