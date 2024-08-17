package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Auction;

@Repository
public interface AuctionRepo extends JpaRepository<Auction, Long> {
	
}
