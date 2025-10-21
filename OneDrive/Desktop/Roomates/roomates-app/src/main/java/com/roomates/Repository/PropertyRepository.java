package com.roomates.Repository;

import com.roomates.Model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// We get .save(), .findById(), .findAll() for free!
public interface PropertyRepository extends JpaRepository<Property, Long> {

    // Spring Data JPA is smart. It will automatically create
    // a query based on the method name.
    List<Property> findByCityAndPriceLessThan(String city, double maxPrice);
}