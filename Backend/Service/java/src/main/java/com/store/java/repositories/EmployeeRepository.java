package com.store.java.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.store.java.entities.Employee;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long>{
    
}
