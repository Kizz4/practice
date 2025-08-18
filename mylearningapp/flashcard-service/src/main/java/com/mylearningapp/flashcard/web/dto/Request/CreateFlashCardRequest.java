package com.mylearningapp.flashcard.web.dto.Request;


import com.mylearningapp.flashcard.domain.FlashCardConstraints;
import com.mylearningapp.flashcard.domain.FlashCardType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateFlashCardRequest (
    @NotBlank @Size(max = FlashCardConstraints.FRONT_MAX_LEN) String front,
    @NotBlank @Size(max = FlashCardConstraints.BACK_MAX_LEN) String back,
    @NotNull FlashCardType type,
    @NotNull FlashCardType visibility
) {}
