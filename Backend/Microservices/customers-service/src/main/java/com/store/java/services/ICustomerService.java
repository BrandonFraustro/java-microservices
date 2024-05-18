package com.store.java.services;

import java.util.List;

import com.store.java.entities.Customer;

public interface ICustomerService {

    List<Customer> getAll();

    Customer getCustomer(Long customerID);

    void removeCustomer(Long customerID);

    void saveCustomer(Customer customerContent);

    void updateCustomer(Long customerID, Customer customerContent);
}
