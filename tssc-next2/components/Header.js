import Image from 'next/image';

export default function Header({ data }) {
  return (
    <header className="header">
      <div className="page-col">
        <Image
          src="/images/logo-white-bg.png"
          alt="The Serial Sales Community"
          width={80}
          height={48}
          className="header__logo"
          priority
        />
        <p className="header__name">The Serial Sales Community</p>
      </div>
    </header>
  );
}
