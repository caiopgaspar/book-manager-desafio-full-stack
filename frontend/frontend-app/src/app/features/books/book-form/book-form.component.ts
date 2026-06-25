import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService, Book } from '../../../core/services/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {
  book: Book = {
    id: 0,
    title: '',
    author: '',
    year: 0,
    description: ''
  };

  isEditMode = false;
  loading = false;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadBook(Number(id));
    }
  }

  loadBook(id: number): void {
    this.loading = true;
    this.bookService.getBook(id).subscribe({
      next: (data) => {
        this.book = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading book:', error);
        this.toastr.error('Error loading book');
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.book.title || !this.book.author) {
      this.toastr.error('Title and Author are required');
      return;
    }

    this.loading = true;

    if (this.isEditMode && this.book.id) {
      this.bookService.updateBook(this.book.id, this.book).subscribe({
        next: () => {
          this.toastr.success('Book updated successfully');
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error('Error updating book:', error);
          this.toastr.error('Error updating book');
          this.loading = false;
        }
      });
    } else {
      this.bookService.createBook(this.book).subscribe({
        next: () => {
          this.toastr.success('Book created successfully');
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error('Error creating book:', error);
          this.toastr.error('Error creating book');
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/books']);
  }
}
