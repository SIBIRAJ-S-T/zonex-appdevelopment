package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.Entity.UserEntity;


public interface UserRepo extends JpaRepository<UserEntity, Long> {
	
	@Query("select u from UserEntity u WHERE u.username = :user")
	UserEntity get_By_Id(String user);
	
	@Modifying
	@Query("DELETE FROM UserEntity e WHERE e.username = :username and e.password=:password")
	void delete_By_Name(String username,String password);
	
	@Query("SELECT u FROM UserEntity u WHERE u.username = :username")
    UserEntity get_By_Name(String username);

	boolean existsByUsername(String username);
}
