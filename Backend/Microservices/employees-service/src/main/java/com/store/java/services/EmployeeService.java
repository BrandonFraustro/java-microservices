package com.store.java.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.stereotype.Service;

import com.store.java.entities.Employee;
import com.store.java.repositories.EmployeeRepository;

@Service
public class EmployeeService implements IEmployeeService{

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> getAll() {
        return (List<Employee>)employeeRepository.findAll();
    }

    @Override
    public Employee getEmployee(Long employeeID) {
        try {
            return employeeRepository.findById(employeeID).get();
        } catch(NoSuchElementException e){
            return null;
        }
    }

    @Override
    public void removeEmployee(Long employeeID) {
        try {
            employeeRepository.deleteById(employeeID);
        } catch(NoSuchElementException e){

        }
    }

    @Override
    public void saveEmployee(Employee employeeContent) {
        if(employeeContent.getName() == null || employeeContent.getLastname() == null || employeeContent.getEmail() == null) {
            throw new IllegalArgumentException("Employee data is empty");
        }
        try {
            employeeRepository.save(employeeContent);
        } catch (HttpMessageNotReadableException e) {
            throw e;
        }
    }

    @Override
    public void updateEmployee(Long employeeID, Employee employeeContent) {
        try {
            Employee employeeFounded = employeeRepository.findById(employeeID).get();
            if (employeeContent.getName() == null || employeeContent.getLastname() == null || employeeContent.getEmail() == null) {
                throw new IllegalArgumentException("Employee data is empty");
            }

            employeeFounded.setName(employeeContent.getName());
            employeeFounded.setLastname(employeeContent.getLastname());
            employeeFounded.setEmail(employeeContent.getEmail());
            employeeFounded.setPhone(employeeContent.getPhone());
            employeeFounded.setAddress(employeeContent.getAddress());
            employeeFounded.setSalary(employeeContent.getSalary());
    
            employeeRepository.save(employeeFounded);
        } catch(NoSuchElementException e) {

        } catch (HttpMessageNotReadableException e) {
            throw new IllegalArgumentException(e);
        }
    }
}
