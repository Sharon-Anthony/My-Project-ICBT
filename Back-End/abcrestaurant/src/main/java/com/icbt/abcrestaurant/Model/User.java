package com.icbt.abcrestaurant.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Document(collection = "user")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    private ObjectId objectId;
    private String userId;
    private String username;
    private String email;
    private String password;
    private String address;
    private int phoneNumber;


}
