package com.bookmanager.backend.service;

import com.bookmanager.backend.dto.request.BookRequest;
import com.bookmanager.backend.dto.response.BookResponse;
import com.bookmanager.backend.domain.Book;
import com.bookmanager.backend.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService{

    private final BookRepository bookRepository;

    @Override
    public List<BookResponse> getAllBooks() {

        List<Book> books = bookRepository.findAll();

        return books.stream()
                .map(this::toResponse)
                .toList();

    }

    @Override
    public List<BookResponse> searchBookByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public BookResponse getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        return toResponse(book);
    }

    @Override
    public BookResponse createBook(BookRequest request){

        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .year(request.getYear())
                .description(request.getDescription())
                .build();

        Book savedBook = bookRepository.save(book);

        return toResponse(savedBook);


    }

    @Override
    public BookResponse updateBook(Long id, BookRequest request){

        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setYear(request.getYear());
        book.setDescription(request.getDescription());

        Book updatedBook = bookRepository.save(book);
        return toResponse(updatedBook);
    }

    @Override
    public void deleteBook(Long id){
        bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        bookRepository.deleteById(id);
    }


    private BookResponse toResponse(Book book) {
        return new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getYear(),
                book.getDescription()
        );
    }
}
