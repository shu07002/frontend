import { instance } from 'api/instance';
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { info, err, infoRef } from 'types/register';

interface SignUpSectionProps {
  emailCheck: boolean;
  submitted: boolean;
  register: info;
  error: err;
  refObj: infoRef;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpSection = ({
  emailCheck,
  register,
  error,
  refObj,
  submitted,
  setSubmitted,
  setSuccess,
}: SignUpSectionProps) => {
  const mountRef = useRef(false);
  const navigate = useNavigate();

  const applyStyle = (errorType: boolean) => {
    return errorType ? '1px solid rgb(50,180,50)' : '1px solid red';
  };

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = !mountRef.current;
      return;
    }
    if (submitted) {
      if (!emailCheck && error.emailErr) {
        refObj.emailRef.current?.style.setProperty(
          'border',
          '1px solid #FF7F00',
        );
      } else {
        refObj.emailRef.current?.style.setProperty(
          'border',
          applyStyle(error.emailErr),
          // 여기는 중복확인까지 해서 스타일 적용
          // 중복확인에 사용하는 props drilling 해야함
          // 형식은 맞지만 중복확인 안하면 border orange
        );
      }

      refObj.passwordRef.current?.style.setProperty(
        'border',
        applyStyle(error.passwordErr),
      );
      refObj.checkPasswordRef.current?.style.setProperty(
        'border',
        applyStyle(error.checkPasswordErr && error.passwordErr),
      );
      refObj.nicknameRef.current?.style.setProperty(
        'border',
        applyStyle(error.nicknameErr),
      );
    }
  }, [submitted, error, emailCheck]);

  const onSubmit = async () => {
    setSubmitted(true);

    const body = {
      email: register.email,
      nickname: register.nickname,
      password: register.password,
    };

    try {
      const response = await instance.post('accounts/register/', body);

      if (response.status === 201) {
        setSuccess(true);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
      <div className="mt-[20px] text-center flex flex-col gap-4 items-center">
        <button
          onClick={onSubmit}
          className="rounded-lg bg-black w-[335px] h-[45px] shadow-md text-white"
          type="button"
        >
          회원가입
        </button>
        <div>
          <span>이미 회원이신가요? </span>
          <Link className="underline" to="/login">
            로그인하기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpSection;
