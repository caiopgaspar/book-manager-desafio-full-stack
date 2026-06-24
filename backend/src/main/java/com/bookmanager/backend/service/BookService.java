package com.bookmanager.backend.service;

import com.bookmanager.backend.dto.request.BookRequest;
import com.bookmanager.backend.dto.response.BookResponse;
import java.util.List;

public interface BookService {

    List<BookResponse> getAllBooks();
    List<BookResponse> searchBookByTitle(String title);
    BookResponse getBookById(Long id);
    BookResponse createBook(BookRequest request);
    BookResponse updateBook(Long id, BookRequest request);
    void deleteBook(Long id);

}
