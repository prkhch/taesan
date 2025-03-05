import React, { useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

interface Player {
  name: string;
  spare: number;
}

interface Props {
  players: Player[];
  price: number;
}

const playersDummy: Player[] = [
  { name: '게스트', spare: 1369000 },
  { name: '신규람', spare: 3303950 },
  { name: '배용현', spare: 1540525 },
  { name: '김하영', spare: 562050 },
  { name: '김성준', spare: 2123000 },
  { name: '이지헌', spare: 1151000 },
  { name: '박희창', spare: 2550055 },
];

const ChallengeMemberList = ({ players, price }: Props) => {
  console.log('GET_챌린지 멤버');
  //   방장 판단 함수
  return (
    <div className="tb:text-md dt:text-xl font-bold w-2/3 bg-[#E3E9ED] rounded-xl">
      {playersDummy.map((player, index) => (
        <div key={index} className="flex flex-col justify-end mx-10 my-3">
          {index === 0 ? `👑 ${player.name}` : player.name}
          {/* {Math.round((player.spare / price) * 100)}% */}
          <ProgressBar
            completed={Math.round((player.spare / price) * 100)}
            bgColor="#0046FF"
            customLabel={String(Math.round((player.spare / price) * 100)) + '%'}
            animateOnRender
            transitionDuration="3s"
            height="20px"
            borderRadius="5px"
          />
        </div>
      ))}
    </div>
  );
};

export default ChallengeMemberList;
