package com.poojapasupu.rest.webservices.restwebservices.todos;

import com.poojapasupu.rest.webservices.restwebservices.todos.beans.TodoBean;
import com.poojapasupu.rest.webservices.restwebservices.todos.services.TodoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {

    @Autowired
    private TodoServiceImpl todoService;

    @GetMapping(path="/{username}/list")
    public List<TodoBean> getTodosList (@PathVariable String username){
        return todoService.findAll(username);
    }

    @DeleteMapping(path="/{username}/{id}")
    public ResponseEntity<Void> deleteTodoById (@PathVariable String username, @PathVariable long id){
        TodoBean todo = todoService.deleteTodobyId(id);
        if(todo != null){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping(path="/{username}/{id}")
    public TodoBean getTodoById (@PathVariable String username, @PathVariable long id){
        return todoService.getTodobyId(id);
    }

    @PutMapping(path="/{username}/{id}")
    public ResponseEntity<TodoBean> UpdateTodoById (@PathVariable String username, @PathVariable long id, @RequestBody TodoBean todo){
        TodoBean todoResponse = todoService.save(todo);
        return new ResponseEntity<TodoBean>(todoResponse, HttpStatus.OK );
    }

    @PostMapping(path="/{username}/newTodo")
    public ResponseEntity<Void> createTodo (@PathVariable String username, @RequestBody TodoBean todo){
        TodoBean todoResponse = todoService.save(todo);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(todoResponse.getId()).toUri();
        return  ResponseEntity.created(uri).build();
    }
}
