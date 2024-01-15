package com.Tanzir.Users.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Tanzir.Users.domain.User;

public interface UserRepository extends JpaRepository<User,Long> {
    
}
