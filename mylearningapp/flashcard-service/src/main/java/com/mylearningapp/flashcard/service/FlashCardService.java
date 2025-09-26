package com.mylearningapp.flashcard.service;

import java.util.UUID;

import com.mylearningapp.flashcard.persistance.FlashCardEntity;
import com.mylearningapp.flashcard.persistance.FlashCardRepository;
import com.mylearningapp.flashcard.web.dto.Request.CreateFlashCardRequest;
import com.mylearningapp.flashcard.web.dto.Request.UpdateFlashCardRequest;
import com.mylearningapp.flashcard.web.dto.Response.ReadFlashCardResponse;

import jakarta.persistence.EntityNotFoundException;

public class FlashCardService {
    private final FlashCardRepository repo;

    public FlashCardService(FlashCardRepository repo) {
        this.repo = repo;
    }

    private UUID currentSub(){
        return UUID.fromString("00000000-0000-0000-0000-000000000001");
    }

    private ReadFlashCardResponse convertEntityToReadResponse(FlashCardEntity entity){
        return new ReadFlashCardResponse(entity.getId(), entity.getFront(), entity.getBack(), entity.getType(), entity.getCreatedAt(), entity.getUpdatedAt());
    }

    public ReadFlashCardResponse handleCreation(CreateFlashCardRequest request){
        FlashCardEntity entity = new FlashCardEntity();
        entity.setFront(request.front());
        entity.setBack(request.back());
        entity.setType(request.type());
        entity.setVisibility(request.visibility());

        repo.save(entity);

        return this.convertEntityToReadResponse(entity);
    }

    public ReadFlashCardResponse readById(Long id) {
        FlashCardEntity entity = repo.findById(id).orElseThrow(() -> new EntityNotFoundException("FlashCard " + id + " not found."));

        return this.convertEntityToReadResponse(entity);
    }

    public ReadFlashCardResponse deleteById(Long id) {
        FlashCardEntity entity = repo.findById(id).orElseThrow(() -> new EntityNotFoundException("FlashCard " + id + " not found."));  
        repo.deleteByIdAndOwnerSub(id, currentSub());

        return this.convertEntityToReadResponse(entity);

    }

    public ReadFlashCardResponse updateById(Long id, UpdateFlashCardRequest request) {
        FlashCardEntity entity = repo.findById(id).orElseThrow(() -> new EntityNotFoundException("FlashCard " + id + " not found."));  
        entity.setFront(request.front());
        entity.setBack(request.back());
        entity.setType(request.type());
        entity.setVisibility(request.visibility());
        
        repo.save(entity);
        
        return this.convertEntityToReadResponse(entity);
    }
}
