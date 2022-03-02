package com.contact.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.contact.dto.ContactDto;
import com.contact.service.ContactService;

@CrossOrigin
@RestController
@RequestMapping("/contact")
public class ContactApi {
	@Autowired
	ContactService contactService;

	@GetMapping(value = "/{userId}")
	public ResponseEntity<List<ContactDto>> getContacts(@PathVariable("userId") String userId) {
		return new ResponseEntity<>(contactService.getContactList(userId),
				HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<String> registerUser(@RequestBody ContactDto contactDto) {
		return new ResponseEntity<>(contactService.addContact(contactDto), HttpStatus.OK);
	}

}
