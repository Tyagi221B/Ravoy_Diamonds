// import React from 'react'

// const OrderSection: React.FC = () => {
//   return (
//     <div>
//       ordersection
//     </div>
//   )
// }

// export default OrderSection
import React from 'react';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Sidebar from './Sidebar';
import images from '../../assets/images';
import Header from '../Header';
import Navigation from '../Navigation';

const OrderSection: React.FC = () => {
  return (
    <div>
    <div className="App font-Montaga One">
  <Header />
  <div className="hidden md:block">
    <Navigation />
  </div>
</div>
    <div className="container mt-10 gap-[3%]  flex md:flex-row flex-col mx-auto px-4">
    <div className="sidebar md:w-1/3 ">
    <Sidebar/>
    </div> {/* Desktop View */}
      <div className="hidden rounded md:block bg-[#FFF9F3] mx-[3%]">
        <div className="bg-[#FFF9F3] mx-[5%] pt-[5%]">
          <div className="border border-[#0F6FA6]/30">
            <div className="bg-[#D9D9D9]/30 flex flex-row gap-1 py-1">
              <FiberManualRecordIcon
                className="text-[#6DA861] h-4 w-4 pt-2 pl-2"
              />
              <div className="text-2xl text-[#888888] font-medium tracking-wide">
                Dispatched
              </div>
            </div>
            <div className="flex flex-row py-4 px-4">
              <img
                className="w-[15%]"
                src={images.ring1_1}
                 alt="Product"
              />
              <div className="bg-[#F3F3F3] mx-2 w-[40%] p-8">
                <div className="text-2xl font-medium text-black">
                  Captivating Floral Design Diamond Bracelet
                </div>
                <div className="text-lg text-[#494949] font-medium pt-4">
                  Order Number: 1234567
                </div>
              </div>
              <div className="flex flex-col bg-[#F3F3F3] pb-4 w-[40%] items-center">
                <button className="bg-[#528EA8] text-white text-base font-medium border border-[#528EA8] rounded-lg px-4 py-2 mt-6">
                  Track Order
                </button>
                <button className="bg-[#6B6B6B] text-white text-base font-medium border border-[#6B6B6B] rounded-lg px-4 py-2 mt-3">
                  View Order Detail
                </button>
                <button className="bg-[#F3F3F3] text-[#494949]/80 text-base  font-medium border border-[#528EA8] rounded-lg px-8 py-2 mt-3">
                  Get Invoice
                </button>
              </div>
            </div>
          </div>

          {/* Additional Order Entry Example */}
          <div className="border border-[#0F6FA6]/30 my-3">
            <div className="bg-[#D9D9D9]/30 flex flex-row gap-1 py-1">
              <FiberManualRecordIcon
                className="text-[#BDC0BD] h-4 w-4 pt-2 pl-2"
              />
              <div className="text-2xl text-[#888888] font-medium tracking-wide">
                Delivered On 05 August 2024
              </div>
            </div>
            <div className="flex flex-row py-4 px-4">
              <img
                className="w-[15%]"
                src={images.ring1_3}
                alt="Product"
              />
              <div className="bg-[#F3F3F3] mx-2 w-[40%] p-8">
                <div className="text-2xl font-medium text-black">
                  Captivating Floral Design Diamond Bangles
                </div>
                <div className="text-lg text-[#494949] font-medium pt-4">
                  Order Number: 1234567
                </div>
              </div>
              <div className="flex flex-col bg-[#F3F3F3] w-[40%] items-center">
                <button className="bg-[#6B6B6B] text-white text-base font-medium border border-[#6B6B6B] rounded-lg px-4 py-2 mt-6">
                  View Order Detail
                </button>
                <button className="bg-[#F3F3F3] text-[#494949]/80 text-base font-medium border border-[#528EA8] rounded-lg px-8 py-2 mt-3">
                  Get Invoice
                </button>
              </div>
            </div>
          </div>
          <div className="border border-[#0F6FA6]/30 my-3">
            <div className="bg-[#D9D9D9]/30 flex flex-row gap-1 py-1">
              <FiberManualRecordIcon
                className="text-[#BDC0BD] h-4 w-4 pt-2 pl-2"
              />
              <div className="text-2xl text-[#888888] font-medium tracking-wide">
                Delivered On 05 August 2024
              </div>
            </div>
            <div className="flex flex-row py-4 px-4">
              <img
                className="w-[15%]"
                src={images.ring1_3}
                alt="Product"
              />
              <div className="bg-[#F3F3F3] mx-2 w-[40%] p-8">
                <div className="text-2xl font-medium text-black">
                  Captivating Floral Design Diamond Bangles
                </div>
                <div className="text-lg text-[#494949] font-medium pt-4">
                  Order Number: 1234567
                </div>
              </div>
              <div className="flex flex-col bg-[#F3F3F3] w-[40%] items-center">
                <button className="bg-[#6B6B6B] text-white text-base font-medium border border-[#6B6B6B] rounded-lg px-4 py-2 mt-6">
                  View Order Detail
                </button>
                <button className="bg-[#F3F3F3] text-[#494949]/80 text-base font-medium border border-[#528EA8] rounded-lg px-8 py-2 mt-3">
                  Get Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-[#FFF9F3] text-[#00000080] text-xl font-medium px-4 py-3">
        Order History
        <div className="pt-5">
          <div className="border border-[#0F6FA6]/30">
            <div className="flex flex-row gap-1 py-1">
              <FiberManualRecordIcon
                className="text-[#6DA861] h-6 w-6 pt-2 pl-2"
              />
              <div className="text-2xl text-[#888888] font-medium tracking-wide">
                Dispatched
              </div>
            </div>
            <div className="flex flex-row py-4 px-4">
              <img
                className="w-[40%]"
                src="https://s3-alpha-sig.figma.com/img/3734/629c/ed18146487234793dbecc9afc53de138?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d6EqiKdLWoa3d~Eib2ZC9rA2BFbibH9ZqjmzpIkmHU23hhYAvVxaPN~p3YQFZYZ6O~GTdRWM1yQI6ehyHEAMB37Gy0jBBjSYleKEpuU2D9b60xj6PN1SIYcgh9oKN4bsh0k4zqXG~yuDdoDraSL9ZX--a0Il86Vl91y8KgvKdDi6IPn8AeAkWbqJtaJLn7JVd9TgSIHX2EBYHYgWy1pWTkNOI6pZeCV77Gm82fUipNbsvmO8f9vSQme-2sW2ukuSRT1dQ0Cj553sXIHnbnFOaWNdvlH4c8AiHAJ1grSRCcKE6D9HmFlDPcq6HQ6IhLmBPzCxsHT2Wl6vGSsXsr47zw__"
                alt="Product"
              />
              <div className="bg-[#F3F3F3] mx-2 w-[60%] p-8">
                <div className="text-lg font-medium text-black">
                  Captivating Floral Design Diamond Bracelet
                </div>
                <div className="text-sm text-[#494949] font-medium pt-2">
                  Order Number: 1234567
                </div>
                <div className="flex flex-col mt-6">
                  <button className="bg-[#528EA8] text-white text-sm font-medium border border-[#528EA8] rounded-lg px-4 py-2 mb-3">
                    Track Order
                  </button>
                  <button className="bg-[#6B6B6B] text-white text-sm font-medium border border-[#6B6B6B] rounded-lg px-4 py-2 mb-3">
                    View Order Detail
                  </button>
                  <button className="bg-[#F3F3F3] text-[#494949]/80 text-sm font-medium border border-[#528EA8] rounded-lg px-8 py-2">
                    Get Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Mobile Order Entry Example */}
          <div className="border border-[#0F6FA6]/30 mt-3">
            <div className="flex flex-row gap-1 py-1">
              <FiberManualRecordIcon
                className="text-[#BDC0BD] h-6 w-6 pt-2 pl-2"
              />
              <div className="text-2xl text-[#888888] font-medium tracking-wide">
                Delivered On 05 August 2024
              </div>
            </div>
            <div className="flex flex-row py-4 px-4">
              <img
                className="w-[40%]"
                src="https://s3-alpha-sig.figma.com/img/b61f/6a09/52037ad34b823edab3b038678bc370b5?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M90Ee0rzbT0p6b6a1bq2GA1fepxgaI-jUgvilDmjRX5Nj-B20icU-Dyqi4nQu2650fcGW-Ffia0PWy60qHhw9BbDlRsho-1D4OMDqCepJGaPl3023Y7vig8eAL3ISjWSp1cq6GCt9Mqcox5vEvkg4yZowiOW5Qp0-U7eXVMZM6dOAYYFwcX437y5OJLCLyzXrXOrPTzNXueKRfk18mlZ0B0j38Ke00CKdy0XLyBmM09ToZSoO2VbOMUqd5gp9azjuN~cKj4TAJjErUgSJt45X57Vf32CgVvNY7P3zrLPowVvjJNOolVGvZlOhN07m2i~s~iSC2zrNesDuLxZC8HM~g__"
                alt="Product"
              />
              <div className="bg-[#F3F3F3] mx-2 w-[60%] p-8">
                <div className="text-lg font-medium text-black">
                  Captivating Floral Design Diamond Bangles
                </div>
                <div className="text-sm text-[#494949] font-medium pt-2">
                  Order Number: 1234567
                </div>
                <div className="flex flex-col mt-6">
                  <button className="bg-[#6B6B6B] text-white text-sm font-medium border border-[#6B6B6B] rounded-lg px-4 py-2 mb-3">
                    View Order Detail
                  </button>
                  <button className="bg-[#F3F3F3] text-[#494949]/80 text-sm font-medium border border-[#528EA8] rounded-lg px-8 py-2">
                    Get Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
export default OrderSection
