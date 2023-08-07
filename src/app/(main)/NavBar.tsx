import Link from 'next/link';
import Flex from '../../components/Flex';
import Menu from '../../components/Menu';
import { SimplePopover } from '../../components/Popover';
import { fetchArtists } from '../queries';
import MainNavHeader from './MainNavHeader';

export default async function NavBar() {
  const artists = await fetchArtists();

  const artistSlugsToName = artists.reduce((memo, next) => {
    memo[String(next.slug)] = next.name;

    return memo;
  }, {} as Record<string, string | undefined>);

  return (
    <Flex className="relative h-[50px] max-h-[50px] min-h-[50px] grid-cols-3 justify-around border-b-[1px] border-b-[#aeaeae] bg-white text-[#333333]">
      <MainNavHeader artistSlugsToName={artistSlugsToName} />
      <SimplePopover content={<Menu />}>
        <Flex className="flex-2 h-full cursor-pointer content-end items-center justify-end pr-4 text-center font-medium lg:hidden">
          <div className="flex h-full items-center px-1 active:relative active:top-[1px] active:text-[#333333]">
            MENU
          </div>
        </Flex>
      </SimplePopover>
      <div className="nav hidden h-full flex-[2] items-center justify-end text-center font-medium lg:flex">
        <div className="h-full px-1">
          <Link href="/today" legacyBehavior prefetch={false}>
            <a className="nav-btn">TIH</a>
          </Link>
        </div>
        <div>
          <Link href="/recently-played" legacyBehavior prefetch={false}>
            <a className="nav-btn">RECENTLY PLAYED</a>
          </Link>
        </div>
        <div>
          <Link href="/chat" legacyBehavior prefetch={false}>
            <a className="nav-btn">CHAT</a>
          </Link>
        </div>
        <div>
          <Link href="/ios" legacyBehavior prefetch={false}>
            <a className="nav-btn">iOS</a>
          </Link>
        </div>
        <div>
          <Link href="/sonos" legacyBehavior prefetch={false}>
            <a className="nav-btn">SONOS</a>
          </Link>
        </div>
        <div>
          <Link href="/about" legacyBehavior prefetch={false}>
            <a className="nav-btn">ABOUT</a>
          </Link>
        </div>
      </div>
    </Flex>
  );
}
