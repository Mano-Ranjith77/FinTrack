package com.appservices.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appservices.app.model.Income;
import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income , Long> {
	List<Income> findByUserId(long userId);	
}
