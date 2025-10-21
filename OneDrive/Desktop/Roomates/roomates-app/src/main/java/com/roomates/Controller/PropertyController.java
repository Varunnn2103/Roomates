package com.roomates.Controller;

import com.roomates.Model.Property;
import com.roomates.Repository.PropertyRepository;
import org.springframework.http.HttpStatus; // Import
import org.springframework.http.ResponseEntity; // Import
import com.roomates.Service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.security.Principal;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/properties") // Base URL for all endpoints in this file
// This next line is CRITICAL. It allows your React app (on localhost:5173)
// to call your Java server (on localhost:8080).

public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private PropertyRepository propertyRepository;

    // GET /api/properties
    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/my-properties")
    public ResponseEntity<List<Property>> getMyProperties(Principal principal) {
        if (principal == null) {
            // This shouldn't be hit if security is right, but it's good practice
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = principal.getName();

        // You'll need to inject your PropertyRepository for this to work
        List<Property> myProperties = propertyRepository.findAll().stream()
                .filter(prop -> prop.getOwnerEmail() != null && prop.getOwnerEmail().equals(email))
                .collect(Collectors.toList());

        return ResponseEntity.ok(myProperties);
    }

    // GET /api/properties/search?city=Mumbai&maxPrice=20000
    @GetMapping("/search")
    public List<Property> searchProperties(
            @RequestParam String city,
            @RequestParam double maxPrice) {
        return propertyService.searchProperties(city, maxPrice);
    }


    @PostMapping
    public Property createProperty(@RequestBody Property property, Principal principal) {
        // Get the email from the authenticated user
        String ownerEmail = principal.getName();

        // Set the owner's email on the property
        property.setOwnerEmail(ownerEmail);

        // Save it
        return propertyService.createProperty(property);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(
            @PathVariable Long id,
            @RequestBody Property updatedProperty,
            Principal principal) {

        if (principal == null || !propertyService.isUserOwner(principal.getName(), id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Not the owner
        }

        // Find the existing property
        return propertyRepository.findById(id)
                .map(property -> {
                    // Update the fields
                    property.setTitle(updatedProperty.getTitle());
                    property.setCity(updatedProperty.getCity());
                    property.setPrice(updatedProperty.getPrice());
                    property.setType(updatedProperty.getType());
                    property.setAvailability(updatedProperty.isAvailability());
                    // (We don't let them change the owner)

                    Property savedProperty = propertyRepository.save(property);
                    return ResponseEntity.ok(savedProperty);
                })
                .orElse(ResponseEntity.notFound().build()); // Property not found
    }

    // --- ADD THIS ENDPOINT ---
    // DELETE /api/properties/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable Long id, Principal principal) {
        if (principal == null || !propertyService.isUserOwner(principal.getName(), id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        if (!propertyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        propertyRepository.deleteById(id);
        return ResponseEntity.ok("Property deleted successfully");
    }
}