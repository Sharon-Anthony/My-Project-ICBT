package com.icbt.abcrestaurant.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.icbt.abcrestaurant.Model.Services;
import com.icbt.abcrestaurant.Service.ServicesService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class ServicesController {

    @Autowired
    private ServicesService servicesService;

    @GetMapping("/services") 
    public ResponseEntity<List<Services>> getAllServices() {
        return new ResponseEntity<>(servicesService.allServices(), HttpStatus.OK);
    }


@PostMapping("/services")
    public ResponseEntity<?> addService(@RequestPart Services services, @RequestPart MultipartFile imageFile) {
        try {
            Services service1 = servicesService.addService(services, imageFile); // Save user to database
            return new ResponseEntity<>(service1, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    
    @GetMapping("/services/{serviceId}")
    public ResponseEntity<Optional<Services>> getServiceById(@PathVariable int serviceId) {
        Optional<Services> serOptional = servicesService.getServiceById(serviceId);
        if (serOptional.isPresent()) {
            return new ResponseEntity<>(serOptional, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/services/{serviceId}/image")
    public ResponseEntity<byte[]> getImageByServiceId(@PathVariable int serviceId) {
        Optional<Services> serviceOptional = servicesService.getServiceById(serviceId);

        if (serviceOptional.isPresent()) {
            Services services = serviceOptional.get();
            byte[] imageFile = services.getImageData();
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf(services.getImageType()))
                    .body(imageFile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/services/{serviceId}")
    public ResponseEntity<String> updateService(@PathVariable int serviceId, @RequestPart("services") Services services, @RequestPart("imageFile") MultipartFile imageFile) {
        try {
            servicesService.updateService(serviceId, services, imageFile);
            return new ResponseEntity<>("Updated", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Service not Updated", HttpStatus.BAD_REQUEST);
        }
    }
 
    @DeleteMapping("/services/{serviceId}")
    public ResponseEntity<String> deleteService(@PathVariable int serviceId) {
        Optional<Services> services = servicesService.getServiceById(serviceId);
        if (services.isPresent()) {
            servicesService.deleteService(serviceId);
            return new ResponseEntity<>("Deleted Successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Service deletion failed", HttpStatus.NOT_FOUND);
        }
    }

   
}
