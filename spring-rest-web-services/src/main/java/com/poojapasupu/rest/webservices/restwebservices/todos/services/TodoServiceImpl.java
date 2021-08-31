package com.poojapasupu.rest.webservices.restwebservices.todos.services;

import com.poojapasupu.rest.webservices.restwebservices.todos.beans.TodoBean;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoServiceImpl {
    private static List<TodoBean> todos= new ArrayList<>();
    private static long idCounter=0;

    static{

        todos.add(new TodoBean(++idCounter, "pooja", "1Learn React!", new Date(), false));
        todos.add(new TodoBean(++idCounter, "pooja", "2Learn Angular!", new Date(), false));
        todos.add(new TodoBean(++idCounter, "pooja", "3Learn Acting!", new Date(), false));
        todos.add(new TodoBean(++idCounter, "pooja", "4Learn React!", new Date(), false));
        todos.add(new TodoBean(++idCounter, "pooja", "5Learn Angular!", new Date(), false));
    }

    public List<TodoBean> findAll(String username){
        return todos;
    }

    public TodoBean deleteTodobyId (@PathVariable long id) {
        TodoBean todo = findById(id);
        if(todos.remove(todo)) {
            return todo;
        }
        return null;
    }

    private TodoBean findById(long id) {
        for(TodoBean todo : todos){
            if(todo.getId() == id){
                return todo;
            }
        }
        return null;
    }

    public TodoBean getTodobyId (@PathVariable long id) {
        TodoBean todo = findById(id);
        return todo;
    }

    public TodoBean save(TodoBean todo){
        if(todo.getId() == -1 || todo.getId() == 0){
            todo.setId(++idCounter);
            todos.add(todo);
        }else{
            deleteTodobyId(todo.getId());
            todos.add(todo);
        }
        return todo;

    }


}
