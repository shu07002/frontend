import LoginPage from 'pages/login/LoginPage';
import MyPage from 'pages/my/MyPage';
import RegisterPage from 'pages/register/RegisterPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from 'pages/home/HomePage';
import ResultQuotePage from 'pages/resultQuote/ResultQuotePage';
import Redirection from 'pages/login/Redirection';
import WriteQuotePage from 'pages/writeQuote/WriteQuotePage';
import UserListPage from 'pages/userList/UserListPage';
import DeleteAccount from 'components/my/DeleteAccount';
import EditProfilePage from 'pages/editProfile/EditProfilePage';

function Router() {
  return (
    <div className="mt-16 ">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resultQuote/:id" element={<ResultQuotePage />} />
        <Route path="/writeQuote" element={<WriteQuotePage />} />
        <Route path="/userList" element={<UserListPage />} />
        <Route path="/auth/callback/" element={<Redirection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/deleteAccount" element={<DeleteAccount />} />
        <Route path="/editProfile" element={<EditProfilePage />} />
      </Routes>
    </div>
  );
}
// cf) Redirection 페이지는 카카오 로그인 성공이 이동하는 페이지 입니다.
export default Router;
