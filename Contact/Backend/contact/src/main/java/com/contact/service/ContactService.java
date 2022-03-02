package com.contact.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.contact.dto.ContactDto;
import com.contact.entity.Contact;
import com.contact.repository.ContactRepository;

@Service(value = "contactService")
@Transactional
public class ContactService {
	
	@Autowired
	ContactRepository contactRepository;
	
	public List<ContactDto> getContactList(String userId) {
		List<Contact> contacts = contactRepository.findByUserId(Integer.valueOf(userId));
		if (contacts == null || contacts.isEmpty()) {
			return null;
		}
		List<ContactDto> contactsDto = contacts.stream().map(c->ContactDto.getContactDto(c)).collect(Collectors.toList());
		return contactsDto;
	}

	public String addContact(ContactDto contactDto) {
		Contact contactDb = contactRepository.findByContactNumber(contactDto.getContactNumber());
		if (contactDb != null) {
			return "Contact already exists";
		}
		Contact contact = new Contact();
		contact.setContactEmail(contactDto.getContactEmail());
		contact.setContactName(contactDto.getContactName());
		contact.setContactNumber(contactDto.getContactNumber());
		contact.setUserId(contactDto.getUserId());
		contactRepository.save(contact);
		return "Contact registered successfully, Contact Name: " + contact.getContactName();
	}
}
