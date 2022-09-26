import { AzureFunction, Context, HttpRequest } from "@azure/functions";

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
  const contractsData: Contract[] = context.bindings.retreiveContractData;
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: contractsData,
  };
};

export default httpTrigger;
