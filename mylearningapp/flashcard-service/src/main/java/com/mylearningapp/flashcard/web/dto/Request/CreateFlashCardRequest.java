package com.mylearningapp.flashcard.web.dto.Request;


import com.mylearningapp.flashcard.domain.FlashCardConstraint;
import com.mylearningapp.flashcard.domain.FlashCardType;
import com.mylearningapp.flashcard.domain.VisibilityType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateFlashCardRequest (
    @NotBlank @Size(max = FlashCardConstraint.FRONT_MAX_LEN) String front,
    @NotBlank @Size(max = FlashCardConstraint.BACK_MAX_LEN) String back,
    @NotNull FlashCardType type,
    @NotNull VisibilityType visibility
) {}
