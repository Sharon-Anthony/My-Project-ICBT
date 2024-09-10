package com.icbt.abcrestaurant.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "services")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Services {
     @Id
    private ObjectId id;
    private int serviceId;
    private String serviceName;
    private String description;
    private int price;
    private String instructions;
    private String imageName;
    private String imageType;
    private byte[] imageData;
}
