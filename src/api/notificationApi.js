import api from "./axios";

export const getNotifications =
  async () => {
    const response =
      await api.get(
        "/notifications"
      );

    console.log(
      "Notifications API Response:",
      response
    );

    return response.data;
  };