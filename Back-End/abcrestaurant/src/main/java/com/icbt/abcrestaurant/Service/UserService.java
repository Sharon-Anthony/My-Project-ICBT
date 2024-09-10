package com.icbt.abcrestaurant.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.icbt.abcrestaurant.Model.User;
import com.icbt.abcrestaurant.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private  UserRepository userRepository;
    
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public User addUser(User user) {
        user.setUserId(generateUserId());
        return userRepository.save(user);
    }

    public User updateUser(String userId, User user) {
        User existingUser = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setAddress(user.getAddress());
        existingUser.setPhoneNumber(user.getPhoneNumber());
        
        return userRepository.save(existingUser);
    }

    public void deleteUserById(String userId) {
        userRepository.deleteByUserId(userId);
    }

    private String generateUserId() {
        long count = userRepository.count();
        return String.format("u%03d", count + 1);
    }

    public User addStaff(User user) {
        user.setUserId(generateStaffId());
        return userRepository.save(user);
    }

    private String generateStaffId() {
        long count = userRepository.count();
        return String.format("s%03d", count + 1);
    }

    public User addAdmin(User user) {
        user.setUserId(generateAdminId());
        return userRepository.save(user);
    }

    private String generateAdminId() {
        long count = userRepository.count();
        return String.format("a%03d", count + 1);
    }

    public Optional<User> getUserByUserId(String userId) {
     return userRepository.findByUserId(userId);
    }

    

    public boolean isEmailPresent(String email) {
        return userRepository.existsByEmail(email);
    }

    public User getUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if(userOptional.isPresent()){
            if(!userOptional.get().getPassword().equals(password)){
                throw new IllegalStateException("password is not correct for email: "+ email);
            }
        }else{
            throw new IllegalStateException("email: " + email + " is not present");
        }
        return userOptional.get();
    }

   

    

    public long count() {
        return userRepository.count();
    }

    

    
    
}