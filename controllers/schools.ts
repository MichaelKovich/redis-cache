import {Request, Response} from 'express';
import {RedisClient} from 'redis';

import axios from 'axios';

const dataGovApiKey = process.env.DATAGOV_API_KEY;

interface ListOfSchools {
  data: {
    metadata: {total: number; page: number; per_page: number};
    results: [
      {
        'school.name': string;
        'location.lat': number;
        'location.lon': number;
      }
    ];
  };
}

const getSchools = (req: Request, res: Response, redisClient: RedisClient) => {
  const {name} = req.query;

  redisClient.get(`schools/${name}`, (err, result) => {
    if (!result) {
      console.log('No cached data available for ' + `"${name}."`);
      axios
        .get(
          `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${dataGovApiKey}&school.name=${name}&fields=school.name,location.lon,location.lat&per_page=100`
        )
        .then((response: ListOfSchools) => {
          res.status(200).json(response.data);
          redisClient.setex(
            'schools/' + name,
            43200,
            JSON.stringify(response.data)
          );
        })
        .catch((err: any) => {
          console.log(err);
          res.status(400);
        });
    } else {
      console.log('Cached data available for ' + `"${name}."`);
      res.status(200).json(result);
    }
  });
};

export default {
  getSchools
};
