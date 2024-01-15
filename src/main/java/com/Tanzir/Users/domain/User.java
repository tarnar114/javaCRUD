package com.Tanzir.Users.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {
    private @Id @GeneratedValue Long Id;
    private String user;
    private String pass;
    private User(){

    }
    private User(String user,String pass){
        this.user=user;
        this.pass=pass;
    }
}
