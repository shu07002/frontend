import { instance } from 'api/instance';
import ChangeNickname from 'components/editProfile/ChangeNickname';
import ChangePassword from 'components/editProfile/ChangePassword';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

interface UserDataProps {
  nickname: string;
  email: string;
  profile_image: string;
  password: string;
  newPassword: string;
  newPasswordCheck: string;
}

const EditProfilePage = () => {
  const [userData, setUserData] = useState<UserDataProps>({
    nickname: '',
    email: '',
    profile_image: '',
    password: '',
    newPassword: '',
    newPasswordCheck: '',
  });
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
      };
      try {
        const response = await instance.get('accounts/profile/', { headers });
        if (response.status === 200) {
          setUserData((prevState) => ({
            ...prevState,
            nickname: response.data.nickname,
            email: response.data.email,
            profile_image: response.data.profile_image,
          }));
        }
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeProfile = async () => {
    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('nickname', userData.nickname);
    if (newProfileImage) {
      formData.append('profile_image', newProfileImage);
    }

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
        'Content-Type': 'multipart/form-data',
      };
      const response = await instance.put('accounts/profile/', formData, {
        headers,
      });
      if (response.status === 200) {
        setUserData((prevState) => ({
          ...prevState,
          profile_image: response.data.profile_image,
        }));
        console.log('닉네임 변경 완료!');
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const headers = {
        Authorization: `token ${localStorage.getItem(`accessToken`)}`,
      };
      const response = await instance.put(
        'accounts/profile/',
        {
          email: userData.email,
          nickname: userData.nickname,
          current_password: userData.password,
          new_password: userData.newPassword,
          new_password_confirm: userData.newPasswordCheck,
        },
        { headers },
      );
      if (response.status === 200) {
        console.log('비밀번호 변경 완료!');
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setNewProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevState) => ({
          ...prevState,
          profile_image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex justify-center p-[40px]">
      <div className="flex flex-col w-full bg-white rounded-xl p-[30px] gap-[25px]">
        <div className="flex items-center gap-[10px]">
          <div
            className="relative w-[70px] h-[70px] rounded-full opacity-60"
            style={{
              backgroundImage: `url(${userData.profile_image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <button type="button" onClick={handleFileSelect}>
              <img
                src="/icons/edit.png"
                alt="프로필 사진 편집"
                className="absolute top-[25px] left-[25px] w-5 h-5"
              />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
          <span>{userData.email}</span>
        </div>

        <ChangeNickname
          nickname={userData.nickname}
          handleChange={handleChange}
        />
        <button
          type="button"
          onClick={handleChangeProfile}
          className="border border-black rounded-lg p-2 text-sm font-semibold hover:bg-black hover:text-white cursor-pointer"
        >
          프로필 변경
        </button>
        <ChangePassword
          password={userData.password}
          newPassword={userData.newPassword}
          newPasswordCheck={userData.newPasswordCheck}
          handleChange={handleChange}
          handleClickButton={handleChangePassword}
        />
      </div>
    </div>
  );
};

export default EditProfilePage;
