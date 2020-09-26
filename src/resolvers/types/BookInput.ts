import { InputType, Field, Int } from "type-graphql";
import { Book } from "../../entities/Book";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "../../utils/objectId.scalar";
import { Author } from "../../entities/Author";

@InputType()
export class BookInput implements Partial<Book> {
  @Field()
  bookName!: string;

  @Field((type) => Int)
  price?: number;

  @Field((type) => ObjectIdScalar)
  authorId!: ObjectId;
}
