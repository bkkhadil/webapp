package com.system.core.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.GenerationType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "equipments")

public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_equipment")
    private Long idEquipment;

    @Column(name = "nom", nullable = false)
    private String nom;
    @JsonIgnore
    @ManyToMany(mappedBy = "equipments")

    private List<CoWorkspace> coWorkspaces = new ArrayList<>();

    @JsonCreator
    public Equipment() {
        this.nom = nom;
    }


}
