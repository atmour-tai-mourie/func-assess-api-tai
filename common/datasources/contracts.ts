import { Container } from '@azure/cosmos';
import { CosmosClientInstance } from '../cosmosClient';

import { v4 as uuidv4 } from 'uuid';
import { Contract } from '../types';

/**
 * Class to handle all contracts container datasource operations
 */
export class Contracts {
  private container: Container;

  constructor() {
    const cosmosClient = CosmosClientInstance.getCosmosClientInstance();
    this.container = cosmosClient.database('spa-app').container('contracts');
  }

  /**
   * Create a contract record in the contracts container
   * @param contract contract details to create new contract
   */
  async createOne(contract: Contract) {
    await this.container.items.create({
      id: uuidv4(),
      ...contract,
    });
  }

  /**
   * Fetch all contracts in the contracts container
   * @returns List of all contracts in the container
   */
  async fetchAll(): Promise<Contract[]> {
    const { resources: data } = await this.container.items
      .readAll<Contract>()
      .fetchAll();
    return data;
  }

  /**
   * Delete a contract from the contracts container
   * @param id Id of the contract
   */
  async deleteOne(id: string) {
    await this.container.item(id, id).delete();
  }
}
