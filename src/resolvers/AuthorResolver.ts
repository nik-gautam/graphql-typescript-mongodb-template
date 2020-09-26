import {
  Resolver,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
} from "type-graphql";
import { Author, AuthorModel } from "../entities/Author";
import { AuthorInput } from "./types/AuthorInput";
import { ObjectIdScalar } from "../utils/objectId.scalar";
import { ObjectId } from "mongodb";
import { Book, BookModel } from "../entities/Book";

@Resolver(Author)
export class AuthorResolver {
  @Query((returns) => Author, { nullable: true })
  async author(
    @Arg("authorId", (type) => ObjectIdScalar) authorId: ObjectId
  ): Promise<Author> {
    return (await AuthorModel.findById(authorId)) as Author;
  }

  @Query((returns) => [Author], { nullable: true })
  async authors(): Promise<Author[]> {
    return (await AuthorModel.find({})) as Author[];
  }

  @Mutation((returns) => Author)
  async addAuthor(@Arg("author") authorInput: AuthorInput): Promise<Author> {
    const newAuthor = new AuthorModel({
      authorName: authorInput.authorName,
    } as Author);

    await newAuthor.save();
    return newAuthor;
  }

  @FieldResolver()
  async books(@Root() author: any): Promise<Book[]> {
    return (await BookModel.find({
      _id: { $in: author.books as ObjectId[] },
    }))!;
  }
}
