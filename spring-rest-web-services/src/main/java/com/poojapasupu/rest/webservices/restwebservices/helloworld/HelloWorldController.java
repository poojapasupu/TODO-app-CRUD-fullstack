package com.poojapasupu.rest.webservices.restwebservices.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HelloWorldController {

    @GetMapping(path = "/hello")
    public String helloWorld(){
        return "helloooo";
    }

    @GetMapping(path = "/hello-bean")
    public HelloWorldBean helloWorldBean(){
        return new HelloWorldBean("hi bean!");
    }

    @GetMapping(path = "/hello-bean/{name}")
    public HelloWorldBean helloWorldBean(@PathVariable String name){
        return new HelloWorldBean(String.format("hi %s!", name));
    }
}
