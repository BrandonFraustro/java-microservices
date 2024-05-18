package com.store.java.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.stereotype.Service;

import com.store.java.entities.Customer;
import com.store.java.repositories.CustomerRepository;

@Service
public class CustomerService implements ICustomerService{

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<Customer> getAll() {
        return (List<Customer>)customerRepository.findAll();
    }

    @Override
    public Customer getCustomer(Long customerID) {
        try {
            return customerRepository.findById(customerID).get();
        } catch(NoSuchElementException e){
            return null;
        }
    }

    @Override
    public void removeCustomer(Long customerID) {
        try {
            customerRepository.deleteById(customerID);
        } catch(NoSuchElementException e){

        }
    }

    @Override
    public void saveCustomer(Customer customerContent) {
        if(customerContent.getName() == null || customerContent.getLastname() == null || customerContent.getEmail() == null) {
            throw new IllegalArgumentException("Customer data is empty");
        }
        try {
            customerRepository.save(customerContent);
        } catch (HttpMessageNotReadableException e) {
            throw e;
        }
    }

    @Override
    public void updateCustomer(Long customerID, Customer customerContent) {
        try {
            Customer customerFounded = customerRepository.findById(customerID).get();
            if (customerContent.getName() == null || customerContent.getLastname() == null || customerContent.getEmail() == null) {
                throw new IllegalArgumentException("Customer data is empty");
            }

            customerFounded.setName(customerContent.getName());
            customerFounded.setLastname(customerContent.getLastname());
            customerFounded.setEmail(customerContent.getEmail());
            customerFounded.setPhone(customerContent.getPhone());
            customerFounded.setAddress(customerContent.getAddress());
    
            customerRepository.save(customerFounded);
        } catch(NoSuchElementException e) {

        } catch (HttpMessageNotReadableException e) {
            throw new IllegalArgumentException(e);
        }
    }
}
