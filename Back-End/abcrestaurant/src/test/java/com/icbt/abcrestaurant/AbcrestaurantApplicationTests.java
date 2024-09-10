package com.icbt.abcrestaurant;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.icbt.abcrestaurant.Controller.UserController;
import com.icbt.abcrestaurant.Model.User;
import com.icbt.abcrestaurant.Service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@SpringBootTest
class AbcrestaurantApplicationTests {

	@Mock
	private UserService userService;

	@InjectMocks
	private UserController userController;


	@Test
	void testAddUser() {
		User newUser = new User();
		newUser.setUsername("sharon");
		newUser.setEmail("sharonanthonty@gmail.com");
		newUser.setPassword("1234");
		newUser.setAddress("86/19, Silver smith lane Colombo-12");
		newUser.setPhoneNumber(775444649);
		
		when(userService.isEmailPresent(newUser.getEmail())).thenReturn(false);
		when(userService.addUser(any(User.class))).thenReturn(newUser);
		ResponseEntity<?> response = userController.addUser(newUser);
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		verify(userService, times(1)).addUser(newUser);
	}


	@Test
	void testAddUserEmailAlreadyExists() {
		User duplicateUser = new User();
		duplicateUser.setUsername("duplicate-user");
		duplicateUser.setEmail("sharonanthonty@gmail.com");
		duplicateUser.setPassword("1234");
		duplicateUser.setAddress("86/19, Silver smith lane Colombo-12");
		duplicateUser.setPhoneNumber(775444649);
	
    when(userService.isEmailPresent(duplicateUser.getEmail())).thenReturn(true);
    ResponseEntity<?> response = userController.addUser(duplicateUser);
    assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
    verify(userService, never()).addUser(any(User.class));
}


@Test
void testLoginUserSuccess() {
    User user = new User(null, "u001", "sharon", 
	"sharonanthonty@gmail.com", "1234", "86/19, Silver smith lane, colombo -12",
	 775444649);
    when(userService.getUser("sharonanthonty@gmail.com", "1234")).thenReturn(user);

    HttpServletRequest mockRequest = mock(HttpServletRequest.class);
    HttpSession mockSession = mock(HttpSession.class);
    when(mockRequest.getSession(true)).thenReturn(mockSession);

    ResponseEntity<?> response = userController.loginUser(user, mockRequest);
    assertEquals(HttpStatus.OK, response.getStatusCode());
    verify(mockSession, times(1)).setAttribute("user", user);
}



@Test
void testGetUserById() {
    User user = new User(null, "u001", "sharon", 
	"sharonanthonty@gmail.com", "1234", "86/19, Silver smith lane, colombo -12",
	 775444649);
    when(userService.getUserByUserId("u001")).thenReturn(Optional.of(user));

    ResponseEntity<Optional<User>> response = userController.getUserByUserId("u001");
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertTrue(response.getBody().isPresent());
}

@Test
void testDeleteUserSuccess() {
	User user = new User(null, "u001", "sharon", 
	"sharonanthonty@gmail.com", "1234", "86/19, Silver smith lane, colombo -12",
	 775444649);
	String userId = "u001";

    when(userService.getUserByUserId(userId)).thenReturn(Optional.of(user));
    doNothing().when(userService).deleteUserById(userId);

    ResponseEntity<?> response = userController.deleteUser(userId);
    assertEquals(HttpStatus.OK, response.getStatusCode());
    verify(userService, times(1)).deleteUserById(userId);
}


@Test
void testUpdateUserSuccess() {
	User existingUser = new User(null, "u001", "sharon", 
	"sharonanthonty@gmail.com", "1234", "86/19, Silver smith lane, colombo -12",
	 775444649);
	String userId = "u001";
   User updatedUser = new User(null, "u001", "updated-sharon", 
   "updated-sharonanthonty@gmail.com", "updated-1234", "updated-86/19, Silver smith lane, colombo -12",
	775444649);

    when(userService.getUserByUserId(userId)).thenReturn(Optional.of(existingUser));
    when(userService.updateUser(userId, updatedUser)).thenReturn(updatedUser);

    ResponseEntity<?> response = userController.updateUser(userId, updatedUser);
    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(updatedUser.getUsername(), ((User)response.getBody()).getUsername());
}


}
