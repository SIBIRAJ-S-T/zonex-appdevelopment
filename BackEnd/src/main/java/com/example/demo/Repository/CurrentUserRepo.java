package com.example.demo.Repository;

import com.example.demo.Entity.CurrentUser;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrentUserRepo extends JpaRepository<CurrentUser, Long> {
	CurrentUser findByUsername(String username);
    
    @Modifying
    @Query("DELETE FROM CurrentUser c WHERE c.username = ?1")
    void deleteByUsername(String username);
    
    @Modifying
    @Query("DELETE FROM CurrentUser c WHERE c.loginTime < :cutoffTime")
    void deleteInactiveUsers(@Param("cutoffTime") LocalDateTime cutoffTime);

	boolean existsByUsername(String username);
}
