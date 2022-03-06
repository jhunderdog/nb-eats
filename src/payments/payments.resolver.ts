import { GetPaymentsOutput } from './dtos/get-payments.dto';
import { CreatePaymentInput, CreatePaymentOutput } from './dtos/create-payment.dto';
import { PaymentService } from './payments.service';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Payment } from "./entities/payment.entity";
import { Role } from 'src/auth/role.decorator';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';


@Resolver(of =>  Payment)
export class PaymentResolver {
    constructor(
        private readonly paymentService: PaymentService
    ){}

    @Mutation(returns => CreatePaymentOutput)
    @Role(["Owner"])
    createPayment(@AuthUser() owner: User, @Args('input') createPaymentInput: CreatePaymentInput): Promise<CreatePaymentOutput> {
        return this.paymentService.createPayment(owner, createPaymentInput);
    }

    @Query(returns => GetPaymentsOutput)
    @Role(["Owner"])
    getPayment(@AuthUser() user:User) : Promise<GetPaymentsOutput>{
        return this.paymentService.getPayments(user);
    }
}