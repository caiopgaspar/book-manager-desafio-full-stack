import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../../shared/Constants/api.constants';

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = API.BASE_URL;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}${API.BOOKS.BASE}`);
  }

  searchBooks(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}${API.BOOKS.BASE}`, {
      params: { title }
    });
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}${API.BOOKS.BY_ID(id)}`);
  }

  createBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}${API.BOOKS.CREATE}`, book);
  }

  updateBook(id: number, book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}${API.BOOKS.BY_ID(id)}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${API.BOOKS.BY_ID(id)}`);
  }
}
