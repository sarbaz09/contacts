package com.contact.dto;

import com.contact.entity.Contact;

public class ContactDto {

	private Integer contactId;
	private String contactName;
	private String contactNumber;
	private String contactEmail;
	private Integer userId;

	public Integer getContactId() {
		return contactId;
	}

	public void setContactId(Integer contactId) {
		this.contactId = contactId;
	}

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getContactEmail() {
		return contactEmail;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	
	public static ContactDto getContactDto(Contact contact) {
		ContactDto contactDto=new ContactDto();
		contactDto.setContactEmail(contact.getContactEmail());
		contactDto.setContactId(contact.getContactId());
		contactDto.setContactName(contact.getContactName());
		contactDto.setContactNumber(contact.getContactNumber());
		contactDto.setUserId(contact.getUserId());
		return contactDto;
	}

}
