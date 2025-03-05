import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ChallengeMemberList from 'components/ChallengePlay/ChallengeMemberList';
import BottomNav from 'components/Common/BottomNav';

import axios from 'axios';
import { useUserStore } from 'store/UserStore';
import dayjs from 'dayjs';
import ArrowBackParam from 'components/Common/ArrowBackParam';
import { useQuery } from 'react-query';

const ChallengePlayPage = () => {
  const navigate = useNavigate();
  const [challengeId, setChallengeId] = useState(0);
  const [title, setTitle] = useState('절약챌린지');
  const [price, setPrice] = useState(3690000);
  const [period, setPeriod] = useState('28');
  const [players, setPlayers] = useState([]);
  const [spare, setSpare] = useState(1369000);
  const { accessToken, refreshToken, connectedAsset, createdTikkle } = useUserStore();
  const tokenCheck = () => {
    axios
      .post(
        'https://j9c211.p.ssafy.io/api/member-management/members/check/access-token',
        {},
        {
          headers: {
            'ACCESS-TOKEN': accessToken,
            'REFRESH-TOKEN': refreshToken,
          },
        },
      )
      .then((res) => {
        if (res.data.response === false) {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/');
      });
  };
  useEffect(() => {
    // tokenCheck();
    if (connectedAsset === false || createdTikkle === false) {
      navigate('/main');
    }
  }, []);

  const fetchData = async () => {
    try {
      // 방 ID 불러오기
      const response1 = await axios.get(`https://j9c211.p.ssafy.io/api/challenge-management/challenges/state`, {
        headers: {
          'ACCESS-TOKEN': accessToken,
          'REFRESH-TOKEN': refreshToken,
        },
      });

      setChallengeId(response1.data.response.challengeId);
      const chID = response1.data.response.challengeId;

      // 방ID를 이용한 방 정보 불러오기
      const response2 = await axios.get(
        `https://j9c211.p.ssafy.io/api/challenge-management/challenges/progress/${chID}`,
        {
          headers: {
            'ACCESS-TOKEN': accessToken,
            'REFRESH-TOKEN': refreshToken,
          },
        },
      );

      return response2.data.response;
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  // const fetchData = async () => {
  //   try {
  //     // 방 ID 불러오기
  //     const response1 = await axios.get(`https://j9c211.p.ssafy.io/api/challenge-management/challenges/state`, {
  //       headers: {
  //         'ACCESS-TOKEN': accessToken,
  //         'REFRESH-TOKEN': refreshToken,
  //       },
  //     });

  //     setChallengeId(response1.data.response.challengeId);
  //     const chID = response1.data.response.challengeId;

  //     // 방ID를 이용한 방 정보 불러오기
  //     const response2 = await axios.get(
  //       `https://j9c211.p.ssafy.io/api/challenge-management/challenges/progress/${chID}`,
  //       {
  //         headers: {
  //           'ACCESS-TOKEN': accessToken,
  //           'REFRESH-TOKEN': refreshToken,
  //         },
  //       },
  //     );

  //     const challengeState = response2.data.response;
  //     console.log(challengeState);

  //     setTitle(challengeState.title);
  //     setPrice(challengeState.price);
  //     setSpare(challengeState.spare);

  //     const today = dayjs(); // 오늘 날짜
  //     const targetDate = dayjs(challengeState.endDate); // 만기일
  //     const duration = targetDate.diff(today, 'day') + 1;
  //     setPeriod(String(duration));

  //     setPlayers(challengeState.participants); // 사용자 업데이트
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  //
  //   fetchData();
  // }, [challengeId]);

  const {
    data: challengePlay,
    isError,
    isFetching,
  } = useQuery('challengePlay', fetchData, {
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (challengePlay) {
      setTitle(challengePlay.title);
      setPrice(challengePlay.price);
      setSpare(challengePlay.spare);

      console.log(challengePlay.endDate);

      const today = dayjs(); // 오늘 날짜
      const targetDate = dayjs(challengePlay.endDate); // 만기일
      const duration = targetDate.diff(today, 'day') + 1;
      setPeriod(String(duration));

      setPlayers(challengePlay.participants); // 사용자 업데이트
    }
  }, [challengePlay]);

  return (
    <div className="flex flex-col overflow-hidden ">
      <ArrowBackParam pageName="진행중인 챌린지" param="/challenge" />

      <div className="flex flex-col items-center h-full justify-center z-10 mt-8">
        <img src="/Challenge/ChallengePlay2.png" alt="ChallengePlay" className="w-auto h-24 dt:w-auto dt:h-52 " />
        <div className=" border-4 rounded-xl p-3">
          <div className="mr-14 tb:mr-14 dt:mr-32 mb-5 tb:text-md dt:text-xl font-bold">{title}</div>
          <div className="mr-14 tb:mr-14 dt:mr-32 mb-2 tb:text-md dt:text-xl font-bold">{period}일 남았습니다!</div>
          <div className="mr-14 tb:mr-14 dt:mr-32 mb-2 tb:text-md dt:text-xl font-bold">
            목표 소비 금액은 {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원입니다
          </div>
          <div className="mr-14 tb:mr-14 dt:mr-32 mb-2 tb:text-md dt:text-xl font-bold">
            현재 남은 금액은 {spare.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원입니다
          </div>
        </div>
        <ChallengeMemberList players={players} price={price} />
      </div>
      <div className="h-[120px]"></div>
      <BottomNav />
    </div>
  );
};

export default ChallengePlayPage;
