package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.DeletedUser;

@Repository
public interface DeletedUserRepo extends JpaRepository<DeletedUser, Integer> {

}
