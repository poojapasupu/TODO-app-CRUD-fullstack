package com.poojapasupu.rest.webservices.restwebservices.todos.services;

import com.poojapasupu.rest.webservices.restwebservices.todos.beans.TodoBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TodoJpaRespository extends JpaRepository<TodoBean, Long> {

    List<TodoBean> findByUsername(String username);

}
