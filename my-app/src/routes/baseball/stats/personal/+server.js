import { GraphQLClient, gql } from 'graphql-request';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const client = new GraphQLClient(process.env.CLIENT_ADDRESS, {
    headers: {
      "x-hasura-admin-secret": process.env.ADMIN_SECRET,
    },
  })
  request = await request.json();
  const userid = request.userid;

  const data = await client.request(gql`query MyQuery($userid: uuid!) {
        baseball_career_average(limit: 5, order_by: {average: desc}, where: {userid: {_eq: $userid}}) {
          average
          name
        }
        baseball_career_home_runs(limit: 5, order_by: {total: desc}, where: {userid: {_eq: $userid}}) {
          total
          name
        }
        baseball_career_mvps(limit: 5, order_by: {total: desc}, where: {userid: {_eq: $userid}}) {
          total
          name
        }
        baseball_career_salary(limit: 5, order_by: {total: desc}, where: {userid: {_eq: $userid}}) {
          total
          name
        }
        baseball_career_world_series(limit: 5, order_by: {total: desc}, where: {userid: {_eq: $userid}}) {
          total
          name
        }
        baseball_career_defensive_runs_saved(limit: 5, order_by: {total: desc}, where: {userid: {_eq: $userid}}) {
          total
          name
        }
      }
      `, { userid: userid })

  return json(data);
}