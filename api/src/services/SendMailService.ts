import nodemailer, { Transporter } from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport';
import handlebars from 'handlebars'
import fs from 'fs'


class SendMailService {
    private client: Transporter

    constructor() {
        nodemailer.createTestAccount()
            .then(account => {
                const transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: account.user, // generated ethereal user
                        pass: account.pass, // generated ethereal password
                    },
                });

                this.client = transporter
            })
            .catch(e => console.log(e))
    }

    async execute(to: string, subject: string, variables: object, path: string) {
       const templateFileContent = fs.readFileSync(path).toString("utf8")

        const mailTemplateParse = handlebars.compile(templateFileContent)
        
        const html = mailTemplateParse(variables)

        const options: MailOptions = {
            from: 'NPS <noreplay@rocketseat.com>',
            to, 
            subject,
            html,
        }
        const message = await this.client.sendMail(options)
        console.log('Message sent: %s', message.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
    }
}

export default new SendMailService()