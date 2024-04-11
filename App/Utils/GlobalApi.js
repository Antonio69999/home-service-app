import { request, gql } from "graphql-request";

const MASTER_URL =
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cluux0qtr0n7f07um9w1nr48v/master";

const getSlider = async () => {
  const query = gql`
    query getSliders {
      sliders {
        id
        name
        image {
          url
        }
      }
    }
  `;
  const result = await request("https://api.spacex.land/graphql/", query);
  return result;
};

export default {
  getSlider,
};