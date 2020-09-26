import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { Author } from "./Author";
import { ObjectId } from "mongodb";

@ObjectType({ description: "The Books model" })
export class Book {
  @Field(() => ID)
  readonly _id!: ObjectId;

  @Field()
  @prop({ required: true, unique: true })
  bookName?: string;

  @Field((type) => Int)
  @prop({ required: true })
  price!: number;

  @Field((type) => Author)
  @prop({ type: Author, required: true })
  author!: Ref<Author>;

  @Field((type) => String)
  @prop({ default: new Date(), required: true })
  createdOn?: Date;
}

export const BookModel = getModelForClass(Book);
