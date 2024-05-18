package com.store.java.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.store.java.entities.Provider;

@Repository
public interface ProviderRepository extends CrudRepository<Provider, Long>{
    
}
