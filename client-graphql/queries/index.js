import { gql } from '@apollo/client';

export const GET_ALL_ITEMS = gql`
  query Query {
    getAllItems {
      id
      name
      description
      price
      imgUrl
      createdAt
      updatedAt
      Category {
        id
        name
      }
      Ingredients {
        id
        itemId
        name
      }
      User {
        _id
        email
        role
        phoneNumber
        address
      }
    }
  }
`;

export const GET_ITEM_DETAIL = gql`
  query Query($itemDetailId: Int!) {
    itemDetail(id: $itemDetailId) {
      id
      name
      description
      price
      imgUrl
      createdAt
      updatedAt
      Category {
        id
        name
      }
      Ingredients {
        id
        itemId
        name
      }
      User {
        _id
        email
        role
        phoneNumber
        address
      }
    }
  }
`;
