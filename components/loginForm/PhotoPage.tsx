import { useState } from 'react';

// Components
import LoginPageLayout from './LoginPageLayout';
import ImgUpload from './ImgUpload/ImgUpload';

interface PhotoPageProps {
  readonly isVisible: Boolean;
  readonly goPrevPage: () => void;
  readonly goNextPage: () => void;
};

export default function PhotoPage({
  isVisible, goPrevPage, goNextPage,
}: PhotoPageProps) {
  const [imgSrc, setImgSrc] = useState('');

  return (
    <LoginPageLayout
      isVisible={isVisible}
      goPrevPage={goPrevPage}
      goNextPage={goNextPage}
      title="Upload photo"
      description="This is how your friends will see you on Rumble."
      centerText
      showButton={Boolean(imgSrc)}
    >
      <div className="flex-1 my-8 m-auto">
        <ImgUpload setImg={setImgSrc} />
      </div>
    </LoginPageLayout>
  );
}
