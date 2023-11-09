import { Injectable } from '@nestjs/common';
import { createConnection, Connection } from 'mysql';

export interface MysqlInitParams {
  address: string;
  username?: string;
  password: string;
  database?: string;
}

@Injectable()
export class MysqlService {
  private mysqlConn?: Connection;

  public init(params: MysqlInitParams) {
    this.mysqlConn = createConnection({
      host: params.address,
      user: params.username || 'root',
      password: params.password,
      database: params.database,
    });
  }

  public async getMysqlClient() {
    if (!this.mysqlConn) {
      throw new Error('mysql 未初始化');
    }

    await this.connect();

    return this.mysqlConn;
  }

  private async connect() {
    return new Promise<void>((resolve, reject) => {
      this.mysqlConn?.connect((err) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
  }
}
