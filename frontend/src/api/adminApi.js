import api from "./axios";

export const getDashboard =
  async () => {
    const response =
      await api.get(
        "/admin/dashboard"
      );

    return response.data;
  };

export const getUsers =
  async () => {
    const response =
      await api.get(
        "/admin/users"
      );

    return response.data;
  };

export const getMechanics =
  async () => {
    const response =
      await api.get(
        "/admin/mechanics"
      );

    return response.data;
  };

export const getRequests =
  async () => {
    const response =
      await api.get(
        "/admin/requests"
      );

    return response.data;
  };

export const verifyMechanic =
  async (id) => {
    const response =
      await api.patch(
        `/admin/mechanics/${id}/verify`
      );

    return response.data;
  };
  export const deleteUser =
  async (id) => {
    const response =
      await api.delete(
        `/admin/users/${id}`
      );

    return response.data;
  };