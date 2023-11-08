import { CosmosClient, CosmosClientOptions } from '@azure/cosmos';
import { getEnv } from '../utils/getEnv';

export class CosmosClientInstance {
  static cosmosClient: CosmosClient | undefined;

  /**
   * Get the cosmos client instance
   * Creates a new instance of the CosmosClient if one does not already exist.
   * @returns { CosmosClient } The CosmosClient instance
   */
  static getCosmosClientInstance = (): CosmosClient => {
    if (!this.cosmosClient) {
      const cosmosConfig: CosmosClientOptions = {
        endpoint: getEnv('COSMOS_ENDPOINT'),
        key: getEnv('COSMOS_KEY'),
      };

      this.cosmosClient = new CosmosClient(cosmosConfig);
    }
    return this.cosmosClient;
  };
}
