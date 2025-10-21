package com.roomates.Service;

import com.roomates.Model.Property;
import com.roomates.Repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service // Marks this as a Spring service (business logic)
public class PropertyService {

    @Autowired // Auto-connects this to the repository
    private PropertyRepository propertyRepository;

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property createProperty(Property property) {
        // You could add validation logic here
        return propertyRepository.save(property);
    }

    public List<Property> searchProperties(String city, double maxPrice) {
        return propertyRepository.findByCityAndPriceLessThan(city, maxPrice);
    }
    public boolean isUserOwner(String email, Long propertyId) {
        Optional<Property> property = propertyRepository.findById(propertyId);
        if (property.isEmpty()) {
            return false; // Property doesn't exist
        }
        return property.get().getOwnerEmail().equals(email);
    }
}