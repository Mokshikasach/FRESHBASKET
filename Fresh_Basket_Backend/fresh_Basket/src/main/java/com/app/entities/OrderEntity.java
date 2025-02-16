package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="orders")
public class OrderEntity  extends BaseEntity{

	private String orderId;
	
	private String receipt;
	
	private String status;
	
	private int amount;
	
	private String paymentId;
	
	private LocalDate orderDate;
	
	private LocalDate deliveryDate;
	
	private String deliveryAddress;
	
	@ManyToOne
	@JsonIgnore
	private User user;
	

	
	
}