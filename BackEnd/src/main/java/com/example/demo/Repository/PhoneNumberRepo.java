package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.PhoneNumber;

@Repository
public interface PhoneNumberRepo extends JpaRepository<PhoneNumber, Long> {

	boolean existsByUsername(String username);
    PhoneNumber findByUsername(String username);

}