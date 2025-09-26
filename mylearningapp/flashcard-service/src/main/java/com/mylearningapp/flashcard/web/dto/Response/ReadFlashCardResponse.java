package com.mylearningapp.flashcard.web.dto.Response;

import com.mylearningapp.flashcard.domain.FlashCardType;
import java.time.Instant;

public record ReadFlashCardResponse(
    Long id,
    String front,
    String back,
    FlashCardType type,
    Instant createdAt,
    Instant updatedAt
) {}