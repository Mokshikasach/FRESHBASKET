package com.app.dto;

import javax.persistence.Column;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserLoginResponse {
	
	private long id;
	
    private String name;
    
    private String role;
    
    private String pin;
	
	private String address;
	
	private String city;
    
   
}
