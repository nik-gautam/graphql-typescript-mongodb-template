import { InputType, Field } from "type-graphql";
import { Author } from "../../entities/Author";

@InputType()
export class AuthorInput implements Partial<Author> {
  @Field()
  authorName!: string;
}
