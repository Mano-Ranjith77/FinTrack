package com.appservices.app.controller;

import com.appservices.app.model.Expense;
import com.appservices.app.model.Income;
import com.appservices.app.repository.IncomeRepository;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appservices.app.service.PersonalexpServiceImpl;
import com.appservices.app.service.dto.ExpenseDTO;
import com.appservices.app.service.dto.IncomeDTO;
import com.appservices.app.service.dto.PersonalexpDTO;

@RestController
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class PersonalexpController {

	private final IncomeRepository incomerepository;
	private final PersonalexpServiceImpl personalexpService;

	PersonalexpController(PersonalexpServiceImpl personalexpService, IncomeRepository incomerepository) {

		this.personalexpService = personalexpService;
		this.incomerepository = incomerepository;
	}

	@PostMapping("/register")
	public String input(@RequestBody PersonalexpDTO personalexpDTO) {
		personalexpService.saveuser(personalexpDTO);
		return "Successfully Registered";
	}

	@PostMapping("/income")
	public String income(@RequestBody IncomeDTO incomeDTO) {
		personalexpService.income(incomeDTO);
		return "Income Updated";
	}

	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody PersonalexpDTO personalexpDTO) {

		return personalexpService.login(personalexpDTO.getEmail(), personalexpDTO.getPassword());
	}

	@GetMapping("/income")
	public List<Income> getIncome(@RequestParam long userId) {
		return personalexpService.getIncome(userId);
	}

	@PostMapping("/expense")
	public String expense(@RequestBody ExpenseDTO expenseDTO) {
		personalexpService.expense(expenseDTO);
		return "Expense Updated";
	}

	@GetMapping("/expense")
	public List<Expense> getExpense(@RequestParam long userId) {
		return personalexpService.getExpense(userId);
	}

	@GetMapping("/recent-transactions")
	public List<Map<String, Object>> getRecentTransaction(@RequestParam Long userId) {

		return personalexpService.getRecentTransactions(userId);
	}

	@PutMapping("/update-profile/{id}")
	public String updateProfile(@PathVariable Long id, @RequestBody Map<String, String> request) {

		String name = request.get("name");
		String email = request.get("email");

		return personalexpService.updateProfile(id, name, email);
	}

	@PutMapping("/update-password/{id}")
    public String updatePassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");

        return personalexpService.updatePassword(
                id,
                currentPassword,
                newPassword
        );
    }}