package com.mylearningapp.flashcard.web;

import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mylearningapp.flashcard.web.dto.FlashCardRequest;
import com.mylearningapp.flashcard.web.dto.FlashCardResponse;
import com.mylearningapp.flashcard.service.FlashCardService;


@RestController
@RequestMapping("/flashcards")
public class FlashCardController {

    @GetMapping("/{id}")
    public FlashCardResponse getById(@PathVariable Long id) { }

    @PostMapping
    public FlashCardResponse create(@RequestBody @Valid FlashCardRequest request) 
    {
        public UUID ownerId =  
        return FlashCardService.handleCreation();  
    }

}