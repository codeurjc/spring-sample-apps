package es.codeurjc.daw.library.api;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import es.codeurjc.daw.library.book.Book;
import es.codeurjc.daw.library.book.BookService;

@RestController
@RequestMapping("/api/books")
public class BookRestController {

	@Autowired
	private BookService service;

	@GetMapping("/")
	public Collection<Book> getBooks() {
		return service.findAll();
	}

	@GetMapping("/titles")
	public Collection<String> getBookTitles() {
		return service.findAll().stream().map(b -> b.getTitle()).collect(Collectors.toList());
	}

	@GetMapping("/{id}")
	public Book getBook(@PathVariable long id) {
		return service.findById(id).get();
	}

	@PostMapping("/")
	@ResponseStatus(HttpStatus.CREATED)
	public Book createBook(@RequestBody Book book) {
		return service.save(book);
	}

	@PutMapping("/{id}")
	public Book updateBook(@PathVariable long id, @RequestBody Book updatedBook) {

		service.findById(id).get(); //Returns with 404 if not found in database
		
		updatedBook.setId(id);
		service.save(updatedBook);
		return updatedBook;
	}

	@DeleteMapping("/{id}")
	public Book deleteBook(@PathVariable long id) {

		Book deletedBook = service.findById(id).get();
		service.delete(id);
		return deletedBook;
	}

}
