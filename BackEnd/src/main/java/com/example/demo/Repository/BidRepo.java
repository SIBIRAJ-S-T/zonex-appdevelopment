package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Bid;

import java.util.List;

public interface BidRepo extends JpaRepository<Bid, Long> {
	List<Bid> findByAuctionIdOrderByAmountAsc(Long auctionId);
    List<Bid> findByAuctionIdOrderByAmountDesc(Long auctionId);
}
