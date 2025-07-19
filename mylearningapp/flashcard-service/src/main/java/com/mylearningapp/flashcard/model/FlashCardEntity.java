package com.mylearningapp.flashcard.model;

import jakarta.persistence.*;
import com.mylearningapp.flashcard.ressources.types.FlashCardType;

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
    @Column(nullable = false)
    private String front;

    @Column(nullable = false)
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
    @Column(nullable = false)
    private FlashcardType type;

    public Flashcard() {
        // Constructeur vide requis par JPA
    }

    public Flashcard(String front, String back) {
        this.front = front;
        this.back = back;
    }

    // Getters et setters
    public Long getId() {
        return id;
    }

    public String getFront() {
        return front;
    }

    public void setFront(String front) {
        this.front = front;
    }

    public String getBack() {
        return back;
    }

    public void setBack(String back) {
        this.back = back;
    }

    public FlashCardType getType() {
        return type;
    }

    public void setBack(FlashCardType type) {
        this.type = type;
    }
}