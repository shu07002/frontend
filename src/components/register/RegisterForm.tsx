import React, { memo, useRef, useState } from 'react';
import { info, err, infoRef } from 'types/register';
import EmailSection from './EmailSection';
import PasswordSection from './PasswordSection';
import NicknameSection from './NicknameSection';
import SignUpSection from './SignUpSection';

// 추가해야될 사항
// 2. 이메일 중복 검사(API 명세서 나오면 시도)
// 5. 닉네임 중복 검사(API 명세서 나오면 시도)

// 추가해야할 사항
// 1. 이메일 중복 검사
// 2. 중복 검사 안하고 회원가입 누르면 경고 메세지
// 3. 중복이 있으면 다른 이메일 사용 요구
// 4. 중복 검사 완료해야 회원가입

interface RegisterProps {
  register: info;
  error: err;
  onChangeRegister(e: React.ChangeEvent<HTMLInputElement>): void;
}

const RegisterForm = ({ register, error, onChangeRegister }: RegisterProps) => {
  const [submitted, setSubmitted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [success, setSuccess] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkPasswordRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);

  const refObj: infoRef = {
    emailRef,
    passwordRef,
    checkPasswordRef,
    nicknameRef,
  };

  return (
    <section className="">
      <form className="p-3 flex flex-col gap-2 bg-white h-screen items-center">
        <h2 className="my-4 text-xl w-[335px]">회원가입</h2>
        <EmailSection
          emailCheck={emailCheck}
          submitted={submitted}
          emailRef={emailRef}
          email={register.email}
          emailErr={error.emailErr}
          onChangeRegister={onChangeRegister}
          setEmailCheck={setEmailCheck}
        />

        <PasswordSection
          submitted={submitted}
          passwordRef={passwordRef}
          checkPasswordRef={checkPasswordRef}
          password={register.password}
          checkPassword={register.checkPassword}
          passwordErr={error.passwordErr}
          checkPasswordErr={error.checkPasswordErr}
          onChangeRegister={onChangeRegister}
        />

        <NicknameSection
          submitted={submitted}
          nicknameRef={nicknameRef}
          nickname={register.nickname}
          nicknameErr={error.nicknameErr}
          onChangeRegister={onChangeRegister}
        />

        <SignUpSection
          emailCheck={emailCheck}
          submitted={submitted}
          register={register}
          error={error}
          refObj={refObj}
          setSubmitted={setSubmitted}
          setSuccess={setSuccess}
        />
      </form>
    </section>
  );
};

export default memo(RegisterForm);
