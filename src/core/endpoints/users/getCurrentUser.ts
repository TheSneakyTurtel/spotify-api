import { QueryConstructor } from '../..';
import { deepFreeze, spotifyFetch } from '../../../utils';

let cachedUser: User | undefined;

/**
 * Accesses the Spotify /me endpoint to get information regarding the current
 * user. The User data is cached and put in deep freeze to prevent needing
 * to refetch the data or having other functions modify the cached data
 * @returns User
 */
export const getCurrentUser: QueryConstructor<Promise<User>> =
  () =>
  async ({ token }) => {
    if (cachedUser) return cachedUser;
    const endpoint = `me`;
    const data = await spotifyFetch<User>(endpoint, token);
    deepFreeze(data);
    cachedUser = data;
    return data;
  };

type User = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: true;
    filter_locked: true;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  product: string;
  type: string;
  uri: string;
};
