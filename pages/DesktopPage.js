import Image from 'next/image';

// Assets
import imgSrc from '../public/images/mobile-user.svg';

export default function DesktopPage() {
  return (
    <div className="text-white h-screen w-screen flex flex-col items-center justify-center gap-10 xl:gap-0 bg-dark-jungle-green">
      {/* ----------- Title ----------- */}
      <div className="flex flex-col-reverse items-center xl:flex-row xl:gap-10">
        <div className="text-6xl font-dark uppercase xl:text-7xl">
          <p><span className="text-sunset-orange">Rumble</span> Mobile</p>
        </div>
        <Image src={imgSrc} alt="user sitting on the ground using phone." width={600} />
      </div>
      {/* ----------- Text ----------- */}
      <div className="text-xl text-center leading-10 xl:text-2xl">
        <p>
          We got the best engineers to make this app perfect for your phone!
          <br />
          Visit us on any mobile device at <span className="font-dark">rumble.io</span>
        </p>
      </div>
    </div>
  );
}