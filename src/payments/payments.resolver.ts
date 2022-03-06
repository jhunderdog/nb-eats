import { PaymentService } from './payments.service';
import { Mutation, Resolver } from "@nestjs/graphql";
import { Payment } from "./entities/payment.entity";

@Resolver(of =>  Payment)
export class PaymentResolver {
    constructor(
        private readonly paymentService: PaymentService
    ){}

    
}