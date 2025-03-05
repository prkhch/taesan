import React, { useEffect, useState } from 'react';
import Card from 'components/Common/Card';
import HistoryList from 'components/History/HistoryList';
import ArrowBack from 'components/Common/ArrowBack';
import BottomNav from 'components/Common/BottomNav';
import axios from 'axios';
import { useUserStore } from 'store/UserStore';
import { useInfiniteQuery } from 'react-query';
import { useAssetStore } from 'store/AssetStore';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const [cardId, setCardId] = useState(0);
  const [cardNumber, setCradNumber] = useState('');
  const [cardCompany, setCradCompany] = useState('');
  const [transactionDTOList, setTransactionDTOList] = useState([]);
  const [cardType, setCardType] = useState('');
  const [page, setPage] = useState(1);
  const { selectedCardId } = useAssetStore();
  const { accessToken, refreshToken, connectedAsset, createdTikkle, name } = useUserStore();
  const navigate = useNavigate();
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
    if (connectedAsset === false) {
      navigate('/main');
    }
  }, []);

  // const getHistory = async (page:number) => {
  //   try {
  //     const response = await axios.get(
  //       `https://j9c211.p.ssafy.io/mydata/card-management/cards/1/approval-domestic/test`,
  //       {
  //         params: {
  //           cardId: cardid,
  //           cursor: page,
  //           limit: 10
  //         },
  //         headers: {
  //           'ACCESS-TOKEN': accessToken,
  //           'REFRESH-TOKEN': refreshToken,
  //         },
  //       }
  //     );
  //     setCardUser(response.data.card.name)
  //     setCradNumber(response.data.card.cardNumber)
  //     setCradCompany(response.data.card.cardCompany)
  //     setTransactionDTOList(response.data.transactionDTOList)
  //     setPage(response.data.next_page)
  //     console.log(page)
  //     console.log(response.data)
  //     return response.data.transactionDTOList;
  //   } catch (error) {
  //     console.error(error);
  //     return [];
  //   }
  // };

  // const getHistory = async (page: any) => {
  //   try {
  //     const response = await axios.get(`https://j9c211.p.ssafy.io/api/transactions/history/${selectedCardId}`, {
  //       params: {
  //         cursor: page,
  //         limit: 10,
  //       },
  //       headers: {
  //         'ACCESS-TOKEN': accessToken,
  //         'REFRESH-TOKEN': refreshToken,
  //       },
  //     });
  //     setPage(response.data.response.cursor);
  //     setCradNumber(response.data.response.card.cardNumber);
  //     setCradCompany(response.data.response.card.cardCompany);
  //     setCardType(response.data.response.card.cardType);
  //     setCardId(response.data.response.card.cardId);

  //     console.log(response.data);
  //     return response.data.response.transactionDTOList;
  //   } catch (error) {
  //     console.error(error);
  //     return [];
  //   }
  // };

  // 카드 정보 (더미 데이터)
  const cardInfo = {
    cardNumber: '1234-5678-9012-3456',
    cardCompany: '국민은행',
    cardType: '신용카드',
    cardId: 1,
  };

  const getHistory = async (page: number) => {
    // 현재 페이지에 해당하는 거래 내역 필터링 (10개씩 반환)
    const transactions = dummyTransactions.filter((tx) => tx.page === page);

    // 상태 업데이트
    setPage(page + 1); // 다음 페이지를 위해 page 증가
    setCradNumber(cardInfo.cardNumber);
    setCradCompany(cardInfo.cardCompany);
    setCardType(cardInfo.cardType);
    setCardId(cardInfo.cardId);
    console.log('로컬 데이터 반환:', transactions);

    return transactions;
  };

  // const getHistory = async (page:any) => {
  //   try {
  //     const response = await axios.get(
  //       `https://j9c211.p.ssafy.io/mydata/card-management/cards/1/approval-domestic/test`,
  //       {
  //         params: {
  //           org_code: "ssafy101",
  //           from_date: "20230811",
  //           to_date: "20230811",
  //           next_page: page,
  //           limit: 10
  //         },
  //         headers: {
  //           'x-api-tran-id': "1",
  //           'x-api-type': "1",
  //         },
  //       }
  //     );
  //     setPage(response.data.next_page)
  //     console.log(page)
  //     console.log(response.data)
  //     return response.data.approved_list;
  //   } catch (error) {
  //     console.error(error);
  //     return [];
  //   }
  // };

  // const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery('transactions', () => getHistory(page), {
  //   getNextPageParam: (lastPage) => {
  //     if (lastPage.length === 10) {
  //       // 다음 페이지가 있는 경우 다음 페이지 번호 반환
  //       return lastPage[lastPage.length - 1].page + 1;
  //     } else {
  //       return false; // 더 이상 데이터가 없는 경우 false 반환
  //     }
  //   },
  //   refetchOnWindowFocus: false,
  //   cacheTime: 0,
  // });

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    'transactions',
    ({ pageParam = 1 }) => getHistory(pageParam), // pageParam을 기본값 1로 설정
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : false;
      },
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  );

  return (
    <div>
      <ArrowBack pageName="거래내역" />
      <Card name={name} cardNumber={cardNumber} cardCompany={cardCompany} main="" cardId={cardId} cardType={cardType} />
      <HistoryList
        transactionDTOList={data ? data.pages.flat() : []}
        fetchNextPage={fetchNextPage}
        hasNextPage={!!hasNextPage}
        isFetching={isFetching}
      />
      <BottomNav />
    </div>
  );
};

