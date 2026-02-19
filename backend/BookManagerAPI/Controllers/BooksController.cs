using BookManagerAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        //in memmory list
        private static readonly List<Book> _books = new List<Book>();
        private static int _nextId = 1;

        //Get all books
        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetBooks()
        {
            return Ok(_books);
        }

        //Get book by id
        [HttpGet("{id}")]
        public ActionResult<Book> GetBook(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) 
            {
                return NotFound( new {Message = $"Book with ID {id} not found."  } );

            }
            return Ok(book);
        }

        //Add a book
        [HttpPost]
        public ActionResult<Book> CreateBook(Book book) {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

        
            book.Id = _nextId++;
            _books.Add(book);
            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);

        }

        //Update a book
        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, Book updatedBook)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var existingBook = _books.FirstOrDefault(b => b.Id == id);

            if (existingBook == null)
            {
                return NotFound(new { Message = $"Book with ID {id} not found." });
            }

            // Update properties
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Isbn = updatedBook.Isbn;
            existingBook.PublicationDate = updatedBook.PublicationDate;

            return NoContent();
        }

        //Delete a book
        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);

            if (book == null)
            {
                return NotFound(new { Message = $"Book with ID {id} not found." });
            }

            _books.Remove(book);

            return NoContent();
        }

    }
}
