import { PaginationOutput, PaginationInput } from './../../common/dtos/pagination.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class SearchRestaurantInput extends PaginationInput {
    @Field(type => String)
    query:string;
}

@ObjectType()
export class SearchRestaurantOutput extends PaginationOutput {
    @Field(type => [Restaurant], {nullable: true})
    restaurants?:Restaurant[]
}