package com.mylearningapp.flashcard.web.error;

import java.net.URI;
import java.time.Instant;
import java.util.Map;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class ApiErrorHandler {


    @ExceptionHandler(NotFoundException.class)
    ResponseEntity<ProblemDetail> notFound(NotFoundException ex, HttpServletRequest req) {
        var pd = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
        pd.setTitle("Not Found");
        pd.setDetail(ex.getMessage());
        pd.setInstance(URI.create(req.getRequestURI()));
        pd.setProperties(Map.of("timestamp", Instant.now()));
        
        return ResponseEntity.status(404).body(pd);
    }
    
}
