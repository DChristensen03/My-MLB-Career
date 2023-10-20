import { v4 as uuid } from 'uuid';
import { GraphQLClient, gql } from 'graphql-request';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const client = new GraphQLClient('https://ultimate-fowl-18.hasura.app/v1/graphql', {
    headers: {
      "x-hasura-admin-secret": `fHQMrp2RIy2SqmlbJx6AfOVyytwNqd2wyhlp3xqM59LDqZiLNIlEZ6LUkbCMODyQ`,
    },
  })
  const userid = uuid();

  const data = await client.request(gql`mutation createUser($userid: uuid!) {
        insert_users_one(object: {userid: $userid}) {
          userid
        }
      }`, { userid: userid })

  console.log(data)

  return json(data);
}