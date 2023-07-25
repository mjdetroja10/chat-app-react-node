import "./style/global.css";

import { Chat } from "./Components/Chat-Component/Chat";
import { useEffect, useState } from "react";
import { CreateRoom } from "./Components/Create-Room/CreateRoom";
import { socketConnect } from "./Infrasctrure/Socket-Connect/SocketConnect";

const { socket, error } = socketConnect();

export function App() {
  const [data, setData] = useState(null);
  const [socketError, setsocketError] = useState(null);

  useEffect(() => {
    socket.on("connect", () => setsocketError(null));

    socket.on("connect_error", (err) =>
      setsocketError(`error duo to  ${err?.message || "network error"}`)
    );
  }, [socketError]);

  return (
    <div className="App">
      {data ? (
        <Chat socket={socket} data={data} />
      ) : (
        <CreateRoom
          socket={socket}
          setData={setData}
          socketError={socketError || error}
        />
      )}
    </div>
  );
}
