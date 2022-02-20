import { VerifyEmailOutput, VerifyEmailInput } from './dtos/verify-email-dto';
import { EditProfileOutput, EditProfileInput } from './dtos/edit-profile.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login-dto';
import { CreateAccountOutput, CreateAccountInput } from './dtos/create-account.dto';

import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Resolver(of => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService){}

    @Query(returns => Boolean)
    hi() {
        return true;
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput) : Promise<CreateAccountOutput>{
       return this.usersService.createAccount(createAccountInput);                 
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
       return this.usersService.login(loginInput)       
    }

    @Query(returns => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() lUser: User){
        return lUser;
    }
    
    @UseGuards(AuthGuard)
    @Query(returns => UserProfileOutput)
    userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput> {
        return this.usersService.findById(userProfileInput.userId);    
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => EditProfileOutput)
    editProfile(@AuthUser() lUser: User, @Args('input') editProfileInput: EditProfileInput): Promise<EditProfileOutput>{
        return this.usersService.editProfile(lUser.id, editProfileInput);
       
    }

    @Mutation(returns => VerifyEmailOutput)
    verifyEmail(@Args('input') { code }: VerifyEmailInput): Promise<VerifyEmailOutput> {
        return this.usersService.verifyEmail(code);
    
    }

}