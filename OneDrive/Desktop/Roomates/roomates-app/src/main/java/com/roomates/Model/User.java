package com.roomates.Model;

import com.roomates.Role;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "_user") // "_user" because "user" is often a reserved keyword in SQL
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    @Column(unique = true) // No two users can have the same email
    private String email;
    private String password;

    @Enumerated(EnumType.STRING) // Stores the role as a string (e.g., "USER")
    private Role role;

    // --- Boilerplate for Spring Security ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return this.email; // We use email as the username
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }

    // --- Getters & Setters ---
    // (Generate them: Right-click -> Generate...)

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}