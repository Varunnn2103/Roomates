package com.roomates.Controller;


import com.roomates.Model.User;
import com.roomates.Repository.UserRepository;
import com.roomates.Role;
import com.roomates.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth") // Allow React to call
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    record LoginRequest(String email, String password) {}
    record AuthResponse(String token) {}

    // We need a simple DTO (Data Transfer Object) to get the request body
    record RegisterRequest(String name, String email, String password) {}

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {

        // Check if user already exists
        if (userRepository.findByEmail(request.email()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is already taken!");
        }

        // Create new user's account
        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password())); // HASH the password!
        user.setRole(Role.USER); // Default to USER

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
    // --- ADD THE NEW /login ENDPOINT ---
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        try {
            // 1. Let Spring Security try to authenticate
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
            );

            // 2. If successful, get the user details
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // 3. Generate a JWT token
            String token = jwtService.generateToken(userDetails);

            // 4. Send the token back
            return ResponseEntity.ok(new AuthResponse(token));

        } catch (Exception e) {
            // 5. If authentication fails, send a 401 Unauthorized
            return ResponseEntity.status(401).body("Error: Invalid email or password");
        }
    }
}
    // We will build the /login endpoint in the next step when we add JWTs.
    // For now, test /register