import React from 'react';
import { Tooltip, Typography } from '@material-tailwind/react';
// interface Props{
//     id: number,
//     img: string,
//     name: string,
//     price: number
// }
interface PropsList {
  buyiflist: {
    id: number;
    img: string;
    name: string;
    price: number;
  }[];
  mostbuy: string;
  mostbuyprice: number;
}

const dummyData: any = [
  {
    id: 1,
    img: '',
    name: '애플 아이폰 15',
    price: 1200000,
  },
  {
    id: 2,
    img: '',
    name: '삼성 갤럭시 S24',
    price: 1100000,
  },
  {
    id: 3,
    img: '',
    name: 'LG 그램 17',
    price: 1500000,
  },
];

const BuyifList = ({ buyiflist, mostbuy, mostbuyprice }: PropsList) => {
  return (
    <div className="flex flex-col gap-3 items-center ">
      {/* map 때려야함 */}
      {/* <div className='w-[90%] h-[100px] bg-blue-gray-50 rounded-md flex items-center justify-around' >
                <img src="/dyson.jpg" className='h-[80%] aspect-square rounded-lg ' />
                <div className='flex flex-col justify-around h-[90%]'>
                    <div className='font-main text-lg'>다이슨 청소기</div>
                    <div className='font-main text-lg'>가격: ₩500,000원</div>
                </div>
                <div className='h-full flex items-center'>
                    <div className='font-main font-bold text-lg flex items-center'> 100 X 
                        <div className='w-7 aspect-square'>
                            <img src={`/Mostbuy/${mostbuy}.png`} alt="" />
                        </div>
                    </div>
                </div>
            </div> */}
      {dummyData.map((buyif: any, index: any) => (
        <div key={index} className="w-[90%] h-[100px] bg-blue-gray-50 rounded-md flex items-center justify-around">
          {buyif.img ? (
            <img
              src={`https://j9c211.p.ssafy.io/api/ifbuy-management/ifbuys/image/${buyif.img}`}
              className="h-[80%] aspect-square rounded-lg "
            />
          ) : (
            <img src="/buyifdefault.png" className="h-[80%] aspect-square rounded-lg " />
          )}
          {/* <img src={`https://j9c211.p.ssafy.io/api/ifbuy-management/ifbuys/image/${buyif.img}`} className='h-[80%] aspect-square rounded-lg ' /> */}
          <div className="flex flex-col justify-around h-[90%] w-[40%]">
            <div className="font-main dt:text-lg tb:text-lg text-sm">{buyif.name}</div>
            <div className="font-main  dt:text-lg tb:text-lg text-sm">
              가격: ₩{buyif.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </div>
          </div>

          <div className="h-full flex items-center">
            <div className="font-main font-bold text-lg flex items-center">
              {' '}
              {Math.floor(buyif.price / mostbuyprice)} X
              <div className="w-7 aspect-square">
                <img src={`/Mostbuy/${mostbuy}.png`} alt="" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyifList;
