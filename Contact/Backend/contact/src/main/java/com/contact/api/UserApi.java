package com.contact.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.contact.dto.UserDto;
import com.contact.exception.ContactException;
import com.contact.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserApi {
	@Autowired
	UserService userService;

	@PostMapping(value = "/userLogin")
	public ResponseEntity<UserDto> authenticateUser(@RequestBody UserDto user) {
		try {
			return new ResponseEntity<>(userService.authenticateUser(user.getUserEmail(), user.getPassword()),
					HttpStatus.OK);
		} catch (ContactException e) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,e.getMessage());
		}
	}

	@PostMapping(value = "/userRegister")
	public ResponseEntity<String> registerUser(@RequestBody UserDto user) {
		try {
			return new ResponseEntity<>(userService.registerUser(user), HttpStatus.OK);
		} catch (ContactException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
		}
	}

}
