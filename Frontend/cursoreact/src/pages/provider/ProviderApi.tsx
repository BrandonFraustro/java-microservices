import Provider from "./Provider";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const searchProviders = async () => {
  const response = await axios.get(`${baseURL}/providers`)
  return response.data;
}

export const removeProviders = async (id: number) => {
  const response = await axios.delete(`${baseURL}/providers/${id}`)
  return response.data
}

export const saveProviders = async (provider: Provider) => {
  try {
    const response = await axios.post(`${baseURL}/providers`, provider)
    return response.data;
  } catch(e: any) {
    console.log(e.response.data.message);
  }
}
export const updateProviders = async (id: number, provider: Provider) => {
  try{
    const response = await axios.put(`${baseURL}/providers/${id}`, provider)
    return response.data;
  }catch(e: any) {
    console.log(e);
  }
}

export const searchProviderByID = async (id: number) => {
  let providers = await searchProviders()
  return providers.find((provider: Provider) => provider.providerID == id)
}