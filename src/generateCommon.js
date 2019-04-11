const commonPath = 'src/common';
const makeCamel = require('./utils');
const fs = require('fs');
const mkdirp = require('mkdirp');

function generateFindResult() {
  let findResult = `export class FindResult {
    constructor(public totalCount: number, public payload: any[]) {}
}`;

  mkdirp.sync(`${commonPath}/models/`);
  fs.writeFileSync(`${commonPath}/models/FindResult.ts`, findResult);
}

function generateIResponseDto() {
  let responseDto = `import { Count } from './Count';

  export interface IResponseDto {
    count?: Count;
    totalCount?: number;
    payload: any;
  }
  `;

  mkdirp.sync(`${commonPath}/models/`);
  fs.writeFileSync(`${commonPath}/models/IResponseDto.ts`, responseDto);
}

module.exports = function generateCommon() {
  console.log('Generate common');
  let content = `import { FindOptionsAttributesArray, Transaction } from 'sequelize'
  import { IWhereOptions } from 'sequelize-typescript/lib/interfaces/IWhereOptions'
  
  export interface IFilter<T> {
    where?: IWhereOptions<T>
    fields?
    order?: any
    limit?: number
    skip?: number
    offset?: number
    include?: any[]
    attributes?: FindOptionsAttributesArray
    searchKey?: string
    raw?: boolean
    transaction?: Transaction
  }
  
  export interface IUpdateOption<T> {
    where: Partial<T>
    transaction?: Transaction
  }  
  `;

  mkdirp.sync(`${commonPath}/models`);
  fs.writeFileSync(`${commonPath}/models/QueryOption.ts`, content);

  generateIResponseDto();

  return;
};
