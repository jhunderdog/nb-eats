import { EmailVar, MailModuleOptions } from './mail.interfaces';
import { CONFIG_OPTIONS } from './../common/common.constants';
import { Inject, Injectable } from "@nestjs/common";
import got from "got";
import * as FormData from "form-data";
import { string } from 'joi';
import { Code } from 'typeorm';

@Injectable()
export class MailService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions) 
        {
            // this.sendEmail('testing', 'test')
        }
    async sendEmail(
        subject: string, 
        template: string, 
        emailVars: EmailVar[]
        ) : Promise<boolean> {
        const form = new FormData();
        form.append("from", `Jongho from @NuberEats  <mailgun@${this.options.domain}>`);
        form.append("to", `33382water@gmail.com`);
        form.append("subject", subject);
        form.append("template", template);
        emailVars.forEach(eVar => form.append(`v:${eVar.key}`, eVar.value));
        try {
            await got.post(`https://api.mailgun.net/v3/${this.options.domain}/messages`, 
            {
                
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `api:${this.options.apiKey}`,
                        ).toString('base64')}`,
                },
                
                body: form,
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
        // console.log(response.body);
        sendVerificationEmail(email: string, code: string) {
            this.sendEmail("Verify Your Email", "verify-email", [
                { key: 'code', value: code }, 
                { key: 'username', value: email }, 
            ]);
        }
    
}