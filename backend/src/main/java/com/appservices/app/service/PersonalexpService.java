package com.appservices.app.service;

import java.util.List;
import java.util.Map;

import com.appservices.app.model.Expense;
import com.appservices.app.model.Income;
import com.appservices.app.service.dto.ExpenseDTO;
import com.appservices.app.service.dto.IncomeDTO;
import com.appservices.app.service.dto.PersonalexpDTO;


public interface PersonalexpService {
	public Map<String , Object> saveuser(PersonalexpDTO personalexpDTO);
	public Map<String , Object> login (String email , String password);
	public Map<String , Object> income (IncomeDTO incomeDTO);
	public List<Income> getIncome(Long userid);
	public double getTotalIncome(long userId);
	public Map<String , Object> expense (ExpenseDTO expenseDTO);
	public List<Expense> getExpense(Long userId);
	public List<Map<String, Object>> getRecentTransactions(Long userId);
	public String updateProfile(Long id , String name , String email);
	public String updatePassword(Long id , String currentPassword , String newPassword);
}
