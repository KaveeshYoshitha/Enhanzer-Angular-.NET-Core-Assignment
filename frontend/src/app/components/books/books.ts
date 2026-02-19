import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books implements OnInit {
  books: Book[] = [];
  currentBook: Book = { title: '', author: '', isbn: '', publicationDate: '' };
  isEditing = false;

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  async loadBooks(): Promise<void> {
    try {
      this.books = await this.bookService.getBooks();
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Error fetching books', err);
    }
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (
      !this.currentBook.title.trim() ||
      !this.currentBook.author.trim() ||
      !this.currentBook.isbn.trim() ||
      !this.currentBook.publicationDate
    ) {
      Swal.fire('Validation Error', 'Please fill in all fields.', 'warning');
      return;
    }

    try {
      if (this.isEditing && this.currentBook.id) {
        try {
          await this.bookService.updateBook(this.currentBook.id, this.currentBook);
          Swal.fire('Success!', 'The book has been updated.', 'success');
        } catch (err) {
          Swal.fire('Error!', 'There was an error updating the book.', 'error');
          this.resetForm(form);
          return;
        }
      } else {
        try {
          await this.bookService.createBook(this.currentBook);
          Swal.fire('Success!', 'The book has been added.', 'success');
        } catch (err) {
          Swal.fire('Error!', 'There was an error adding the book.', 'error');
          this.resetForm(form);
          return;
        }
      }
      console.log('Clicked');
      await this.loadBooks();
      this.resetForm(form);
    } catch (err) {
      console.error('Error saving book', err);
    }
  }

  editBook(book: Book): void {
    const formattedDate = new Date(book.publicationDate).toISOString().split('T')[0];
    this.currentBook = { ...book, publicationDate: formattedDate };
    this.isEditing = true;
  }

  async deleteBook(id: number | undefined): Promise<void> {
    if (!id) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.bookService.deleteBook(id);
          await this.loadBooks();
          Swal.fire('Deleted!', 'The book has been deleted.', 'success');
        } catch (err) {
          Swal.fire('Error!', 'There was an error deleting the book.', 'error');
        }
      }
    });
  }

  resetForm(form?: NgForm): void {
    this.currentBook = { title: '', author: '', isbn: '', publicationDate: '' };
    this.isEditing = false;
    form?.resetForm(this.currentBook);

    this.cdr.detectChanges();
  }
}
