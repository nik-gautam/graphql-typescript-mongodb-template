import { prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { Book } from "./Book";
import { ObjectId } from "mongodb";

@ObjectType({ description: "The Author model" })
export class Author {
  @Field(() => ID)
  readonly _id!: ObjectId;

  @Field()
  @prop({ required: true, unique: true })
  authorName!: string;

  @Field((type) => [Book])
  @prop({ innerOptions: { ref: Book }, default: [] })
  books!: ObjectId[];

  @Field((type) => String)
  @prop({ default: new Date(), required: true })
  createdOn?: Date;
}

export const AuthorModel = getModelForClass(Author);
