import { instance } from 'api/instance';
import React, { useEffect, useState } from 'react';
import { user, smallUser } from 'types/userList';
import UserProfilePortal from 'helpers/UserProfilePortal';
import UserItem from './UserItem';
import UserProfile from './UserProfile';

const UserList = () => {
  const [smallUser, setSmallUser] = useState<smallUser[]>([]); // 초기값을 빈 배열로 설정
  const [user, setUser] = useState<user[]>([]);
  const [showingUser, setShowingUser] = useState<user>();
  const [currentuser, setCurrentUser] = useState<user>();

  const [show, setShow] = useState(false);

  const getUsers = async () => {
    try {
      const response = await instance.get('accounts/list/');

      if (response.status === 200) {
        setUser(response.data);
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSmallUsers = async () => {
    try {
      const response = await instance.get('accounts/register/');

      if (response.status === 200) {
        setSmallUser(response.data);
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
    getSmallUsers();
  }, []);

  const showUserProfile = (targetEmail: string) => {
    if (user) {
      const [showingUser] = user.filter(
        (element) => element.email === targetEmail,
      );
      setShow(!show);
      setShowingUser(showingUser);
    }
  };

  const onClickToggleShow = () => {
    setShow(!show);
  };

  return (
    <div className="flex flex-col gap-7 mt-[100px] w-full px-[40px] pb-[100px]">
      {user?.map((element) => (
        <UserItem
          key={element.email}
          element={element}
          smallUser={smallUser}
          currentuser={currentuser}
          showUserProfile={showUserProfile}
        />
      ))}

      {show && showingUser && (
        <UserProfilePortal>
          <UserProfile showingUser={showingUser} />
          <div className="absolute top-0 left-0 h-screen flex w-full">
            <div
              tabIndex={0}
              role="button"
              className="flex bg-black opacity-50 fixed top-0 w-screen h-screen z-40"
              onClick={onClickToggleShow}
              onKeyDown={onClickToggleShow}
            ></div>
          </div>
        </UserProfilePortal>
      )}
    </div>
  );
};

export default UserList;
