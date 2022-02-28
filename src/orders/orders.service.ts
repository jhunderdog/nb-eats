import { Restaurant } from './../restaurants/entities/restaurant.entity';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { User } from 'src/users/entities/user.entity';
import { OrderItem } from './entities/order-item.entity';
import { Dish } from 'src/restaurants/entities/dish.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orders: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItems: Repository<OrderItem>,
        @InjectRepository(Restaurant)
        private readonly restaurants: Repository<Restaurant>,
        @InjectRepository(Dish)
        private readonly dishes: Repository<Dish>
        ){


        }       
        async createOrder(customer:User, { restaurantId, items }: CreateOrderInput)
         : Promise<CreateOrderOutput> {
            const restaurant = await this.restaurants.findOne(restaurantId);
            if(!restaurant) {
                return {
                    ok: false,
                    error: "Restaurant not found"
                };
            }
            for (const item of items) {
                const dish = await this.dishes.findOne(item.dishId);
                if(!dish){
                    return {
                        ok: false,
                        error: "Dish not found."
                    }
                }
                console.log(`Dish price: ${dish.price}`);
                for(const itemOption of item.options){
                    // console.log(itemOption);
                    const dishOption = dish.options.find(
                        dishOption => dishOption.name === itemOption.name
                    );
                    if(dishOption){
                        if(dishOption.extra){
                            console.log(`$USD +${dishOption.extra}`)
                        } else {
                            const dishOptionChoice = dishOption.choices.find(optionChoice => optionChoice.name === itemOption.choice);
                            // console.log(dishOptionChoice);
                            if(dishOptionChoice) {
                                console.log(`$USD +${dishOptionChoice.extra}`)
                            }
                        }

                    }
                    // console.log(itemOption.name, dishOption.name);
                    // console.log(dishOption);
                }
                // item.options
                // dish.options
                // await this.orderItems.save(this.orderItems.create({
                //     dish,
                //     options: item.options,
                // }),
                // )
            }
            
        }
}