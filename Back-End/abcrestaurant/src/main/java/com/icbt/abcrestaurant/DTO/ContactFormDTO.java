package com.icbt.abcrestaurant.DTO;

public class ContactFormDTO {
    private String name;
    private String email;
    private String message;

    
    
    public ContactFormDTO() {
    }

    

    public ContactFormDTO(String name, String email, String message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }



    public String getName() {
        return name;
    }
    public String getEmail() {
        return email;
    }
    public String getMessage() {
        return message;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setMessage(String message) {
        this.message = message;
    }

    
}
