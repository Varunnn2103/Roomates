package com.roomates.Repository;

import com.roomates.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // This will let Spring Data JPA find a user by their email
    Optional<User> findByEmail(String email);
}