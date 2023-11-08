import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { CosmosClientInstance } from '../common/cosmosClient';
import { Contracts } from '../common/datasources/contracts';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const contractsDatasource = new Contracts();

  try {
    const data = await contractsDatasource.fetchAll();

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
