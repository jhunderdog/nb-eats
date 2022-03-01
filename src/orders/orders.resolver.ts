import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { GetOrdersOutput, GetOrdersInput } from './dtos/get-orders.dto';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { OrderService } from './orders.service';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Order } from "./entities/order.entity";
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorator';

@Resolver(of => Order)
export class OrderResolver {
    constructor(private readonly ordersService: OrderService){}

        @Mutation(returns => CreateOrderOutput)
        @Role(['Client'])
        async createOrder(
            @AuthUser() customer: User, 
            @Args("input")
            createOrderInput: CreateOrderInput,
            ): Promise<CreateOrderOutput> {
                return this.ordersService.createOrder(customer, createOrderInput);
            }
    
        @Query(returns => GetOrdersOutput)
        @Role(["Any"])
        async getOrders(
            @AuthUser() user: User,
            @Args("input") getOrdersInput: GetOrdersInput
        ) : Promise<GetOrdersOutput> {
            return this.ordersService.getOrders(user, getOrdersInput);
        }
        
        @Query(returns => GetOrderOutput)
        @Role(['Any'])
        async getOrder(
            @AuthUser() user: User,
            @Args('input') getOrderInput: GetOrderInput,
        ) : Promise<GetOrderOutput> {
            return this.ordersService.getOrder(user, getOrderInput);
        }
}