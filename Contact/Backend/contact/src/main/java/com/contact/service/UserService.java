package com.contact.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.contact.dto.UserDto;
import com.contact.entity.User;
import com.contact.exception.ContactException;
import com.contact.repository.UserRepository;

@Service(value = "userService")
@Transactional
public class UserService {
	@Autowired
	UserRepository userRepository;

	public UserDto authenticateUser(String userEmail, String password) throws ContactException {
		User user = userRepository.findByUserEmail(userEmail);
		if (user == null) {
			throw new ContactException("Invalid username or password");
		}
		String dbPassword = user.getPassword();
		if (dbPassword != null && dbPassword.equals(password)) {
			UserDto userDto = new UserDto();
			userDto.setUserEmail(user.getUserEmail());
			userDto.setPassword(dbPassword);
			userDto.setSecret(user.getSecret());
			userDto.setUserId(user.getUserId());
			userDto.setUserName(user.getUserName());
			return userDto;
		}else{
			throw new ContactException("Invalid username or password");
		}
	}

	public String registerUser(UserDto userDto) throws ContactException {
		User user = userRepository.findByUserEmail(userDto.getUserEmail());
		if (user != null) {
			throw new ContactException("User already exists");
		}
		User u = new User();
		u.setUserEmail(userDto.getUserEmail());
		u.setPassword(userDto.getPassword());
		u.setSecret(userDto.getSecret());
		u.setUserName(userDto.getUserName());
		userRepository.save(u);
		return "User registered successfully, User Name: " + userDto.getUserName();
	}

}
