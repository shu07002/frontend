import { instance } from 'api/instance';
import React, { useRef } from 'react';

interface EmailSectionProps {
  emailCheck: boolean;
  submitted: boolean;
  emailRef: React.RefObject<HTMLInputElement>;
  email: string;
  emailErr: boolean;
  onChangeRegister(e: React.ChangeEvent<HTMLInputElement>): void;
  setEmailCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailSection = ({
  emailCheck,
  submitted,
  emailRef,
  email,
  emailErr,
  onChangeRegister,
  setEmailCheck,
}: EmailSectionProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userListRef = useRef<any[]>([]);
  const usingRef = useRef<HTMLSpanElement>(null);

  const niceInputEmail = () => {
    if (submitted) {
      if (usingRef.current) usingRef.current.style.display = 'block';

      if (!emailErr) {
        return '이메일 형식을 입력해 주세요';
      }
      if (!emailCheck) {
        return '이메일 중복을 확인하세요';
      }
    }

    return null;
  };

  // 중복 확인 하는 곳
  const onAvail = async () => {
    try {
      const respone = await instance.get('accounts/register/');
      if (respone.status === 200) {
        userListRef.current = respone.data; // <- 이 녀석 배열인가?

        if (!userListRef.current?.some((element) => element.email === email)) {
          setEmailCheck(true);
          alert('사용 가능한 이메일입니다.');
        } else {
          alert('이미 사용중인 이메일입니다.');
        }
      }
    } catch (error) {
      console.log('ERROR OCCURED');
    }

    // 데이터 받아보면서 해결하자
    // 아직 잘 모르겠음
  };

  return (
    <section>
      <span className="text-sm">이메일</span>

      <div className="flex gap-2 my-2 w-[335px] mx-auto ">
        <div
          className="flex-1 mx-auto rounded-lg border border-gray-300 w-[250px] h-[50px] flex items-center justify-between px-3 bg-white"
          ref={emailRef}
        >
          <input
            autoComplete="off"
            className="w-[250px] outline-none "
            name="email"
            value={email}
            type="text"
            placeholder="example01@abc.com"
            onChange={onChangeRegister}
          />
        </div>
        <button
          className="rounded-lg text-xs 
      border bg-yellow-300 px-2 shadow-md"
          type="button"
          onClick={onAvail}
        >
          중복 확인
        </button>
      </div>
      <span ref={usingRef} className="px-3 text-xs text-red-400 hidden">
        {niceInputEmail()}
      </span>
    </section>
  );
};

export default EmailSection;
