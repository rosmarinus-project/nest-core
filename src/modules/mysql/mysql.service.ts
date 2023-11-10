import { Injectable } from '@nestjs/common';
import { Pool, createPool, PoolOptions } from 'mysql2';

export interface MysqlInitParams {
  address: string;
  username?: string;
  password: string;
  database?: string;
  port?: number;
}

@Injectable()
export class MysqlService {
  private mysqlPool?: Pool;

  public init(params: MysqlInitParams, options?: PoolOptions) {
    this.mysqlPool = createPool({
      host: params.address,
      port: params.port,
      user: params.username,
      password: params.password,
      database: params.database,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      ...options,
    });
  }

  public async getMysqlClient() {
    if (!this.mysqlPool) {
      throw new Error('mysql 未初始化');
    }

    return this.mysqlPool;
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
      this.mysqlPool?.end((err) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
  }
}
