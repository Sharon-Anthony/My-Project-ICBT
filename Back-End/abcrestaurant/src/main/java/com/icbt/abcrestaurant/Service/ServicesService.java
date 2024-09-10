package com.icbt.abcrestaurant.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.icbt.abcrestaurant.Model.Services;
import com.icbt.abcrestaurant.Repository.ServicesRepository;

@Service
public class ServicesService {

    @Autowired
    private ServicesRepository servicesRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    public List<Services> allServices() {
        return servicesRepository.findAll();
    }

    

    public Services addService(Services services, MultipartFile imageFile) {
        services.setImageName(imageFile.getName());
        services.setImageType(imageFile.getContentType());
        try {
            services.setImageData(imageFile.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        services.setServiceId(generateServiceId());

        return servicesRepository.save(services); 
    }
    
    private int generateServiceId() {
        long count = servicesRepository.count();
        return (int) (count+1);
    }

    public Optional<Services> getServiceById(int serviceId) {
        return servicesRepository.findByServiceId(serviceId);

    }
    public void updateService(int serviceId, Services services, MultipartFile imageFile) {
        Optional<Services> existingServices = servicesRepository.findByServiceId(serviceId);
        if (!existingServices.isPresent()) {
            throw new RuntimeException("Service Not Found");
        }
    
        Services updatedServices = existingServices.get();
        updatedServices.setServiceId(services.getServiceId());
        updatedServices.setServiceName(services.getServiceName());
        updatedServices.setDescription(services.getDescription());
        updatedServices.setPrice(services.getPrice());  // Correctly setting price
        updatedServices.setInstructions(services.getInstructions());
    
        // Handle image file
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                updatedServices.setImageName(imageFile.getOriginalFilename());
                updatedServices.setImageType(imageFile.getContentType());
                updatedServices.setImageData(imageFile.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error processing image file", e);
            }
        }
    
        servicesRepository.save(updatedServices);
    }



    public void deleteService(int serviceId) {
        servicesRepository.deleteByServiceId(serviceId);
    }
    


   
   
    
}
