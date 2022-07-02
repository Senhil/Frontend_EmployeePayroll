import axios from "axios";

class EmployeeService {
    baseUrl = "http://localhost:8082/employeepayrollservice";
    addEmployee(data){
        return axios.post(`${this.baseUrl}/create`,data)
    }

    getAllEmployee(){
        return axios.get(`${this.baseUrl}/get`)
    }

    getEmployee(employeeId){
        return axios.get(`${this.baseUrl}/get/${employeeId}`);
    }
    
    editEmployee(employeeId,data) {
        return axios.put(`${this.baseUrl}/update/${employeeId}`, data);
      }

    deleteEmployee(employeeId) {
        return axios.delete(`${this.baseUrl}/delete/${employeeId}`);
      }
}

export default new EmployeeService();