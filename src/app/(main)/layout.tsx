import { PropsWithChildren } from 'react';
import NavBar from './NavBar';
import Flex from '../../components/Flex';
import Player from '@/components/Player';
import { fetchArtists } from '../queries';

export default async function Layout({ children }: PropsWithChildren) {
  const artists = await fetchArtists();

  const artistSlugsToName = artists.reduce((memo, next) => {
    memo[String(next.slug)] = next.name;

    return memo;
  }, {} as Record<string, string | undefined>);
  return (
    <Flex column className="h-screen">
      <NavBar />
      {children}
      <Player artistSlugsToName={artistSlugsToName} />
    </Flex>
  );
}
