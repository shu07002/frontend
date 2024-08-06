import React, { ChangeEvent } from 'react';

interface ChangeNicknameProps {
  nickname: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ChangeNickname = ({ nickname, handleChange }: ChangeNicknameProps) => {
  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col gap-[10px]">
        <label htmlFor="nickname" className="font-semibold text-xs">
          닉네임
        </label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          placeholder={nickname}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 text-sm"
        />
      </section>
    </div>
  );
};

export default ChangeNickname;
