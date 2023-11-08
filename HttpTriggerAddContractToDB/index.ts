import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { CosmosClientInstance } from '../common/cosmosClient';
import { v4 as uuidv4 } from 'uuid';

interface ContractInputData {
  contractAmount: number;
  interestRate: number;
  borrower: string;
  investor: string;
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const {
    contractAmount,
    interestRate,
    borrower,
    investor,
  }: ContractInputData = req.body;
  console.log(req.body);

  const validContractAmount =
    typeof contractAmount === 'number' && contractAmount > 0;

  const validInterestRates =
    typeof interestRate === 'number' && interestRate > 0;

  if (validContractAmount && validInterestRates && borrower && investor) {
    const cosmosClient = CosmosClientInstance.getCosmosClientInstance();
    const container = cosmosClient.database('spa-app').container('contracts');

    try {
      await container.items.create({
        id: uuidv4(),
        contractAmount,
        interestRate,
        borrower,
        investor,
      });

      context.res = {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      };
    } catch (error) {
      context.res = {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'Failed to add contract to database',
      };
    }
  } else {
    // TODO: Fix this
    context.res = {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'Please pass a valid contract in the request body',
    };
  }
};

export default httpTrigger;
