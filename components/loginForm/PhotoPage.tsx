import { useState, useEffect } from 'react';

// Assets
import loginFormModel from '../../scripts/models/loginForm';

// Components
import LoginPageLayout from './LoginPageLayout';
import ImgUpload from './ImgUpload/ImgUpload';

interface PhotoPageProps {
  readonly userPhoto?: string;
  readonly isVisible: Boolean;
  readonly goPrevPage: () => void;
  readonly goNextPage: () => void;
};

export default function PhotoPage({
  userPhoto, isVisible, goPrevPage, goNextPage,
}: PhotoPageProps) {
  const [imgSrc, setImgSrc] = useState(userPhoto || '');

  useEffect(() => {
    loginFormModel.updatePhoto(imgSrc);
  }, [imgSrc]);

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
        <ImgUpload setImg={setImgSrc} defaultImg={imgSrc} />
      </div>
    </LoginPageLayout>
  );
}
