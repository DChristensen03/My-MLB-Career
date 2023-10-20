import { v4 as uuid } from 'uuid';
import { GraphQLClient, gql } from 'graphql-request';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const client = new GraphQLClient(process.env.CLIENT_ADDRESS, {
    headers: {
      "x-hasura-admin-secret": process.env.ADMIN_SECRET,
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