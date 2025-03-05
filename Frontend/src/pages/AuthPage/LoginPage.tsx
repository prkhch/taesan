import React, { useState, useEffect } from 'react';
import LoginForm from 'components/Login/LoginForm';
import Landing from 'components/Login/Landing';
import { useUserStore } from 'store/UserStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pincode } from 'components/Login/SimpleLogin';
import TestNotification from 'components/Common/TestNotification';
const LoginPage = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [isSimpleLogin, setIsSimpleLogin] = useState(false);
  const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useUserStore();
  const [visiblePincode, setVisiblePincode] = useState(false);
  const navigate = useNavigate();

  // 랜딩 페이지
  const { setConnectedAsset, setCreatedTikkle } = useUserStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
      setConnectedAsset(false);
      setCreatedTikkle(false);
    }, 2900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleNotification = async () => {
      await TestNotification();
    };

    const timerId = setTimeout(() => {
      handleNotification();
    }, 3000);
    return () => clearTimeout(timerId);
  }, []);

  // 토큰 유효성 검사
  useEffect(() => {
    if (refreshToken) {
      axios
        .post(
          'https://j9c211.p.ssafy.io/api/member-management/members/check/token',
          {},
          {
            headers: {
              'REFRESH-TOKEN': refreshToken,
            },
          },
        )
        .then((response) => {
          console.log('토큰 유효성 검사', response.data);
          setIsSimpleLogin(response.data.response);
          if (response.data.response) {
            setVisiblePincode(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // 핀코드 입력 후 AT,RT 재발급

  const onCorrectPincode = () => {
    setVisiblePincode(false);
    console.log('AT, RT 재발급 성공');
  };

  return (
    <div className="h-full flex items-center justify-center">
      {showLanding ? (
        <Landing />
      ) : isSimpleLogin ? (
        <>
          {visiblePincode && (
            <Pincode onCorrectPincode={onCorrectPincode} visibleFalse={() => setVisiblePincode(false)} />
          )}
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default LoginPage;
