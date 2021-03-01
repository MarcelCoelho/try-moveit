import { NowRequest, NowResponse } from '@vercel/node';
import axios from 'axios';

interface UserGithub {
  id: string;
  name: string;
  avatar_url: string;
}

export { }

// @vercel/node
// integração para hospedagem da vercel funcionar com servelles em node
export default async (request: NowRequest, response: NowResponse) => {
  const { user } = request.body;

  const api = axios.create({
    baseURL: "https://api.github.com/users",
  });

  const responseGit = await api.get<UserGithub>(`/${user}`);

  return response.json(
    {
      id: responseGit.data.id,
      name: responseGit.data.name,
      avatar_url: responseGit.data.avatar_url
    });
}