package com.poojapasupu.rest.webservices.restwebservices.todos.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name="todos")
public class TodoBean {

    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String description;
    private Date targetDate;
    private boolean isCompleted;

    public TodoBean(){}

    public TodoBean(Long id, String username, String description, Date targetDate, boolean isCompleted) {
        this.id = id;
        this.username = username;
        this.description = description;
        this.targetDate = targetDate;
        this.isCompleted = isCompleted;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(Date targetDate) {
        this.targetDate = targetDate;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    @Override
    public String toString() {
        return "TodoBean{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", description='" + description + '\'' +
                ", targetDate=" + targetDate +
                ", isCompleted=" + isCompleted +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TodoBean todoBean = (TodoBean) o;
        return id == todoBean.id && isCompleted == todoBean.isCompleted && username.equals(todoBean.username) && description.equals(todoBean.description) && targetDate.equals(todoBean.targetDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, description, targetDate, isCompleted);
    }
}
