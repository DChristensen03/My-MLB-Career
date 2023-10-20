import { GraphQLClient, gql } from 'graphql-request';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  console.log(process.env.CLIENT_ADDRESS, process.env.ADMIN_SECRET)
  const client = new GraphQLClient(process.env.CLIENT_ADDRESS, {
    headers: {
      "x-hasura-admin-secret": process.env.ADMIN_SECRET,
    },
  })
  request = await request.json();

  const data = await client.request(gql`query {
        baseball_career_average(limit: 5, order_by: {average: desc}) {
          average
          name
        }
        baseball_career_home_runs(limit: 5, order_by: {total: desc}) {
          total
          name
        }
        baseball_career_mvps(limit: 5, order_by: {total: desc}) {
          total
          name
        }
        baseball_career_salary(limit: 5, order_by: {total: desc}) {
          total
          name
        }
        baseball_career_world_series(limit: 5, order_by: {total: desc}) {
          total
          name
        }
        baseball_career_defensive_runs_saved(limit: 5, order_by: {total: desc}) {
          total
          name
        }
      }`)

  return json(data);
}