import React, { useState } from 'react';
// import DatePicker from 'react-datepicker'; // 사용할 곳에서 DatePicker를 import
import 'react-datepicker/dist/react-datepicker.css'; // css파일을 불러와야 달력이 덜 못생김.
import { ko } from 'date-fns/esm/locale'; // 한국어 사용을 위해 불러오자.
import dayjs from 'dayjs';
import { Button, Input } from '@material-tailwind/react';
import axios from 'axios';
import { useUserStore } from 'store/UserStore';

/// MUI 데이트 피커

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router';
import { Pincode } from 'components/Common/Pincode';
import SavingComplete from './SavingComplete';
import Loading from 'components/Common/Loading';

const SavingCreate = () => {
  const { accessToken, refreshToken, setCreatedTikkle } = useUserStore();
  const today = dayjs(); // 오늘 날짜
  const [date, setDate] = useState(today.add(-1, 'day').format('YYYY-MM-DD')); // 선택한 날짜를 상태로 저장
  const koreanDate = dayjs(date).format('YYYY년 MM월 DD일'); //
  const [pincodeVisible, setPincodeVisible] = useState(false); // 핀코드 화면
  const [completeVisible, setCompleteVisible] = useState(false); // 적금통 생성 완료 화면
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const duration = Math.max(0, dayjs(date).diff(today, 'day') + 1); // 오늘과 만기일 사이의 날짜 차이
  const navigate = useNavigate();

  // const onCorrectPincode = () => {
  //   setPincodeVisible(false);
  //   setIsLoading(true);
  //   axios
  //     .post(
  //       'https://j9c211.p.ssafy.io/api/asset-management/tikkle',
  //       {
  //         endDate: date,
  //       },
  //       {
  //         headers: {
  //           'ACCESS-TOKEN': accessToken,
  //           'REFRESH-TOKEN': refreshToken,
  //         },
  //       },
  //     )
  //     .then((response) => {
  //       // 적금통 생성 API 요청이 성공한 경우
  //       console.log('POST: BODY(만기일)', date);
  //       setIsLoading(false);
  //       setCreatedTikkle(true);
  //       setCompleteVisible(true);
  //     })
  //     .catch((error) => {
  //       // 에러 처리
  //       setIsLoading(false);
  //       console.error('적금통 생성 실패', error);
  //     });
  // };

  const onCorrectPincode = () => {
    setPincodeVisible(false);
    setIsLoading(true);

    console.log('POST: BODY(만기일)', date);
    setIsLoading(false);
    setCreatedTikkle(true);
    setCompleteVisible(true);
  };

  const handleConfirm = () => {
    setCompleteVisible(false);
    navigate('/main');
  };

  const handleCreate = () => {
    if (duration < 1) {
      setErrorMessage('만기 날짜를 선택해주세요!');
    } else {
      // 핀코드 인증 ()
      setPincodeVisible(true);
    }
  };
  return (
    <div className="flex flex-col items-center h-screen mt-5">
      {isLoading && <Loading />}
      {pincodeVisible && <Pincode onCorrectPincode={onCorrectPincode} visibleFalse={() => setPincodeVisible(false)} />}
      {completeVisible && <SavingComplete onComplete={handleConfirm} />}
      <div className="font-extrabold text-3xl  ">새로운 적금통 만들기</div>
      <div className="font-normal text-sm  text-gray-500 mt-2 text-center">
        우리 어플을 통해 절약한 만큼 돈을 모아보아요.
        <br />
        만기까지 기다리면 추가 이자를 받을 수 있어요!
      </div>
      <Button
        color="cyan"
        onClick={() => {
          navigate('/mypage/product');
        }}
        className="mt-3"
      >
        적금통 상품 정보 읽기
      </Button>
      <div>
        <img className="h-44 dt:h-64" src="/Main/습관저금통.png" alt="pig" />
      </div>

      {/* MUI 달력 */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="만기일을 선택해주세요."
            disablePast={true}
            format="YYYY년 MM월 DD일"
            onChange={(newDate: dayjs.Dayjs | null) => {
              if (newDate) {
                setDate(newDate.format('YYYY-MM-DD'));
              }
            }}
          />
        </DemoContainer>
      </LocalizationProvider>

      <div className="my-4 text-lg font-semibold text-gray-600">만기까지 남은 일자 : {duration}일 </div>
      <Button className="bg-blue-500 w-4/5 text-lg" onClick={handleCreate}>
        적금통 만들기
      </Button>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
};

export default SavingCreate;
