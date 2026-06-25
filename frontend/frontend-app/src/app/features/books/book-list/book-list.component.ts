import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../../core/services/book.service';
import { ToastrService } from 'ngx-toastr';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  description: string;
}

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = true;

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    console.log('Loading books...');
    this.loading = true;
    this.cdr.detectChanges();

    this.bookService.getBooks().subscribe({
      next: (data) => {
        console.log('Data:', data);
        this.books = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteBook(book: Book): void {
    const confirmed = window.confirm(`Are you sure you want to delete "${book.title}"?`);
    if (!confirmed) {
      return;
    }

    this.bookService.deleteBook(book.id).subscribe({
      next: () => {
        this.toastr.success('Book deleted successfully');
        this.books = this.books.filter(b => b.id !== book.id);
      },
      error: (error) => {
        console.error('Error deleting book:', error);
        this.toastr.error('Error deleting book');
      }
    });
  }
}
