import { NextApiRequest, NextApiResponse } from 'next';
import axios from '../../utils/axios';
import { Media, MediaType } from '../../types';
import { parse } from '../../utils/apiResolvers';

interface Response {
  type: 'Success' | 'Error';
  data: Media[] | any;
}

const apiKey = process.env.TMDB_KEY;

export default async function handler(request: NextApiRequest, response: NextApiResponse<Response>) {
  const { type } = request.query;

  try {
    const result = await axios().get(`/trending/${type}/week`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
      },
    });
    const data = parse(result.data.results, type as MediaType);
    response.status(200).json({ type: 'Success', data });
  } catch (error) {
    const err = error as any;
    console.log(err?.response?.data || err?.message || 'Unknown error');
    response.status(500).json({ type: 'Error', data: err?.response?.data || err?.message || 'Internal Server Error' });
  }
}

