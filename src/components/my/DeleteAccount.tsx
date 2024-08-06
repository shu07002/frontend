import { instance } from 'api/instance';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrMsg(false);
  };

  useEffect(() => {
    onGetUserEmail();
  }, []);

  // 유저 이메일 받아오기
  const onGetUserEmail = async () => {
    try {
      const response = await instance.get('accounts/profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (response.status === 200) {
        setEmail(response.data.email);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 로그인 API 이용해서 지울 수 있는지 확인
  const onCheckDeletion = async () => {
    const body = {
      email,
      password,
    };
    try {
      const response = await instance.post('accounts/login/', body);
      if (response.status === 200) {
        return true;
      }
    } catch (err) {
      setErrMsg(true);
    }
    return false;
  };

  // 회원 정보 지우는 함수
  const onDeleteButton = async () => {
    const canDelete = await onCheckDeletion();
    if (canDelete) {
      try {
        const response = await instance.delete('accounts/profile/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (response.status === 204) {
          window.localStorage.removeItem('accessToken');
          alert('탈퇴하였습니다');
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-screen fixed top-0 left-1/2 right-1/2 z-50">
      <form className="p-3 flex flex-col gap-3 bg-white h-[290px] items-center w-[300px] rounded-lg relative top-28">
        <div className="my-4 text-xl">
          <h2 className="text-xl w-[260px]">회원 탈퇴</h2>
        </div>
        <section>
          <span className="text-sm">비밀번호</span>
          <div className="gap-2 my-2 w-[260px] flex-1 mx-auto rounded-lg border border-gray-300  h-[50px] flex items-center justify-between px-3 bg-white">
            <input
              value={password}
              onChange={onChangePassword}
              type={showPassword ? 'text' : 'password'}
              className="outline-none flex-1"
              name="password"
              placeholder="비밀번호를 입력하세요"
            />
            <button type="button">
              <img
                onClick={toggleShowPassword}
                src={
                  !showPassword ? '/icons/eyeClosed.svg' : '/icons/eyeOpend.svg'
                }
                alt="눈"
                onKeyDown={toggleShowPassword}
              />
            </button>
          </div>
        </section>
        <section className="text-center text-sm text-red-500">
          <span>{errMsg ? '비밀번호가 일치하지 않습니다.' : ''}</span>
          <button
            className="rounded-lg bg-black w-[260px] h-[45.5px] shadow-md text-white mt-3"
            type="button"
            onClick={onDeleteButton}
          >
            탈퇴하기
          </button>
        </section>
      </form>
    </div>
  );
};

export default DeleteAccount;
