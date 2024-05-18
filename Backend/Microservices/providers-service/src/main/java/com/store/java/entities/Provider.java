package com.store.java.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "providers")
@Getter @Setter
@ToString
@EqualsAndHashCode
public class Provider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long providerID;
    private String name;    
    private String lastname;    
    private String email;    
    private String phone;    
    private String address; 
    private String web; 
    private String contact; 
}

