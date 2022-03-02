package com.contact.repository;

import org.springframework.data.repository.CrudRepository;

import com.contact.entity.User;

public interface UserRepository extends CrudRepository<User, Integer>{
	User findByUserEmail(String userEmail);
}
