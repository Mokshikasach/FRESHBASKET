package com.app.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.OrderRepository;
import com.app.entities.OrderEntity;
import com.app.entities.Packate;
import com.app.entities.PaymentUpdatePackate;
import com.app.entities.User;
import com.app.exceptions.ResourceNotFoundException;
import com.app.service.IProductService;
import com.app.service.IUserService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@RestController
@CrossOrigin
@RequestMapping("/payment")
public class PaymentController {

	@Autowired
	private IUserService userService;
	
	
	@Autowired
	private OrderRepository orderRepo;
	
	@Autowired
	private IProductService productService;
	
	

	@PostMapping("/order")
	public String createOrder(@RequestBody Packate order) throws Exception {
		
		int amt = order.getAmount();
		
	System.err.println(order.getCreate());
	var client = 	new RazorpayClient("rzp_test_E4MkK7Plh7O8qI","R8oU0KDghQrGhRy7V6xxiXFF");
		
	JSONObject ob = new JSONObject();
	  ob.put("amount", amt);
	  ob.put("currency", "INR");
	  ob.put("receipt", "txn_255425");
	  
	  Order orderToRazorpay = client.Orders.create(ob);
	  
	    System.out.println(orderToRazorpay);
	    
	    OrderEntity orderEntity = new OrderEntity();
	    
	    orderEntity.setAmount(orderToRazorpay.get("amount"));
	    orderEntity.setOrderId(orderToRazorpay.get("id"));
	    orderEntity.setPaymentId(null);
	    orderEntity.setStatus("created");
	    orderEntity.setUser(userService.findUserById(order.getUserId()));
	    orderEntity.setDeliveryAddress(userService.findUserById(order.getUserId()).getAddress());
	    orderEntity.setReceipt(orderToRazorpay.get("receipt"));
	    orderEntity.setOrderDate(LocalDate.now());
	    LocalDate date = LocalDate.now();
	    orderEntity.setDeliveryDate(date.plusDays(2));
	     orderRepo.save(orderEntity);
	
		return orderToRazorpay.toString();
		
	}
	
	
	@PostMapping("/order/update")
	public ResponseEntity<?> updatePaymentSatus(@RequestBody PaymentUpdatePackate packate){
		
	  OrderEntity order = orderRepo.findByOrderId(packate.getOrder_id()).
			  orElseThrow(()-> new ResourceNotFoundException("Order With Id "+packate.getOrder_id()+" Not Found!!!"));
					 
	  order.setPaymentId(packate.getPayment_id());
	  order.setStatus(packate.getPayment_status().toString());
	  
	  OrderEntity updatedOrder = orderRepo.save(order);
		System.out.println(packate.toString());
		
		return ResponseEntity.ok("Order Updated Successfully!!!!"+updatedOrder.getId());
	}
	
	//get all users 
		@GetMapping("")
		public ResponseEntity<List<OrderEntity>>getAllOrder(){
			List<OrderEntity> orders = orderRepo.findAll();
			if(orders.isEmpty()) {
				throw new ResourceNotFoundException("Order List is Empty!!!");
			}
			return ResponseEntity.ok(orders);
		}
		
		@GetMapping("/{userId}")
		public ResponseEntity<List<OrderEntity>>getAllUserOrders(@PathVariable Long userId){
			User user = userService.findUserById(userId);
			List<OrderEntity> orders = orderRepo.findAllByUser(user);
			if(orders.isEmpty()) {
				throw new ResourceNotFoundException("Order List is Empty!!!");
			}
			return ResponseEntity.ok(orders);
		}
}

