import React, { useEffect, useState } from 'react';

import ChallengeResultItem from './ChallengeResultItem';

import { CHALLENGE_RESULT_LIST } from 'constants/DUMMY';

import axios from 'axios';
import { useUserStore } from 'store/UserStore';

interface Challenge {
  endDate: string;
  exchange: boolean;
  spare: number;
  id: number;
  price: number;
  startDate: string;
  title: string;
}

const challengeListDummy = [
  {
    endDate: '2024-03-25',
    exchange: false,
    spare: 20000,
    id: 4,
    price: 125000,
    startDate: '2024-01-25',
    title: '절약챌린지4',
  },
  {
    endDate: '2024-01-01',
    exchange: true,
    spare: 36990,
    id: 3,
    price: 369000,
    startDate: '2023-12-30',
    title: '절약챌린지3',
  },
  {
    endDate: '2023-03-05',
    exchange: false,
    spare: 140000,
    id: 2,
    price: 500000,
    startDate: '2023-02-05',
    title: '절약챌린지2',
  },
  {
    endDate: '2023-02-05',
    exchange: true,
    spare: 12000,
    id: 1,
    price: 100000,
    startDate: '2023-01-02',
    title: '절약챌린지1',
  },
];
const ChallengeResultList = () => {
  const { accessToken, refreshToken } = useUserStore();
  const [challengeList, setChallengeList] = useState<Challenge[]>([]);

  useEffect(() => {
    axios
      .get(`https://j9c211.p.ssafy.io/api/challenge-management/challenges/expired`, {
        headers: {
          'ACCESS-TOKEN': accessToken,
          'REFRESH-TOKEN': refreshToken,
        },
      })
      .then((res) => {
        console.log(res.data.response);
        setChallengeList(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="space-y-2 mt-3 mb-28">
      {challengeListDummy.map((item, index) => (
        <ChallengeResultItem
          endDate={item.endDate}
          exchange={item.exchange}
          spare={item.spare}
          id={item.id}
          price={item.price}
          startDate={item.startDate}
          title={item.title}
        />
      ))}
    </div>
  );
};

export default ChallengeResultList;
