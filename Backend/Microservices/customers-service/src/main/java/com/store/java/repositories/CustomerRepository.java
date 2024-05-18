package com.store.java.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.store.java.entities.Customer;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long>{
    
}
