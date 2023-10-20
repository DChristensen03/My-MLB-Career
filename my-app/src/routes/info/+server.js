import { GraphQLClient, gql } from 'graphql-request';
import { json, error, fail } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const client = new GraphQLClient(process.env.CLIENT_ADDRESS, {
        headers: {
            "x-hasura-admin-secret": process.env.ADMIN_SECRET,
        },
    })
    request = await request.json();
    const olduserid = request.olduserid;
    const userid = request.userid;
    const username = request.username;

    const idExists = await client.request(gql`query MyQuery($userid: uuid!) {
        users_by_pk(userid: $userid) {
          userid
        }
      }
      `, { userid })

    let data = {};
    if (idExists.users_by_pk !== null) {
        data = await client.request(gql`mutation MyMutation($olduserid: uuid!, $userid: uuid!, $username: String = "") {
        update_users_by_pk(pk_columns: {userid: $olduserid}, _set: {userid: $userid, username: $username}) {
          username
          userid
        }
      }`, { olduserid, userid, username })
    } else {
        throw error(400, "The given User Key was not found.")
    }

    return json(data.update_users_by_pk);
}