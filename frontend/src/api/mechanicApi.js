import api from "./axios";

export const getAvailableRequests =
  async () => {
    const response =
      await api.get(
        "/mechanics/requests"
      );

    return response.data;
  };

export const updateLocation =
  async (locationData) => {
    const response =
      await api.patch(
        "/mechanics/location",
        locationData
      );

    return response.data;
  };

export const getActiveJobs =
  async () => {
    const response =
      await api.get(
        "/mechanics/active-jobs"
      );

    return response.data;
  };

export const startJob =
  async (id) => {
    const response =
      await api.patch(
        `/mechanics/jobs/${id}/start`
      );

    return response.data;
  };

export const completeJob =
  async (id) => {
    const response =
      await api.patch(
        `/mechanics/jobs/${id}/complete`
      );

    return response.data;
  };