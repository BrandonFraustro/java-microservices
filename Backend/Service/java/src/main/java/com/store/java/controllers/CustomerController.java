package com.store.java.controllers;

import java.util.List;

import com.store.java.entities.Customer;
import com.store.java.services.ICustomerService;

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
public class CustomerController {

    @Autowired
    private ICustomerService service;

    @GetMapping("/customers")
    public List<Customer> getAll() {
        return service.getAll();
    }

    @GetMapping("/customers/{customerID}")
    public ResponseEntity<Customer> getCustomerByID(@PathVariable String customerID) {
        try {
            Long idCustomer = Long.parseLong(customerID);
            Customer response = service.getCustomer(idCustomer);
            if(response == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(response);
        } catch(NumberFormatException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @DeleteMapping("/customers/{customerID}")
    public ResponseEntity<?> removeCustomer(@PathVariable String customerID) {
        try {
            Long idCustomer = Long.parseLong(customerID);
            Customer exist = service.getCustomer(idCustomer);
            if(exist.getName() != null) {
                service.removeCustomer(idCustomer);
                return ResponseEntity.ok("Customer deleted correctly");
            }
            return ResponseEntity.badRequest().body("This customer doesn't exist");
        } catch(NumberFormatException e) {
            return ResponseEntity.badRequest().body(null);
        } catch(NullPointerException e) {
            return ResponseEntity.badRequest().body("This customer doesn't exist");
        }
        
    }

    @PostMapping("/customers")
    public ResponseEntity<?> saveCustomer(@Validated @RequestBody Customer customerContent) {
        service.saveCustomer(customerContent);
        return ResponseEntity.ok("Customer saved successfully");
    }

    @PutMapping("/customers/{customerID}")
    public ResponseEntity<?> updateCustomer(@PathVariable String customerID, @Validated @RequestBody Customer customerContent) {
        try {
            Long idCustomer = Long.parseLong(customerID);
            Customer exist = service.getCustomer(idCustomer);
            if(exist.getName() != null) {
                service.updateCustomer(idCustomer, customerContent);
                return ResponseEntity.ok("Customer updated correctly");
            }
            return ResponseEntity.badRequest().body("This customer doesn't exist");
        } catch(NumberFormatException e) {
            return ResponseEntity.badRequest().body(null);
        } catch(NullPointerException e) {
            return null;
        }
    }
    
}
