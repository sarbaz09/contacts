package com.contact.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.contact.entity.Contact;

public interface ContactRepository extends CrudRepository<Contact, Integer>{
	List<Contact> findByUserId(Integer userId);
	Contact findByContactNumber(String contactNumber);
}
