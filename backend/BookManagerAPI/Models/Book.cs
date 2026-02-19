using System.ComponentModel.DataAnnotations;

namespace BookManagerAPI.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="Title is required.")]
        [StringLength(100,ErrorMessage ="Title can't be longer than 100 letters.")]
        public string Title { get; set; } = string.Empty;


        [Required(ErrorMessage = "Author is required.")]
        [StringLength(100, ErrorMessage = "Author Name can't be longer than 100 letters.")]
        public string Author { get; set; } = string.Empty;


        [Required(ErrorMessage = "Isbn is required.")]
        public string Isbn { get; set; } = string.Empty;



        [Required(ErrorMessage = "Publication Date is required.")]
        [DataType(DataType.DateTime)]
        public DateTime PublicationDate { get; set; }
    }
}
