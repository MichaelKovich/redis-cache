import { Request, Response } from "express";
import axios from "axios";

const dataGovApiKey = process.env.DATAGOVAPIKEY;

interface ListOfSchools {
  data: {
    metadata: { total: number; page: number; per_page: number };
    results: [
      {
        "school.name": string;
        "location.lat": number;
        "location.lon": number;
      }
    ];
  };
}

const getSchools = (req: Request, res: Response) => {
  const { name } = req.query;

  console.log("Name: ", name);
  console.log("API Key: ", dataGovApiKey);

  axios
    .get(
      `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${dataGovApiKey}&school.name=${name}&fields=school.name,location.lon,location.lat&per_page=100`
    )
    .then((response: ListOfSchools) => res.status(200).json(response.data))
    .catch((err: any) => {
      console.log(err);
      res.status(202);
    });
};

export default {
  getSchools
};
