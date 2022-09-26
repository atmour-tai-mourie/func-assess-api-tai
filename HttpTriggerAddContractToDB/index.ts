import { AzureFunction, Context, HttpRequest } from "@azure/functions";

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

  const validContractAmount =
    typeof contractAmount === "number" && contractAmount > 0;

  const validInterestRates =
    typeof interestRate === "number" && interestRate > 0;

  if (validContractAmount && validInterestRates && borrower && investor) {
    context.bindings.cosmosDbOutput = JSON.stringify({
      contractAmount,
      interestRate,
      borrower,
      investor,
    });
    context.res = {
      status: 201,
      body: "Contract created",
    };
  } else {
    context.res = {
      status: 400,
      body: "Please pass a valid contract in the request body",
    };
  }
};

export default httpTrigger;
