import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <div className="mx-auto max-w-screen-lg py-8 lg:min-w-[1024px]">{children}</div>;
}
