package com.farmtrack.service.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "farms")
public class Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String location;

    private String owner;

    // Constructors
    public Farm() {}

    public Farm(String name, String location, String owner) {
        this.name = name;
        this.location = location;
        this.owner = owner;
    }

    // Getters and Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }

    public void setLocation(String location) { this.location = location; }

    public String getOwner() { return owner; }

    public void setOwner(String owner) { this.owner = owner; }
}