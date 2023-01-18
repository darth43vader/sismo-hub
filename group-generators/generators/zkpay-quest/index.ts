import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  Tags,
  ValueType,
  FetchedData,
  GroupWithData,
  AccountSource,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Here you are hacker 😈

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily, // you generate the group everyday
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const restProvider = new dataProviders.RestProvider();

    const response = await restProvider.fetchData({
      url: "https://zkpay.finance/api/v1/sismo/quest/user-list",
      method: "get",
    });

    const dataProfiles: FetchedData = {};
    console.log(response)
    // for (const item of response.data){
    //   {dataProfiles[item.questAddress] = "1" }
    // }

    // fix of response.data that is not an enumerable (undefined)
    for (const item in response){
      dataProfiles[item] = 1
    }

    return [
      {
        name: "zkpay-quest", // give a name to your group
        timestamp: context.timestamp,
        // two different data formats in the group
        // ethereum account -> "0x95af97aBadA3b4ba443ff345437A5491eF332bC5": "1", 
        // github account ->   "github:mylogin": "1"
        data: dataProfiles, // we reference the final data we created
        // we reference the different sources of our data
        // ethereum accounts and github accounts
        accountSources: [AccountSource.ETHEREUM], 
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;