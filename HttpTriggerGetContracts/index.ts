import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { CosmosClientInstance } from '../common/cosmosClient';

interface Contract {
  contractID: string;
  contractAmount: number;
  interestRate: number;
  borrower: string;
  investor: string;
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const cosmosClient = CosmosClientInstance.getCosmosClientInstance();
  const container = cosmosClient.database('spa-app').container('contracts');

  try {
    const { resources: data } = await container.items.readAll().fetchAll();

    context.res = {
      body: {
        data,
      },
    };
  } catch (e) {
    context.res = {
      status: 400,
      body: 'Failed to fetch contracts',
    };
    console.error('Failed to fetch contracts', e);
  }
};

export default httpTrigger;
