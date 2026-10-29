/*
    Unlike ErrorDto, which describes what error happen.
    Global Exception Handler will actually handle and
    response to the error and decide how to respond
    back to user.
    NOTE: this is a generic exception handler
*/
package com.monaarchives.bookmark.controller;

import java.util.UUID;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.monaarchives.bookmark.domain.dto.ErrorDto;
import com.monaarchives.bookmark.exception.BookmarkNotFoundExeception;

@ControllerAdvice //An annotation that speceficies this class as an exception handler
public class GlobalExceptionHandler {

    @ExceptionHandler (MethodArgumentNotValidException.class) // Yes, telling spring this method is incharge of exception error.
    public ResponseEntity<ErrorDto> handleValidationException(MethodArgumentNotValidException ex){

        String errorMessage = ex.getBindingResult().getFieldErrors().stream() // We are extracting and unrapping MethodArgument to a simple string
        .findFirst()
        .map(DefaultMessageSourceResolvable::getDefaultMessage)
        .orElse("A Validation Failed");

        ErrorDto errorDto = new ErrorDto(errorMessage);

        return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BookmarkNotFoundExeception.class)
    public ResponseEntity<ErrorDto> handleBookmarkNotFoundException(BookmarkNotFoundExeception ex){
        
        UUID bookmarkNotFoundId = ex.getId();

        String errorMessage = String.format("Bookmark with ID %s not found", bookmarkNotFoundId);

        ErrorDto errorDto = new ErrorDto(errorMessage);

        return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
    }
}
