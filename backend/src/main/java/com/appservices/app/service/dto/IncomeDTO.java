package com.appservices.app.service.dto;

public class IncomeDTO {
	  private long id;
	    private String source;
	    private double amount;
	    private String date;
	    private String description;
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
