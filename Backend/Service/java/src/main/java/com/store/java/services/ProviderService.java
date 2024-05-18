package com.store.java.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.stereotype.Service;

import com.store.java.entities.Provider;
import com.store.java.repositories.ProviderRepository;

@Service
public class ProviderService implements IProviderService{

    @Autowired
    private ProviderRepository providerRepository;

    @Override
    public List<Provider> getAll() {
        return (List<Provider>)providerRepository.findAll();
    }

    @Override
    public Provider getProvider(Long providerID) {
        try {
            return providerRepository.findById(providerID).get();
        } catch(NoSuchElementException e){
            return null;
        }
    }

    @Override
    public void removeProvider(Long providerID) {
        try {
            providerRepository.deleteById(providerID);
        } catch(NoSuchElementException e){

        }
    }

    @Override
    public void saveProvider(Provider providerContent) {
        if(providerContent.getName() == null || providerContent.getLastname() == null || providerContent.getEmail() == null) {
            throw new IllegalArgumentException("Provider data is empty");
        }
        try {
            providerRepository.save(providerContent);
        } catch (HttpMessageNotReadableException e) {
            throw e;
        }
    }

    @Override
    public void updateProvider(Long providerID, Provider providerContent) {
        try {
            Provider providerFounded = providerRepository.findById(providerID).get();
            if (providerContent.getName() == null || providerContent.getLastname() == null || providerContent.getEmail() == null) {
                throw new IllegalArgumentException("Provider data is empty");
            }

            providerFounded.setName(providerContent.getName());
            providerFounded.setLastname(providerContent.getLastname());
            providerFounded.setEmail(providerContent.getEmail());
            providerFounded.setPhone(providerContent.getPhone());
            providerFounded.setAddress(providerContent.getAddress());
            providerFounded.setWeb(providerContent.getWeb());
            providerFounded.setContact(providerContent.getContact());
    
            providerRepository.save(providerFounded);
        } catch(NoSuchElementException e) {

        } catch (HttpMessageNotReadableException e) {
            throw new IllegalArgumentException(e);
        }
    }
}
