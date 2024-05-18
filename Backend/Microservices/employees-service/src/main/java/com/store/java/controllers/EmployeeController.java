package com.store.java.controllers;

import java.util.List;

import com.store.java.entities.Employee;
import com.store.java.services.IEmployeeService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;






@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    private IEmployeeService service;

    @GetMapping("/employees")
    public List<Employee> getAll() {
        return service.getAll();
    }

    @GetMapping("/employees/{employeeID}")
    public ResponseEntity<Employee> getEmployeeByID(@PathVariable String employeeID) {
        try {
            Long idEmployee = Long.parseLong(employeeID);
            Employee response = service.getEmployee(idEmployee);
            if(response == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(response);
        } catch(NumberFormatException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @DeleteMapping("/employees/{employeeID}")
    public ResponseEntity<?> removeEmployee(@PathVariable String employeeID) {
        try {
            Long idEmployee = Long.parseLong(employeeID);
            Employee exist = service.getEmployee(idEmployee);
            if(exist.getName() != null) {
                service.removeEmployee(idEmployee);
                return ResponseEntity.ok("Employee deleted correctly");
            }
            return ResponseEntity.badRequest().body("This employee doesn't exist");
        } catch(NumberFormatException e) {
            return ResponseEntity.badRequest().body(null);
        } catch(NullPointerException e) {
            return ResponseEntity.badRequest().body("This employee doesn't exist");
        }
        
    }

    @PostMapping("/employees")
    public ResponseEntity<?> saveEmployee(@Validated @RequestBody Employee employeeContent) {
        service.saveEmployee(employeeContent);
        return ResponseEntity.ok("Employee saved successfully");
    }

    @PutMapping("/employees/{employeeID}")
    public ResponseEntity<?> updateEmployee(@PathVariable String employeeID, @Validated @RequestBody Employee employeeContent) {
        try {
            Long idEmployee = Long.parseLong(employeeID);
            Employee exist = service.getEmployee(idEmployee);
            if(exist.getName() != null) {
                service.updateEmployee(idEmployee, employeeContent);
                return ResponseEntity.ok("Employee updated correctly");
            }
            return ResponseEntity.badRequest().body("This employee doesn't exist");
        } catch(NumberFormatException e) {
            return ResponseEntity.badRequest().body(null);
        } catch(NullPointerException e) {
            return null;
        }
    }
    
}
