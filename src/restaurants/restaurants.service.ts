import { CreateRestaurantInput, CreateRestaurantOutput } from './dtos/create-restaurant.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Restaurant } from "./entities/restaurant.entity";
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant) 
        private readonly restaurants: Repository<Restaurant>
        ){}
  
   async createRestaurant(
        owner: User,
        createRestaurantInput: CreateRestaurantInput,

        ): Promise<CreateRestaurantOutput>{
        try {
            const newRestaurant = this.restaurants.create(createRestaurantInput)
            await this.restaurants.save(newRestaurant);
        } catch {
            return {
                ok: false,
                error: "Could not create restaurant",
            }
        }
    }

}