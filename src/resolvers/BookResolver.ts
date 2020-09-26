import {
  Resolver,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Query,
} from "type-graphql";
import { ObjectId } from "mongodb";
import { Book, BookModel } from "../entities/Book";
import { BookInput } from "./types/BookInput";
import { Author, AuthorModel } from "../entities/Author";
import { ObjectIdScalar } from "../utils/objectId.scalar";

@Resolver(Book)
export class BookResolver {
  @Query((returns) => Book)
  async book(
    @Arg("bookId", (type) => ObjectIdScalar) bookId: ObjectId
  ): Promise<Book> {
    return (await BookModel.findById(bookId)) as Book;
  }

  @Query((returns) => [Book])
  async books(): Promise<Book[]> {
    return (await BookModel.find({})) as Book[];
  }

  @Mutation((returns) => Book)
  async addBook(@Arg("book") bookInput: BookInput): Promise<Book> {
    const newBook = new BookModel({
      bookName: bookInput.bookName,
      author: bookInput.authorId,
      price: bookInput.price,
    } as Book);

    await newBook.save();

    await AuthorModel.findByIdAndUpdate(bookInput.authorId as ObjectId, {
      $push: { books: newBook._id },
    });

    console.log("newBook", newBook);

    return newBook;
  }

  @FieldResolver()
  async author(@Root() book: any): Promise<Author> {
    return (await AuthorModel.findById(book.author as ObjectId)) as Author;
  }
}
