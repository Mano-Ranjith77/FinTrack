package com.appservices.app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name="income")
public class Income {
        @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private long id;
        @Column(nullable = false)
	    private String source;
        @Column(nullable = false)
	    private double amount;
        @Column
	    private String date;
        @Column
	    private String description;
        @Column(nullable = false)
	    private long userId;
        
		public long getId() {
			return id;
		}
		public void setId(long id) {
			this.id = id;
		}
		public String getSource() {
			return source;
		}
		public void setSource(String source) {
			this.source = source;
		}
		public double getAmount() {
			return amount;
		}
		public void setAmount(double amount) {
			this.amount = amount;
		}
		public String getDate() {
			return date;
		}
		public void setDate(String date) {
			this.date = date;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public long getUserId() {
			return userId;
		}
		public void setUserId(long userId) {
			this.userId = userId;
		}
										
	    
	    

	}
