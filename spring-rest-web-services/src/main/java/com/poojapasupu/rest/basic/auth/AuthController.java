package com.poojapasupu.rest.basic.auth;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @GetMapping(path="/basicAuth")
    public AuthenticationBean authUser() {
        return new AuthenticationBean("You are authenticated!");

    }
}
