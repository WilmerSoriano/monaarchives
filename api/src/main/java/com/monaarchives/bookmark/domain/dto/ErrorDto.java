/*
    This class is used in controller/GlobalExceptionHandler class.
    The main job of this class is to describe an Error related to Dto
    and instead of giving user random debug error. I'll use ErrorDto
    to instead return a predictable JSON response to an error.
*/

package com.monaarchives.bookmark.domain.dto;

public record ErrorDto(String error) {
    
}
