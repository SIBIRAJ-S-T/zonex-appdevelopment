package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.LogoutHistory;

@Repository
public interface LogoutHistoryRepo extends JpaRepository<LogoutHistory, Long>{

}
