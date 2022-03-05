import { PubSub } from 'graphql-subscriptions';
import { NEW_PENDING_ORDER, PUB_SUB } from './../common/common.constants';
import { EditOrderInput, EditOrderOutput } from './dtos/edit-order.dto';
import { GetOrderInput, GetOrderOutput } from './dtos/get-order.dto';
import { GetOrdersOutput, GetOrdersInput } from './dtos/get-orders.dto';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { OrderService } from './orders.service';
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { Order } from "./entities/order.entity";
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorator';
import { Inject } from '@nestjs/common';





@Resolver(of => Order)
export class OrderResolver {
    constructor(
        private readonly ordersService: OrderService, 
        @Inject(PUB_SUB) private readonly pubSub: PubSub,
    ){}

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

        @Mutation(returns => EditOrderOutput)
        @Role(['Any'])
        async editOrder(
            @AuthUser() user: User,
            @Args("input") editOrderInput: EditOrderInput
        ) : Promise<EditOrderOutput> {
            return this.ordersService.editOrder(user, editOrderInput);
        }

        @Subscription(returns => Order, {
            filter: ({pendingOrders: {ownerId}}, _, {user}) => {
                console.log(ownerId, user.id);
            return ownerId === user.id;
            },
            resolve: ({pendingOrders: {order}}) => order
        })
        @Role(['Owner'])
        pendingOrders(){
            return this.pubSub.asyncIterator(NEW_PENDING_ORDER);
        }
}