package com.icbt.abcrestaurant.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.icbt.abcrestaurant.Model.User;
import com.icbt.abcrestaurant.Service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
@CrossOrigin(origins = "http://localhost:5173" , allowCredentials = "true")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUser() {
        return new ResponseEntity<>(userService.getAllUser(), HttpStatus.OK);
    }

    @PostMapping("/user")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        try {
            if (userService.isEmailPresent(user.getEmail())) {
                return new ResponseEntity<>("Email already exists", HttpStatus.CONFLICT);
            }

            User savedUser = userService.addUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/staff")
    public ResponseEntity<?> addStaff(@RequestBody User user) {
        try {
            if (userService.isEmailPresent(user.getEmail())) {
                return new ResponseEntity<>("Email already exists", HttpStatus.CONFLICT);
            }

            User savedUser = userService.addStaff(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @PostMapping("/admin")
    public ResponseEntity<?> addAdmin(@RequestBody User user) {
        try {
            if (userService.isEmailPresent(user.getEmail())) {
                return new ResponseEntity<>("Email already exists", HttpStatus.CONFLICT);
            }

            User savedUser = userService.addAdmin(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Optional<User>> getUserByUserId(@PathVariable String userId) {
        Optional<User> user = userService.getUserByUserId(userId);
        if (user.isPresent()) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user, HttpServletRequest request) {
        try {
            User user1 = userService.getUser(user.getEmail(), user.getPassword());
    
            HttpSession oldSession = request.getSession(false);
            if (oldSession != null) {
                oldSession.invalidate();
            }
    
             HttpSession newSession = request.getSession(true);
            newSession.setAttribute("user", user1);
            newSession.setMaxInactiveInterval(1800); // 30 minutes
    
            return new ResponseEntity<>(user1, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
    

   @PostMapping("/logout")
public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
    HttpSession session = request.getSession(false);
    if (session != null) {
        session.invalidate();
    }
    return ResponseEntity.ok().build();
}

@GetMapping("/checkSession")
public ResponseEntity<?> checkSession(HttpSession session) {
    User user = (User) session.getAttribute("user");
    if (user != null) {
        return new ResponseEntity<>(user, HttpStatus.OK);
    } else {
        return new ResponseEntity<>("No active session", HttpStatus.UNAUTHORIZED);
    }
}

@PutMapping("/user/{id}")
public ResponseEntity<?> updateUser(@PathVariable("id") String id, @RequestBody User user) {
    try {
        Optional<User> existingUserOpt = userService.getUserByUserId(id);
        if (!existingUserOpt.isPresent()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        User updatedUser = userService.updateUser(id, user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@GetMapping("/staff/count")
public ResponseEntity<Long> getUserCount() {
    long count = userService.count();
    return new ResponseEntity<>(count, HttpStatus.OK);
}

@DeleteMapping("/user/{userId}")
public ResponseEntity<?> deleteUser(@PathVariable("userId") String userId) {
    try {
        Optional<User> existingUserOpt = userService.getUserByUserId(userId);
        if (!existingUserOpt.isPresent()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        userService.deleteUserById(userId);
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    } catch (Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


}
