// express
import { Request, Response } from 'express';

// firebase
import * as admin from 'firebase-admin';

// rxjs
import { from } from 'rxjs';
import { uuidv4 } from '../utils';

// local
import { BaseCrudModule } from './base-crud-module';

export class UserModule extends BaseCrudModule {
  constructor(name: string) {
    super(name);
    // user module specific endpoints
    this.config.put('/:userId/promote', this.promote.bind(this));
    this.config.put('/:userId/demote', this.promote.bind(this));
  }

  public list(request: Request, response: Response): void {
    from(admin.auth().listUsers()).subscribe(
      (userListResult) => {
        if (userListResult.pageToken) {
          this.logger.warn(
            `There is more than one page of users. Fetching multiple page is to be implemented`,
            userListResult.pageToken
          );
        }

        response.json(userListResult.users);
      },
      (error) => {
        const correlationId = uuidv4();

        this.logger.error(`An error occured while fetching list of users`, correlationId, error);

        response.sendStatus(500).json({ message: 'Internal Server Error', correlationId });
      }
    );
  }

  public get(request: Request, response: Response): void {
    throw Error('Not implemented');
  }

  public create(request: Request, response: Response): void {
    throw Error('Not implemented');
  }

  public update(request: Request, response: Response): void {
    throw Error('Not implemented');
  }

  public delete(request: Request, response: Response): void {
    throw Error('Not implemented');
  }

  public promote(request: Request, response: Response): void {
    const { userId } = request.params;
    this.setAdminClaim(userId, true, response);
  }

  public demote(request: Request, response: Response): void {
    const { userId } = request.params;
    this.setAdminClaim(userId, false, response);
  }

  private setAdminClaim(userId: string, isAdmin: boolean, response: Response): void {
    from(admin.auth().setCustomUserClaims(userId, { admin: true })).subscribe(
      () => {
        this.logger.info(`User ${userId} ${isAdmin ? 'promoted' : 'demoted'}`);
        response.sendStatus(200);
      },
      (error) => {
        this.logger.error(`An error occured while ${isAdmin ? 'promoting' : 'demoting'} user ${userId}`, error);

        const correlationId = uuidv4();

        response.sendStatus(500).json({ message: 'Internal Server Error', correlationId });
      }
    );
  }
}
