import io from "socket.io-client";

export const socketConnect = () => {
  try {
    const socket = io.connect(process.env.REACT_APP_API);

    return { socket };
  } catch (error) {
    return {
      error: error?.messsage || "something went wrong",
    };
  }
};
