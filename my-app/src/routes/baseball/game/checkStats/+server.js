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
  request = await request.json();
  const userid = request.userid;

  const data = await client.request(gql`query CheckTopStats($userid: uuid!) {
        baseball_career_average(where: {userid: {_eq: $userid}}, limit: 5, order_by: {average: asc}) {
          average
          id
        }
        baseball_career_defensive_runs_saved(where: {userid: {_eq: $userid}}, limit: 5, order_by: {total: asc}) {
          total
          id
        }
        baseball_career_home_runs(where: {userid: {_eq: $userid}}, limit: 5, order_by: {total: asc}) {
          total
          id
        }
        baseball_career_mvps(where: {userid: {_eq: $userid}}, limit: 5, order_by: {total: asc}) {
          total
          id
        }
        baseball_career_salary(where: {userid: {_eq: $userid}}, limit: 5, order_by: {total: asc}) {
          total
          id
        }
        baseball_career_world_series(where: {userid: {_eq: $userid}}, limit: 5, order_by: {total: asc}) {
          total
          id
        }
      }`, { userid: userid })

  let average = 0,
    drs = 0,
    home_runs = 0;

  for (let year of request.stats) {
    average += year.average;
    drs += year.drs;
    home_runs += year.home_runs;
  }
  average = Math.round(average / 12);


  //average
  if (data.baseball_career_average.length < 5 || average > data.baseball_career_average[0].average) {
    // Write career average to the db
    if (data.baseball_career_average.length === 5) {
      await client.request(gql`mutation RemoveAverage($id: Int!) {
                delete_baseball_career_average(where: {id: {_eq: $id}}) {
                  affected_rows
                }
            }`, { id: data.baseball_career_average[0].id })
    }
    await client.request(gql`mutation UpdateAverage($userid: uuid!, $average: Int!, $name: String!) {
            insert_baseball_career_average_one(object: {average: $average, userid: $userid, name: $name}) {
              name
              average
              userid
            }
          }
          `, { userid: userid, name: request.name, average });
  }
  //drs
  if (data.baseball_career_defensive_runs_saved.length < 5 || drs > data.baseball_career_defensive_runs_saved[0].total) {
    // Write career drs to the db
    if (data.baseball_career_defensive_runs_saved.length === 5) {
      await client.request(gql`mutation RemoveDRS($id: Int!) {
                delete_baseball_career_defensive_runs_saved(where: {id: {_eq: $id}}) {
                  affected_rows
                }
            }`, { id: data.baseball_career_defensive_runs_saved[0].id })
    }
    await client.request(gql`mutation UpdateDRS($userid: uuid!, $total: Int!, $name: String!) {
            insert_baseball_career_defensive_runs_saved_one(object: {total: $total, userid: $userid, name: $name}) {
              name
              total
              userid
            }
          }
          `, { userid: userid, name: request.name, total: drs });
  }
  //home_runs
  if (data.baseball_career_home_runs.length < 5 || home_runs > data.baseball_career_home_runs[0].total) {
    // Write career home runs to the db
    if (data.baseball_career_home_runs.length === 5) {
      await client.request(gql`mutation RemoveAverage($id: Int!) {
                delete_baseball_career_home_runs(where: {id: {_eq: $id}}) {
                  affected_rows
                }
            }`, { id: data.baseball_career_home_runs[0].id })
    }
    await client.request(gql`mutation UpdateAverage($userid: uuid!, $total: Int!, $name: String!) {
            insert_baseball_career_home_runs_one(object: {total: $total, userid: $userid, name: $name}) {
              name
              total
              userid
            }
          }
          `, { userid: userid, name: request.name, total: home_runs });
  }
  //mvps
  if (data.baseball_career_mvps.length < 5 || request.mvps > data.baseball_career_mvps[0].total) {
    // Write career mvps to the db
    if (data.baseball_career_mvps.length === 5) {
      await client.request(gql`mutation RemoveMVPS($id: Int!) {
                delete_baseball_career_mvps(where: {id: {_eq: $id}}) {
                  affected_rows
                }
            }`, { id: data.baseball_career_mvps[0].id })
    }
    await client.request(gql`mutation UpdateMVPS($userid: uuid!, $total: Int!, $name: String!) {
            insert_baseball_career_mvps_one(object: {total: $total, userid: $userid, name: $name}) {
              name
              total
              userid
            }
          }
          `, { userid: userid, name: request.name, total: request.mvps ? request.mvps : 0 });
  }
  //careerSalary
  if (data.baseball_career_salary.length < 5 || request.totalSalary > data.baseball_career_salary[0].total) {
    // Write career salary to the db
    if (data.baseball_career_salary.length === 5) {
      await client.request(gql`mutation RemoveSalary($id: Int!) {
                delete_baseball_career_salary(where: {id: {_eq: $id}}) {
                  affected_rows
                }
            }`, { id: data.baseball_career_salary[0].id })
    }
    await client.request(gql`mutation UpdateSalary($userid: uuid!, $total: Int!, $name: String!) {
            insert_baseball_career_salary_one(object: {total: $total, userid: $userid, name: $name}) {
              name
              total
              userid
            }
          }
          `, { userid: userid, name: request.name, total: request.totalSalary });
  }
  //world_series
  if (data.baseball_career_world_series.length < 5 || request.totalSalary > data.baseball_career_world_series[0].total) {
    // Write career world series to the db
    if (data.baseball_career_world_series.length === 5) {
      await client.request(gql`mutation RemoveWorldSeries($id: Int!) {
                delete_baseball_career_world_series(where: {id: {_eq: $id}}) {
                  affected_rows
                }
            }`, { id: data.baseball_career_world_series[0].id })
    }
    await client.request(gql`mutation UpdateWorldSeries($userid: uuid!, $total: Int!, $name: String!) {
            insert_baseball_career_world_series_one(object: {total: $total, userid: $userid, name: $name}) {
              name
              total
              userid
            }
          }
          `, { userid: userid, name: request.name, total: request.worldSeries });
  }

  return json(data);
}