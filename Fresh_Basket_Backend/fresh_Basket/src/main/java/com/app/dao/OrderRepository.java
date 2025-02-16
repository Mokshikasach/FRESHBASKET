package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.OrderEntity;
import com.app.entities.User;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
	
Optional<OrderEntity> findByOrderId(String orderId);
	
	List<OrderEntity> findAllByUser(User user);

}