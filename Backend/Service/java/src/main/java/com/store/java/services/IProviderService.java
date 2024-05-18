package com.store.java.services;

import java.util.List;

import com.store.java.entities.Provider;

public interface IProviderService {

    List<Provider> getAll();

    Provider getProvider(Long providerID);

    void removeProvider(Long providerID);

    void saveProvider(Provider providerContent);

    void updateProvider(Long providerID, Provider providerContent);
}
