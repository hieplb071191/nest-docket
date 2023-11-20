import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {Auth, google} from 'googleapis';


export class GoogleService {
    private oauthClient: any
    constructor(
    ){
        const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
        const GOOGLE_CLIENT_KEY = process.env.GOOGLE_CLIENT_KEY
        this.oauthClient = new google.auth.OAuth2(
          GOOGLE_CLIENT_ID,  
          GOOGLE_CLIENT_KEY
        );
    }


  async authenticate(token: string) {
    try {
      // const tokenResponse = await this.oauthClient.getToken(authorizationCode);

      const payload = await this.oauthClient.getTokenInfo(token);

      // use credential
      // const ticket = await this.oauthClient.verifyIdToken({
      //   idToken: token,
      //   audience: process.env.GOOGLE_CLIENT_ID,
      // });
      // const payload = ticket.getPayload();

      return { googleId: payload['sub'], email: payload['email'] };
    } catch (e) {
      new UnauthorizedException('Auth Google Authentication error');
    }
  }


}