export default HistoryPage;

// const getHistory = () =>{
//   axios.get(`https://j9c211.p.ssafy.io/api/transactions/hisotry/${selectedCardId}`, {
//   params: {
//     cardId: cardid,
//     cursor: 0,
//     limit: 20,
//   },
//   headers: {
//       'ACCESS-TOKEN': accessToken,
//       'REFRESH-TOKEN': refreshToken,
//       },
//   })
//   .then((response)=>{
//     setCardUser(response.data.card.name)
//     setCradNumber(response.data.card.cardNumber)
//     setCradCompany(response.data.card.cardCompany)
//     setTransactionDTOList(response.data.transactionDTOList)
//     console.log(response)
//   })
//   .catch((error)=>{
//     console.log(error)
//   })
// }

// useEffect(
//   getHistory
// ,[])

const dummyTransactions = [
  // ✅ [1페이지] 데이터 (10개)
  {
    cardHistoryId: 1,
    approvedAmount: 15000,
    approvedNum: 1,
    cardType: '신용카드',
    category: '편의점',
    dateTime: '2024-03-05T10:30:00',
    shopName: 'GS25',
    shopNumber: '02-1234-5678',
    transactionId: 101,
    page: 1,
  },
  {
    cardHistoryId: 2,
    approvedAmount: 120000,
    approvedNum: 2,
    cardType: '체크카드',
    category: '디지털_가전',
    dateTime: '2024-03-04T15:00:00',
    shopName: '하이마트',
    shopNumber: '031-9876-5432',
    transactionId: 102,
    page: 1,
  },
  {
    cardHistoryId: 3,
    approvedAmount: 25000,
    approvedNum: 3,
    cardType: '신용카드',
    category: '편의점',
    dateTime: '2024-03-03T18:45:00',
    shopName: 'CU 편의점',
    shopNumber: '070-5678-1234',
    transactionId: 103,
    page: 1,
  },
  {
    cardHistoryId: 4,
    approvedAmount: 50000,
    approvedNum: 4,
    cardType: '체크카드',
    category: '병원',
    dateTime: '2024-03-02T12:20:00',
    shopName: '병원',
    shopNumber: '010-8765-4321',
    transactionId: 104,
    page: 1,
  },
  {
    cardHistoryId: 5,
    approvedAmount: 8000,
    approvedNum: 5,
    cardType: '신용카드',
    category: '카페',
    dateTime: '2024-03-01T20:10:00',
    shopName: '스타벅스',
    shopNumber: '02-3456-7890',
    transactionId: 105,
    page: 1,
  },
  {
    cardHistoryId: 6,
    approvedAmount: 45000,
    approvedNum: 6,
    cardType: '체크카드',
    category: '대형마트',
    dateTime: '2024-02-28T14:05:00',
    shopName: '이마트',
    shopNumber: '031-5555-6666',
    transactionId: 106,
    page: 1,
  },
  {
    cardHistoryId: 7,
    approvedAmount: 7000,
    approvedNum: 7,
    cardType: '신용카드',
    category: '교통',
    dateTime: '2024-02-27T08:30:00',
    shopName: '지하철',
    shopNumber: '-',
    transactionId: 107,
    page: 1,
  },
  {
    cardHistoryId: 8,
    approvedAmount: 300000,
    approvedNum: 8,
    cardType: '체크카드',
    category: '의류',
    dateTime: '2024-02-26T13:20:00',
    shopName: '나이키',
    shopNumber: '031-8888-9999',
    transactionId: 108,
    page: 1,
  },
  {
    cardHistoryId: 9,
    approvedAmount: 25000,
    approvedNum: 9,
    cardType: '신용카드',
    category: '편의점',
    dateTime: '2024-02-25T16:50:00',
    shopName: '세븐일레븐',
    shopNumber: '070-3333-4444',
    transactionId: 109,
    page: 1,
  },
  {
    cardHistoryId: 10,
    approvedAmount: 12000,
    approvedNum: 10,
    cardType: '체크카드',
    category: '생활잡화',
    dateTime: '2024-02-24T18:10:00',
    shopName: '다이소',
    shopNumber: '02-9999-0000',
    transactionId: 110,
    page: 1,
  },
  {
    cardHistoryId: 11,
    approvedAmount: 32000,
    approvedNum: 11,
    cardType: '체크카드',
    category: '문구_도서',
    dateTime: '2024-02-22T14:15:00',
    shopName: '교보문고',
    shopNumber: '02-7777-8888',
    transactionId: 111,
    page: 2,
  },
  {
    cardHistoryId: 12,
    approvedAmount: 55000,
    approvedNum: 12,
    cardType: '신용카드',
    category: '대형마트',
    dateTime: '2024-02-21T11:00:00',
    shopName: '홈플러스',
    shopNumber: '031-2222-1111',
    transactionId: 112,
    page: 2,
  },
  {
    cardHistoryId: 13,
    approvedAmount: 7800,
    approvedNum: 13,
    cardType: '체크카드',
    category: '카페',
    dateTime: '2024-02-20T17:40:00',
    shopName: '투썸플레이스',
    shopNumber: '02-3333-4444',
    transactionId: 113,
    page: 2,
  },
  {
    cardHistoryId: 14,
    approvedAmount: 134000,
    approvedNum: 14,
    cardType: '신용카드',
    category: '인테리어',
    dateTime: '2024-02-19T13:20:00',
    shopName: '가구점',
    shopNumber: '031-9876-5432',
    transactionId: 114,
    page: 2,
  },
  {
    cardHistoryId: 15,
    approvedAmount: 26500,
    approvedNum: 15,
    cardType: '체크카드',
    category: '뷰티',
    dateTime: '2024-02-18T12:10:00',
    shopName: '올리브영',
    shopNumber: '02-1234-5678',
    transactionId: 115,
    page: 2,
  },
  {
    cardHistoryId: 16,
    approvedAmount: 43000,
    approvedNum: 16,
    cardType: '신용카드',
    category: '반찬류',
    dateTime: '2024-02-17T18:30:00',
    shopName: '반찬가게',
    shopNumber: '031-6543-2109',
    transactionId: 116,
    page: 2,
  },
  {
    cardHistoryId: 17,
    approvedAmount: 8900,
    approvedNum: 17,
    cardType: '체크카드',
    category: '교통',
    dateTime: '2024-02-16T07:50:00',
    shopName: 'KTX',
    shopNumber: '1544-7788',
    transactionId: 117,
    page: 2,
  },
  {
    cardHistoryId: 18,
    approvedAmount: 61000,
    approvedNum: 18,
    cardType: '신용카드',
    category: '정육_계란류',
    dateTime: '2024-02-15T19:00:00',
    shopName: '정육점',
    shopNumber: '031-9876-2345',
    transactionId: 118,
    page: 2,
  },
  {
    cardHistoryId: 19,
    approvedAmount: 47500,
    approvedNum: 19,
    cardType: '체크카드',
    category: '잡화_명품',
    dateTime: '2024-02-14T16:10:00',
    shopName: '백화점',
    shopNumber: '02-3456-7890',
    transactionId: 119,
    page: 2,
  },
  {
    cardHistoryId: 20,
    approvedAmount: 96000,
    approvedNum: 20,
    cardType: '신용카드',
    category: '완구',
    dateTime: '2024-02-13T15:30:00',
    shopName: '토이저러스',
    shopNumber: '031-1122-3344',
    transactionId: 120,
    page: 2,
  },
  {
    cardHistoryId: 21,
    approvedAmount: 27500,
    approvedNum: 21,
    cardType: '체크카드',
    category: '편의점',
    dateTime: '2024-02-12T14:20:00',
    shopName: 'GS25',
    shopNumber: '031-5555-6666',
    transactionId: 121,
    page: 3,
  },
  {
    cardHistoryId: 22,
    approvedAmount: 134000,
    approvedNum: 22,
    cardType: '신용카드',
    category: '반려동물',
    dateTime: '2024-02-11T11:30:00',
    shopName: '고양이마트',
    shopNumber: '02-2222-3333',
    transactionId: 122,
    page: 3,
  },
  {
    cardHistoryId: 23,
    approvedAmount: 58000,
    approvedNum: 23,
    cardType: '체크카드',
    category: '여가',
    dateTime: '2024-02-10T19:40:00',
    shopName: '롯데월드',
    shopNumber: '031-9876-5432',
    transactionId: 123,
    page: 3,
  },
  {
    cardHistoryId: 24,
    approvedAmount: 19900,
    approvedNum: 24,
    cardType: '신용카드',
    category: '문구_도서',
    dateTime: '2024-02-09T16:00:00',
    shopName: '영풍문고',
    shopNumber: '02-4444-5555',
    transactionId: 124,
    page: 3,
  },
  {
    cardHistoryId: 25,
    approvedAmount: 8800,
    approvedNum: 25,
    cardType: '체크카드',
    category: '교통',
    dateTime: '2024-02-08T12:45:00',
    shopName: '티머니',
    shopNumber: '031-1234-5678',
    transactionId: 125,
    page: 3,
  },
  {
    cardHistoryId: 26,
    approvedAmount: 51000,
    approvedNum: 26,
    cardType: '신용카드',
    category: 'gym',
    dateTime: '2024-02-07T17:15:00',
    shopName: '헬스장',
    shopNumber: '02-7777-8888',
    transactionId: 126,
    page: 3,
  },
  {
    cardHistoryId: 27,
    approvedAmount: 63000,
    approvedNum: 27,
    cardType: '체크카드',
    category: '건강식품',
    dateTime: '2024-02-06T13:20:00',
    shopName: '약국',
    shopNumber: '031-6543-2109',
    transactionId: 127,
    page: 3,
  },
  {
    cardHistoryId: 28,
    approvedAmount: 9900,
    approvedNum: 28,
    cardType: '신용카드',
    category: '제과_잼',
    dateTime: '2024-02-05T09:50:00',
    shopName: '파리바게뜨',
    shopNumber: '02-3333-4444',
    transactionId: 128,
    page: 3,
  },
  {
    cardHistoryId: 29,
    approvedAmount: 7500,
    approvedNum: 29,
    cardType: '체크카드',
    category: '편의점',
    dateTime: '2024-02-04T08:30:00',
    shopName: '서울우유',
    shopNumber: '031-8765-4321',
    transactionId: 129,
    page: 3,
  },
  {
    cardHistoryId: 30,
    approvedAmount: 62000,
    approvedNum: 30,
    cardType: '신용카드',
    category: '대형마트',
    dateTime: '2024-02-03T20:00:00',
    shopName: '이마트',
    shopNumber: '031-1111-2222',
    transactionId: 130,
    page: 3,
  },
];
