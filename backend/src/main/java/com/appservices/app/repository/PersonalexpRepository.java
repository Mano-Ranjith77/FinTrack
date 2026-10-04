package com.appservices.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appservices.app.model.Personalexp;

@Repository
	public interface PersonalexpRepository extends JpaRepository<Personalexp, Long> {
	 Optional<Personalexp> findByEmail(String email);
}
