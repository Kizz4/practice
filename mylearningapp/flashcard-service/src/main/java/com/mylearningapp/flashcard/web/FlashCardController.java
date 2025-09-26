package com.mylearningapp.flashcard.web;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mylearningapp.flashcard.web.dto.Request.CreateFlashCardRequest;
import com.mylearningapp.flashcard.web.dto.Request.UpdateFlashCardRequest;
import com.mylearningapp.flashcard.web.dto.Response.ReadFlashCardResponse;
import com.mylearningapp.flashcard.service.FlashCardService;


@RestController
@RequestMapping("/flashcards")
public class FlashCardController {
    private final FlashCardService service;

    public FlashCardController(FlashCardService service){
        this.service = service;
    }
    
    @GetMapping("/{id}")
    public ReadFlashCardResponse getById(@PathVariable Long id){
        return this.service.readById(id);
    }

    @PostMapping
    public ReadFlashCardResponse create(@RequestBody @Valid CreateFlashCardRequest request){
        return this.service.handleCreation(request);  
    }
    
    @DeleteMapping
    public ReadFlashCardResponse delete(@PathVariable Long id){
        return this.service.deleteById(id);  
    }

    @PutMapping
    public ReadFlashCardResponse update(@PathVariable Long id, @RequestBody @Valid UpdateFlashCardRequest request){
        return this.service.updateById(id, request);  
    }


}