package com.roomates.Model;

import jakarta.persistence.Entity; // For database entities
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity // Tells JPA this class is a table in the database
public class Property {

    @Id // Marks this as the Primary Key
    @GeneratedValue // Auto-increments the ID
    private Long id;

    private String title;
    private String city;
    private double price;
    private boolean availability;
    private String type; // e.g., "PG" or "FLAT"
    private String ownerEmail;
    private String imageUrl;

    // --- Getters and Setters ---
    // You need these so Spring can read/write the private fields.
    // (In IntelliJ, right-click -> Generate -> Getters and Setters -> Select All)

    public Long getId() { return id; }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }

    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    // ... add the rest for city, price, etc. ...
}