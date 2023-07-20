import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export const ShowMessages = ({ welcomeText, messageData, currentUser }) => {
  return (
    <ScrollToBottom className="message-container">
      <div>
        <div style={{ position: "sticky", top: 0 }}>
          {welcomeText.map((joinedUser) => (
            <p key={joinedUser.id}>{`${
              joinedUser.username !== currentUser
                ? `${joinedUser.username} is joined the chat!`
                : ""
            }`}</p>
          ))}
        </div>
        {messageData.map((user) => {
          return (
            <div
              className={`message`}
              id={user.username === currentUser ? "you" : "other"}
              key={user.id}
            >
              <div>
                <div className="message-content">
                  <p>{user?.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{user?.time}</p>
                  <p id="author">{user?.username}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollToBottom>
  );
};
