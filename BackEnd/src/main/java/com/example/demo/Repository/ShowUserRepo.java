package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.ShowUser;

@Repository
public interface ShowUserRepo extends JpaRepository<ShowUser, Long>{
	
	@Query("select e from ShowUser e where e.username = :username")
	ShowUser findByUsername(String username);
	
	@Modifying
	@Query("DELETE FROM ShowUser e WHERE e.username = :username")
	void delete_By_Name_ShowUser(String username);
}
