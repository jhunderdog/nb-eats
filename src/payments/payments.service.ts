import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { CreatePaymentInput, CreatePaymentOutput } from './dtos/create-payment.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm/repository/Repository";
import { Payment } from "./entities/payment.entity";
import { GetPaymentsOutput } from './dtos/get-payments.dto';
import { Cron, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { LessThan } from 'typeorm';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private readonly payments : Repository<Payment>,
        @InjectRepository(Restaurant)
        private readonly restaurants: Repository<Restaurant>,
        private schedulerRegistry: SchedulerRegistry,
        ){}
        

    async createPayment(
        owner: User, 
        {transactionId, restaurantId}: CreatePaymentInput,
        ): Promise<CreatePaymentOutput> {
         try {
            const restaurant = await this.restaurants.findOne(restaurantId);
            if(!restaurant) {
                return {
                    ok: false,
                    error: "Restaurant not found."
                }
            }
            if(restaurant.ownerId != owner.id){
                return {
                    ok: false,
                    error: "You are not allowed to do this."
                }
            }
            restaurant.isPromoted = true;
            const date = new Date()
            date.setDate(date.getDate() + 7)
            restaurant.promotedUntil = date;
            this.restaurants.save(restaurant);
            await this.payments.save(this.payments.create({
                transactionId,
                user: owner,
                restaurant,
            })
            );
            return {
                ok: true,                
            }
         } catch {
            return {
                ok: false,
                error: "Could not create payment. "
            }
         }
    } 
    async getPayments(user:User): Promise<GetPaymentsOutput> {
        try {
            const payments = await this.payments.find({user: user});
        return {
            ok: true,
            payments,
        }
        } catch {
            return {
                ok: false,
                error: "Could not load payments.",
            }
        }
    }

    @Interval(2000)
    async checkPromotedRestaurants(){
        const restaurants = await this.restaurants.find({
            isPromoted: true, 
            promotedUntil: LessThan(new Date)
        });
        console.log(restaurants);
        restaurants.forEach(async restaurant => {
            restaurant.isPromoted = false
            restaurant.promotedUntil = null
            await this.restaurants.save(restaurant);
        })
    
    }

    // @Cron("30 * * * * *", {
    //     name:"myJob"
    // })
    // async checkForPayments(){
    //     console.log("Checking for payments....(cron)");
    //     const job = this.schedulerRegistry.getCronJob("myJob");
    //     console.log(job);
    //     job.stop();
    // }

    // @Interval(5000)
    // async checkForPaymentsI(){
    //     console.log("Checking for payments....(interval)");
    // }
    
    // @Timeout(20000)
    // afterStarts(){
    //     console.log("Congrats");
    // }
}