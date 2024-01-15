package com.Tanzir.Users.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.DeleteExchange;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.Tanzir.Users.domain.User;
import com.Tanzir.Users.repo.UserRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.ArrayList;
import java.net.URI;
import java.net.URISyntaxException;
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository=userRepository;
    }
    @GetMapping
    public List<User> getUsers(){
        List<User> users=new ArrayList<User>();
        users=userRepository.findAll();
        return users;
    }
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id){
        return userRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    @PostMapping
    public ResponseEntity createUser(@RequestBody User user)throws URISyntaxException {
        User savedUser=userRepository.save(user);
        return ResponseEntity.created(new URI("/users/"+savedUser.getId())).body(savedUser);

    }
    @PostMapping("/{id}")
    public ResponseEntity updateClient(@PathVariable Long id,@RequestBody User user){
        User currUser=userRepository.findById(id).orElseThrow(RuntimeException::new);
        currUser.setPass(user.getPass());
        currUser.setUser(user.getUser());
        currUser=userRepository.save(user);
        return ResponseEntity.ok(currUser);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity delUser(@PathVariable Long id){
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
