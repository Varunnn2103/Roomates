package com.roomates.Controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.roomates.Repository.PropertyRepository;
import com.roomates.Service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
public class ImageUploadController {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private PropertyRepository propertyRepository;

    @PostMapping("/property/{id}")
    public ResponseEntity<?> uploadPropertyImage(
            @PathVariable Long id,
            @RequestParam("image") MultipartFile file,
            Principal principal) {

        // 1. Check if user is the owner
        if (principal == null || !propertyService.isUserOwner(principal.getName(), id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not the owner of this property");
        }

        try {
            // 2. Upload the file to Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

            // 3. Get the new URL
            String imageUrl = (String) uploadResult.get("secure_url");

            // 4. Find the property and save the URL
            return propertyRepository.findById(id)
                    .map(property -> {
                        property.setImageUrl(imageUrl);
                        propertyRepository.save(property);
                        return ResponseEntity.ok(property);
                    })
                    .orElse(ResponseEntity.notFound().build());

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
        }
    }
}