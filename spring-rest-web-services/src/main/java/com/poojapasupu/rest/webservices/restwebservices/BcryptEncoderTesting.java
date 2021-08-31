package com.poojapasupu.rest.webservices.restwebservices;

import jdk.nashorn.internal.ir.annotations.Ignore;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BcryptEncoderTesting {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        for(int i=1; i<10 ; i++) {
            String encodedString = encoder.encode("password");
            System.out.println(encodedString);
        }
    }
}
