package com.mylearningapp.flashcard.web.dto;

import com.mylearningapp.flashcard.domain.FlashCardType;
import java.time.Instant;

public record FlashCardResponse(
    Long id,
    String question,
    String answer,
    FlashCardType type,
    Instant createdAt,
    Instant updatedAt
) {}