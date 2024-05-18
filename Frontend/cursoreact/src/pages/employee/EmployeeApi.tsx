import Employee from "./Employee";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL

export const searchEmployees = async () => {
  const response = await axios.get(`${baseURL}/employees`)
  return response.data;
}

export const removeEmployees = async (id: number) => {
  const response = await axios.delete(`${baseURL}/employees/${id}`)
  return response.data;
}

export const saveEmployees = async (employee: Employee) => {
  try{
    const response = await axios.post(`${baseURL}/employees`, employee);
    return response.data;
  } catch(e: any) {
    console.log(e.response.data.message);
  }
}

export const updateCustomers = async (id: number, employee: Employee) => {
  try{
    const response = await axios.put(`${baseURL}/employees/${id}`, employee)
    return response.data;
  }catch(e: any) {
    console.log(e);
  }
}

export const searchEmployeeByID = async (id: number) => {
  let employees = await searchEmployees()
  return employees.find((employee: Employee) => employee.employeeID == id)
}