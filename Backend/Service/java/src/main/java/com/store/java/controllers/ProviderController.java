package com.store.java.controllers;

import java.util.List;

import com.store.java.entities.Provider;
import com.store.java.services.IProviderService;

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
public class ProviderController {

    @Autowired
    private IProviderService service;

    @GetMapping("/providers")
    public List<Provider> getAll() {
        return service.getAll();
    }

    @GetMapping("/providers/{providerID}")
    public ResponseEntity<Provider> getProviderByID(@PathVariable String providerID) {
        try {
            Long idProvider = Long.parseLong(providerID);
            Provider response = service.getProvider(idProvider);
            if(response == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(response);
        } catch(NumberFormatException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @DeleteMapping("/providers/{providerID}")
    public ResponseEntity<?> removeProvider(@PathVariable String providerID) {
        try {
            Long idProvider = Long.parseLong(providerID);
            Provider exist = service.getProvider(idProvider);
            if(exist.getName() != null) {
                service.removeProvider(idProvider);
                return ResponseEntity.ok("Provider deleted correctly");
            }
            return ResponseEntity.badRequest().body("This provider doesn't exist");
        } catch(NumberFormatException e) {
            return ResponseEntity.badRequest().body(null);
        } catch(NullPointerException e) {
            return ResponseEntity.badRequest().body("This provider doesn't exist");
        }
        
    }

    @PostMapping("/providers")
    public ResponseEntity<?> saveProvider(@Validated @RequestBody Provider providerContent) {
        service.saveProvider(providerContent);
        return ResponseEntity.ok("Provider saved successfully");
    }

    @PutMapping("/providers/{providerID}")
    public ResponseEntity<?> updateProvider(@PathVariable String providerID, @Validated @RequestBody Provider providerContent) {
        try {
            Long idProvider = Long.parseLong(providerID);
            Provider exist = service.getProvider(idProvider);
            if(exist.getName() != null) {
                service.updateProvider(idProvider, providerContent);
                return ResponseEntity.ok("Provider updated correctly");
            }
            return ResponseEntity.badRequest().body("This provider doesn't exist");
        } catch(NumberFormatException e) {
            return ResponseEntity.badRequest().body(null);
        } catch(NullPointerException e) {
            return null;
        }
    }
    
}
