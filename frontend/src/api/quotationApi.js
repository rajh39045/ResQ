import api from "./axios";

export const getQuotations = async (
  requestId
) => {
  const response =
    await api.get(
      `/quotations/request/${requestId}`
    );

  return response.data;
};

export const acceptQuotation =
  async (quotationId) => {
    const response =
      await api.patch(
        `/quotations/${quotationId}/accept`
      );

    return response.data;
  };

export const createQuotation =
  async (quotationData) => {
    const response =
      await api.post(
        "/quotations",
        quotationData
      );

    return response.data;
  };

export const submitQuotation =
  async (quotationData) => {
    const response =
      await api.post(
        "/quotations",
        quotationData
      );

    return response.data;
  };