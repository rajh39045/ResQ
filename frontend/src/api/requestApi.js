import api from "./axios";

export const createRequest =
  async (requestData) => {
    const response =
      await api.post(
        "/requests",
        requestData
      );

    return response.data;
  };

export const getMyRequests =
  async () => {
    const response =
      await api.get("/requests");

    return response.data;
  };