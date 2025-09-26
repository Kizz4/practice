package com.mylearningapp.flashcard.persistance;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.mylearningapp.flashcard.domain.FlashCardType;
import com.mylearningapp.flashcard.domain.VisibilityType;
import com.mylearningapp.flashcard.domain.FlashCardConstraint;

import jakarta.persistence.*;

/*
@Entity
----------
- Indique que cette classe Java est une entité JPA (donc liée à une table SQL).
- Elle sera persistée dans la base par Hibernate.
- Obligatoire pour chaque objet que tu veux stocker.
*/
@Entity
/*
@Table(name = "nom_table")
-----------------------------
- Facultatif.
- Permet de personnaliser le nom de la table SQL si tu ne veux pas que ce soit le nom de la classe.
- Par défaut, le nom de la classe devient le nom de la table.
*/
@Table(name = "flashcards")
public class FlashCardEntity {
    /*
    @Id
    ------
    - Indique que ce champ est la clé primaire.
    - Obligatoire pour toute entité.
    - Il doit être unique.
    */
    @Id
    /*
    @GeneratedValue(strategy = ...)
    -----------------------------------
    - Utilisé avec @Id.
    - Permet de générer automatiquement les valeurs de la clé primaire.
    - Stratégies les plus courantes :
    - GenerationType.IDENTITY → auto-incrément SQL
    - GenerationType.SEQUENCE → utilise une séquence SQL
    - GenerationType.AUTO → laisse Hibernate choisir
    */
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "owner_id", nullable = false, columnDefinition = "uuid")
    private UUID ownerId;

    /*
    @Column(name = "nom_colonne")
    --------------------------------
    - Facultatif.
    - Permet de renommer une colonne SQL, ou d’en définir les contraintes.
    - Exemples :
    - `nullable = false`
    - `unique = true`
    - `length = 255`
    */
    @Column(nullable = false, length = FlashCardConstraint.FRONT_MAX_LEN)
    private String front;

    @Column(nullable = false, length = FlashCardConstraint.BACK_MAX_LEN)
    private String back;
    /*
    8. @Enumerated
    --------------
    - Utilisée pour **mapper un champ de type enum** dans une base de données.
    - Obligatoire si tu veux que JPA sache comment stocker l'enum.
    - Par défaut, JPA stocke la **position** (ordinal) de l'enum → risqué !
    - Recommandé : `@Enumerated(EnumType.STRING)` pour stocker le **nom** de la valeur.

    Exemples :
    - `@Enumerated(EnumType.STRING) private FlashcardType type;`
    - `@Enumerated(EnumType.ORDINAL) private FlashcardType type;` (déconseillé)

    ⚠️ Le mode ORDINAL peut casser ta base si tu changes l’ordre des enums !
    */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = FlashCardConstraint.TYPE_MAX_LEN)
    private FlashCardType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = FlashCardConstraint.VISIBILITY_MAX_LEN)
    private VisibilityType visibility;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "timestamptz")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false, columnDefinition = "timestamptz")
    private Instant updatedAt;


    public FlashCardEntity() {
        // Constructeur vide requis par JPA
    }

    // Getters et setters
    public Long getId() { return id; }

    public UUID getOwnerId() { return ownerId; }

    public Instant getCreatedAt() { return createdAt; }
    
    public Instant getUpdatedAt() { return updatedAt; }

    public String getFront() { return front; }
    public void setFront(String front) { this.front = front; }

    public String getBack() { return back; }
    public void setBack(String back) { this.back = back; }

    public FlashCardType getType() { return type; }
    public void setType(FlashCardType type) { this.type = type; }

    public VisibilityType getVisibility() { return visibility; }
    public void setVisibility(VisibilityType visibility) { this.visibility = visibility; }

    @Override
    public boolean equals(Object o){
        if (this == o) return true;
        if (!(o instanceof FlashCardEntity)) return false;

        FlashCardEntity entity = (FlashCardEntity) o;

        return Objects.equals(this.id, entity.id) && Objects.equals(this.ownerId, entity.ownerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.ownerId);
    }

    @Override
    public String toString() {
        return "FlashCardEntity{id='" + this.id + "'\nfront='" + this.front + "\nback='" + this.back + "'\ncreatedAt='" + this.createdAt + "'\nupdatedAt='" + this.updatedAt + "'}";
    }
}