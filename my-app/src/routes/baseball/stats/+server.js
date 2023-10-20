import { GraphQLClient, gql } from 'graphql-request';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const client = new GraphQLClient('https://ultimate-fowl-18.hasura.app/v1/graphql', {
    headers: {
      "x-hasura-admin-secret": `fHQMrp2RIy2SqmlbJx6AfOVyytwNqd2wyhlp3xqM59LDqZiLNIlEZ6LUkbCMODyQ`,
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