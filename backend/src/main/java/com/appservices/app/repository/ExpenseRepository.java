package com.appservices.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appservices.app.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense , Long>{
	List<Expense> findByUserId (long userId);
}
