import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://localhost:7005/api/books';

  constructor(private http: HttpClient) {}

  async getBooks(): Promise<Book[]> {
    return firstValueFrom(this.http.get<Book[]>(this.apiUrl));
  }

  async createBook(book: Book): Promise<Book> {
    return firstValueFrom(this.http.post<Book>(this.apiUrl, book));
  }

  async updateBook(id: number, book: Book): Promise<void> {
    return firstValueFrom(this.http.put<void>(`${this.apiUrl}/${id}`, book));
  }

  async deleteBook(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
}
