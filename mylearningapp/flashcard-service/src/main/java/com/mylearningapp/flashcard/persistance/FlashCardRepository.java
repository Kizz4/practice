package com.mylearningapp.flashcard.persistance;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mylearningapp.flashcard.domain.FlashCardType;


@Repository
public interface FlashCardRepository extends JpaRepository<FlashCardEntity, Long> {
    List<FlashCardEntity> findAllByOwnerId(UUID ownerId);
    List<FlashCardEntity> findByFrontContent(String text);
    List<FlashCardEntity> findByBackContent(String text);
    List<FlashCardEntity> findByType(FlashCardType type);
}
