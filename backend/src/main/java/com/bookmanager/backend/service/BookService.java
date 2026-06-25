package com.bookmanager.backend.service;

import com.bookmanager.backend.dto.request.BookRequest;
import com.bookmanager.backend.dto.response.BookResponse;
import com.bookmanager.backend.dto.response.PageResponse;
import java.util.List;

public interface BookService {

    PageResponse<BookResponse> getAllBooks(int page, int size);
    PageResponse<BookResponse> searchBookByTitle(String title, int page, int size);
    BookResponse getBookById(Long id);
    BookResponse createBook(BookRequest request);
    BookResponse updateBook(Long id, BookRequest request);
    void deleteBook(Long id);

}
