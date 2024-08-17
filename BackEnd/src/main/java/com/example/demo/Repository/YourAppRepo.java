package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.YourApp;

@Repository
public interface YourAppRepo extends JpaRepository<YourApp, Long>{

	 boolean existsByAppurl(String appurl);

}
