package com.appservices.app.service;

import com.appservices.app.repository.ExpenseRepository;
import com.appservices.app.repository.IncomeRepository;
import com.appservices.app.repository.PersonalexpRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.appservices.app.model.Expense;
import com.appservices.app.model.Income;
import com.appservices.app.model.Personalexp;
import com.appservices.app.service.dto.ExpenseDTO;
import com.appservices.app.service.dto.IncomeDTO;
import com.appservices.app.service.dto.PersonalexpDTO;

@Service
public class PersonalexpServiceImpl implements PersonalexpService {
	private final PersonalexpRepository personalexpRepository;
	private final IncomeRepository incomeRepository;
	private final ExpenseRepository expenseRepository;
	PersonalexpServiceImpl(PersonalexpRepository personalexpRepository , IncomeRepository incomeRepository , ExpenseRepository expenseRepository) {
		this.personalexpRepository = personalexpRepository;
		this.incomeRepository = incomeRepository;
		this.expenseRepository = expenseRepository;
	}

	@Override
	public Map<String, Object> saveuser(PersonalexpDTO personalexpDTO) {
		Personalexp personalexp = new Personalexp();
		personalexp.setId(personalexpDTO.getId());
		personalexp.setName(personalexpDTO.getName());
		personalexp.setEmail(personalexpDTO.getEmail());
		personalexp.setPassword(personalexpDTO.getPassword());
		personalexpRepository.save(personalexp);
		return null;

	}

	@Override
	public Map<String , Object> login(String email, String password) {

		Optional<Personalexp> user = personalexpRepository.findByEmail(email);
		Map<String , Object> response = new java.util.HashMap<>();

		if (user.isEmpty()) {
			response.put("message" , "Please Signup First ");
			return response;
		}

		if (user.get().getPassword().equals(password)) {
			response.put("message", "Login Successfully");
			response.put("name", user.get().getName());
			response.put("userid", user.get().getId());
			return response;
		}

		response.put("message", "Invalid Credentials");
		return response;
	}

	@Override
	public Map<String, Object> income(IncomeDTO incomeDTO) {
		Income income = new Income();
		income.setId(incomeDTO.getId());
		income.setSource(incomeDTO.getSource());
		income.setAmount(incomeDTO.getAmount());
		income.setDate(incomeDTO.getDate());
		income.setDescription(incomeDTO.getDescription());
		income.setUserId(incomeDTO.getUserId());
		incomeRepository.save(income);
		return null;
	}

	@Override
	public List<Income> getIncome(Long userid) {
		return incomeRepository.findByUserId(userid);
	}

	@Override
	public double getTotalIncome(long userId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Map<String, Object> expense(ExpenseDTO expenseDTO) {
		Expense expense = new Expense();
		expense.setId(expenseDTO.getId());
		expense.setCategory(expenseDTO.getCategory());
		expense.setAmount(expenseDTO.getAmount());
		expense.setDate(expenseDTO.getDate());
		expense.setPaymethod(expenseDTO.getPaymethod());
		expense.setDescription(expenseDTO.getDescription());
		expense.setUserId(expenseDTO.getUserId());
		expenseRepository.save(expense);
		return null;
	}

	@Override
	public List<Expense> getExpense(Long userId) {
		return expenseRepository.findByUserId(userId);
	}

	@Override
	public List<Map<String, Object>> getRecentTransactions(Long userId) {
		List<Map<String , Object>> transactions = new java.util.ArrayList<>();
		List<Income> incomes = incomeRepository.findByUserId(userId);
		for(Income income : incomes) {
			Map<String , Object> transaction = new java.util.HashMap<>();
			transaction.put("type", "INCOME");
			transaction.put("source", income.getSource());
			transaction.put("amount", income.getAmount());
			transaction.put("date", income.getDate());
			transactions.add(transaction);
			
		}
		List<Expense> expenses = expenseRepository.findByUserId(userId);

		for (Expense expense : expenses) {

			Map<String, Object> transaction = new java.util.HashMap<>();

			transaction.put("source", expense.getCategory());
			transaction.put("amount", expense.getAmount());
			transaction.put("date", expense.getDate());
			transaction.put("type", "EXPENSE");

			transactions.add(transaction);
		}
		 transactions.sort((a, b) ->
	        ((String) b.get("date")).compareTo((String) a.get("date"))
	    );
	    if (transactions.size() > 5) {
	        return transactions.subList(0, 5);
	    }
		return transactions;
	}

	public String updateProfile(Long id, String name , String email) {
	  Personalexp user = personalexpRepository.findById(id).orElseThrow(()-> new RuntimeException("User Not Found"));
	  boolean updated = false;

	    if (name != null && !name.trim().isEmpty()) {
	        user.setName(name);
	        updated = true;
	    }

	    if (email != null && !email.trim().isEmpty()) {
	        user.setEmail(email);
	        updated = true;
	    }

	    if (!updated) {
	        return "Please enter a name or email";
	    }

	    personalexpRepository.save(user);

	    return "Profile Updated Successfully";
	}

	@Override
	public String updatePassword(Long id, String currentPassword, String newPassword) {
		Personalexp user = personalexpRepository.findById(id).orElseThrow(()-> new RuntimeException("User Not Found"));
		if(!user.getPassword().equals(currentPassword)) {
			return "Invalid Current Password";
		}
		user.setPassword(newPassword);
		personalexpRepository.save(user);
		return "Password Updated";
	}
}
