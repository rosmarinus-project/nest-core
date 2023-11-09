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

    if (this.mysqlConn.state === 'disconnected') {
      await this.connect();
    }

    return this.mysqlConn;
  }

  public async query(sql: string): Promise<any> {
    const conn = await this.getMysqlClient();

    return new Promise<any>((resolve, reject) => {
      conn.query(sql, (error, results) => {
        if (error) {
          return reject(error);
        }

        return resolve(results);
      });
    });
  }

  public async end() {
    return new Promise<void>((resolve, reject) => {
      this.mysqlConn?.end((err) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
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
