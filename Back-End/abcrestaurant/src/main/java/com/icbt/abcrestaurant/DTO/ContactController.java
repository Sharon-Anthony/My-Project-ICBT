package com.icbt.abcrestaurant.DTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/contact/send")
    public String sendEmail(@RequestBody ContactFormDTO contactFormDTO) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("sfsxxt@gmail.com"); 
            message.setSubject("Contact Form Submission from " + contactFormDTO.getName()); // Set the subject
            message.setText(contactFormDTO.getMessage());
            message.setFrom(contactFormDTO.getEmail()); 
            mailSender.send(message);
            return "Email sent successfully!";
        } catch (Exception e) {
            return "Error while sending email: " + e.getMessage();
        }
    }
}
