import React from 'react';
import { Avatar, Typography, ListItemPrefix } from '@material-tailwind/react';
import axios from 'axios';
import { useUserStore } from 'store/UserStore';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
const HabitListProceeding = () => {
  const dummyHabitData = {
    response: [
      {
        habitId: 1,
        habitName: '담배',
        startDate: '2024-03-01',
        saving: 4500,
      },
      {
        habitId: 2,
        habitName: '커피',
        startDate: '2024-02-20',
        saving: 45000,
      },
      {
        habitId: 3,
        habitName: '택시',
        startDate: '2024-01-10',
        saving: 92000,
      },
    ],
  };

  const navigate = useNavigate();
  const { accessToken, refreshToken } = useUserStore();

  // 쿼리 1
  const proceedingHabit = async () => {
    const { data: proceedingHabit } = await axios.get(
      'https://j9c211.p.ssafy.io/api/habit-management/habits/progress',
      {
        headers: {
          'ACCESS-TOKEN': accessToken,
          'REFRESH-TOKEN': refreshToken,
        },
      },
    );
    console.log(proceedingHabit);

    return proceedingHabit;
  };
  // const query = useQuery('getInfo', getInfo);
  const { data } = useQuery({
    queryKey: ['proceedingHabit'],
    queryFn: proceedingHabit,
  });

  return (
    <div>
      <div className="w-full flex flex-col justify-between mt-2">
        {dummyHabitData
          ? dummyHabitData.response.map((habit: any, index: number) => (
              <div
                className="w-full flex justify-between mt-2"
                onClick={() => {
                  navigate(`/habit/detail/${habit.habitId}`);
                }}
              >
                <ListItemPrefix>
                  {habit.habitName === '담배' ? (
                    <img className="p-1 w-14" alt="candice" src="/Habit/담배.png" />
                  ) : habit.habitName === '술' ? (
                    <img className="p-1 w-14" alt="candice" src="/Habit/술.png" />
                  ) : habit.habitName === '택시' ? (
                    <img className="p-1 w-14" alt="candice" src="/Habit/택시.png" />
                  ) : habit.habitName === '커피' ? (
                    <img className="p-1 w-14" alt="candice" src="/Habit/커피.png" />
                  ) : (
                    <img className="p-1 w-14" alt="candice" src={`/Category/${habit.habitName}.png`} />
                  )}
                </ListItemPrefix>
                <div className="w-full flex justify-between">
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      {habit.habitName}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      {dayjs(habit.startDate).format('시작일 : YYYY-MM-DD')}
                    </Typography>
                  </div>
                  <div className="flex items-center">
                    <Typography variant="h6" color="green">
                      {habit.saving.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                    </Typography>
                  </div>
                </div>
              </div>
            ))
          : ''}
      </div>
    </div>
  );
};

export default HabitListProceeding;
