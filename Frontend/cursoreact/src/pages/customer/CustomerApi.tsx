import Customer from "./Customer";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL

export const searchCustomers = async () => {
  const request = await axios.get(`${baseURL}/customers`)
  return request.data;
}
export const removeCustomers = async (id: number) => {
  const response = await axios.delete(`${baseURL}/customers/${id}`)
  return response.data;
}

export const saveCustomers = async(customer: Customer) => {
  try{
    const response = await axios.post(`${baseURL}/customers`, customer)
    return response.data;
  } catch(e: any) {
    console.log( e.response.data.message);
  }
}

export const updateCustomers = async(id: number, customer: Customer) => {
  try{
    const response = await axios.put(`${baseURL}/customers/${id}`, customer)
    return response.data;
  }catch(e: any) {
    console.log(e);
  }
}

export const searchCustomerByID = async (id: number) => {
  let customers = await searchCustomers()
  return customers.find((customer: Customer) => customer.customerID == id)
}