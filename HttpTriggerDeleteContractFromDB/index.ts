import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { Contracts } from '../common/datasources/contracts';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const contractsDatasource = new Contracts();

  try {
    await contractsDatasource.deleteOne(req.params.id);

    context.res = {
      status: 200,
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
