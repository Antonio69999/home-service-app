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
  const result = await request(MASTER_URL, query);
  return result;
};

const getCategories = async () => {
  const query = gql`
    query getCategory {
      categories {
        id
        name
        icon {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessList = async () => {
  const query = gql`
    query getBusinessList {
      businessLists {
        id
        name
        contactPerson
        email
        category {
          name
        }
        about
        adress
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessListByCategory = async (category) => {
  const query =
    gql`
    query getBusinessListByCategory {
      businessLists(where: { category: { name: "` +
    category +
    `" } }) {
        id
        name
        contactPerson
        email
        category {
          name
        }
        about
        adress
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const createBooking = async (data) => {
  const mutationQuery =
    gql`
    mutation createBooking {
      createBooking(
        data: {
          bookingStatus: Booked
          businessList: { connect: { id: "` +
    data.businessId +
    `" } }
          date: "` +
    data.date +
    `"
          time: "` +
    data.time +
    `"
          userEmail: "` +
    data.userEmail +
    `"
          userName: "` +
    data.userName +
    `"
        }
      ) {
        id
      }
      publishManyBookings(to: PUBLISHED) {
        count
      }    
    }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const getUserBookings = async (userEmail) => {
  const query =
    gql`
    query GetUserBookings {
      bookings(orderBy: updatedAt_DESC, where: {userEmail: "` +
    userEmail +
    `"}) {
        userEmail
        userName
        bookingStatus
        date
        id
        businessList {
          id
          images {
            url
          }
          name
          adress
          contactPerson
          email
          about
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  getSlider,
  getCategories,
  getBusinessList,
  getBusinessListByCategory,
  createBooking,
  getUserBookings,
};
