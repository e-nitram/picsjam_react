import api from "utils/api"

export const getPublicStripeKey = async () => {
  try {
    const response = await api.get("/stripe/public-key");
    return response.data.publishableKey;
  } catch (err: any) {
    console.error(err.response.data)
  }
}