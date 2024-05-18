package com.store.java.services;

import java.util.List;

import com.store.java.entities.Employee;

public interface IEmployeeService {

    List<Employee> getAll();

    Employee getEmployee(Long employeeID);

    void removeEmployee(Long employeeID);

    void saveEmployee(Employee employeeContent);

    void updateEmployee(Long employeeID, Employee employeeContent);
}
