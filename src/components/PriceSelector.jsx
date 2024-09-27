import React, { useState } from 'react'
import cans from '../assets/cans.png'
import bottles from '../assets/bottles.png'
import gift from '../assets/gift.png'

const tabData = {
  DETAILS: {
  },
  HARVEST: {
  },
  USES: {
  },
  REFILLS: {
  }
}
export default function PriceSelector() {
  const [quantity, setQuantity] = useState(1)
  const [purchaseType, setPurchaseType] = useState('oneTime')
  const [refillType, setRefillType] = useState('cans')
  const [activeTab, setActiveTab] = useState("DETAILS")

  const basePrice = 37
  const discounts = {
    1: 0.10,
    2: 0.14,
    3: 0.15,
    6: 0.17
  }

  const calculatePrice = () => {
    let price = basePrice * quantity
    if (purchaseType === 'subscribe') {
      price *= (1 - discounts[quantity])
    }
    return price.toFixed(2)
  }

  return (
    <div className="w-full lg:px-7">
      <div className="w-full p-5 mt-5 bg-[#fff4ec] border-y border-black md:rounded-3xl md:border-x">
        <h2 className="text-2xl font-bold mb-4">Quantity</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {[1, 2, 3, 6].map((qty) => (
            <button
              key={qty}
              onClick={() => setQuantity(qty)}
              className={`flex flex-col items-center border border-black justify-between rounded-lg ${quantity === qty ? 'bg-[#9eef80]' : ''}`}
            >
              <div className={` bg-[#3c422e] py-1 rounded-t-lg w-full font-sans ${qty===1?'py-3':''} ${qty==1&&purchaseType=='oneTime'?'hidden':''}`}>
                <div className="text-xs font-medium text-white">
                  {qty > 1 && 'Free Shipping!'}
                </div>
                <div className="text-xs font-medium text-white">
                  {`+${Math.abs((discounts[qty] * 100).toFixed(0))}% Off`}
                </div>
              </div>
              <div className="pb-1 my-auto">

                <div className="text-xl font-bold">{qty}</div>
                <div className="text-xs font-medium">{qty === 1 ? 'Set' : 'Sets'}</div>
              </div>
            </button>
          ))}
        </div>
        <hr className=' border-t-[1px] border-dashed border-black' />
        <div className="mb-4">
          <div className="flex items-center justify-between py-4">
            <div className="space-x-2 flex items-center">
              <input
                type="radio"
                id="oneTime"
                value="oneTime"
                checked={purchaseType === 'oneTime'}
                onChange={() => setPurchaseType('oneTime')}
                className="cursor-pointer h-5 w-5 bg-[#9eef80] border-black border-[1px]"
              />
              <label htmlFor="oneTime" className="cursor-pointer">One Time Purchase</label>
            </div>
            <span className="ml-auto">${(basePrice*quantity).toFixed(2)}</span>
          </div>
          <hr className=' border-t-[1px] border-dashed border-black' />

          <div className="flex items-center space-x-2 justify-between py-4">
            <div className="space-x-2 flex items-center ">
              <input
                type="radio"
                id="subscribe"
                value="subscribe"
                checked={purchaseType === 'subscribe'}
                onChange={() => setPurchaseType('subscribe')}
                className="cursor-pointer h-5 w-5"
              />
              <label htmlFor="subscribe" className="cursor-pointer">Subscribe & Save</label>
            </div>
            <div className="">

            <span className="ml-auto opacity-50 line-through">${(basePrice * quantity).toFixed(0)}</span>
            <span className="ml-1">${(basePrice * (1 - discounts[quantity])*quantity).toFixed(2)}</span>
            </div>
          </div>
          <hr className=' border-t-[1px] border-dashed border-black' />

        </div>

        {purchaseType === 'subscribe' && (
          <>
          <select className="w-full mb-4 px-5 py-2 border bg-[#fff4ec] border-black rounded-full" defaultValue="1">
            <option value="1">Every 1 Month</option>
            <option value="2">Every 2 Months</option>
            <option value="3">Every 3 Months</option>
          </select>
        

        <h3 className="text-xl font-bold mb-2">Select Refill Preference:</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setRefillType('cans')}
            className={`flex flex-row items-center border-2 rounded-lg ${refillType === 'cans' ? 'bg-[#9eef80] border-black border-[1px]' : 'bg-[#f6e6d9] border-none'}`}
          >
            <div className="h-20 w-[4.5rem]">
              <img src={cans} alt="" className='w-full h-full object-cover' />
            </div>
            <div className="">

              <div className="font-semibold text-left">Refill Cans</div>
              <div className="text-xs text-left">${calculatePrice()}/order</div>
            </div>
          </button>
          <button
            onClick={() => setRefillType('bottles')}
            className={`flex flex-row items-center border-2 rounded-lg ${refillType === 'bottles' ? 'bg-[#9eef80] border-black border-[1px]' : 'bg-[#f6e6d9] border-none'}`}
          >
            <div className="h-20 w-[4.5rem]">
              <img src={bottles} alt="" className='w-full h-full object-cover' />
            </div>
            <div className="">

              <div className="font-semibold text-left">Squeeze Bottles</div>
              <div className="text-xs text-left">${calculatePrice()}/order</div>
            </div>
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-bold">FIRST ORDER:</h3>
          <p>1 Sizzle Bottle, 1 Drizzle Bottle</p>
          <h3 className="font-bold mt-2">RECURRING:</h3>
          {refillType === 'cans' ? <p>1 Sizzle Can, 1 Drizzle Can</p> : <p>1 Sizzle Bottle, 1 Drizzle Bottle</p>}

        </div>
        <hr className=' border-t-[1px] border-dashed border-black' />
        </>

)}

        <button className="w-full bg-[#d1e030] text-black hover:bg-[#a4d69c] p-2 mt-4 rounded-full">
          {purchaseType === 'subscribe' ? 'Subscribe' : 'Purchase'} - ${calculatePrice()}
        </button>
{purchaseType==='subscribe'?(

        <p className="text-center mt-2 text-sm">Skip, Edit or Cancel Anytime</p>
      ):(
        
        <p className="text-center mt-2 text-sm"><u>Send as a gift</u></p>
)}
      </div>
      <div className="w-full">
        {purchaseType==='oneTime'&&(

          <div className=" p-4 mt-5 mx-5 md:mx-0 border-black rounded-3xl flex items-center border bg-[#fff4ec]">
          <img src={cans} alt="" height={120} width={120} />

          <div className="ml-5">
            <div className="font-semibold">GET REFILLS!</div>
            <div className="">"The Duo" Refill Cans</div>
            <button className='border-black border px-4 rounded-full py-1 mt-2'>Add - ${(basePrice * quantity).toFixed(0)}</button>
            
          </div>
        </div>
      )}
        {/* gift box */}
        <div className=" p-4 mt-5 mx-5 md:mx-0 border-black rounded-3xl flex items-center border bg-[#fff4ec]">
          <img src={gift} alt="" height={75} width={75} />
          <div className="ml-5">
            Buying multiple gifts? Send to multiple addresses <u>here.</u>
          </div>
        </div>
        {/* tabs */}
        <div className=" mx-5 md:mx-auto mt-10 font-mono text-[#3c3c3c]">
          <div className="flex">
            {Object.keys(tabData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-base font-semibold w-full rounded-t-lg ${activeTab === tab
                  ? 'bg-[#2c2426] text-[#f7f3e9]'
                  : 'bg-[#f7f3e9] text-[#2c2426]'
                  } border-t border-l border-r border-[#3c3c3c]`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className=" p-4 border border-[#3c3c3c] rounded-b-lg">
            {activeTab === "DETAILS" ? (
              <>
                <h2 className="text-lg font-bold mb-2">DRIZZLE: 500ml</h2>
                <p className="mb-4">
                  Extra Virgin finishing oil made from olives that are picked early, when flavor is bold and antioxidants are highest. Made for eating, not heating.</p>
                <h2 className="text-lg font-bold mb-2">SIZZLE: 750ml</h2>
                <p>Extra Virgin cooking oil made from mature, mid-season olives that yield a more mellow flavor. Use it every day, in every way.</p>
              </>
            ) : activeTab === 'HARVEST' ? (
              <>
                <p className='mb-4'><span className='font-bold'>DRIZZLE: </span>Harvested in October, before the olives have ripened fully. Picked by hand because young olives need a firm yank to loosen up.</p>
                <p><span className='font-bold'>SIZZLE: </span>Harvested in November and December, when the olives are more mature. They’re pretty laid back by this point, so it only takes a few shakes to get them off the branch.</p>
              </>
            ) : activeTab === 'USES' ? (
              <>
                <p className='mb-4'><span className='font-bold'>DRIZZLE: </span>A little Drizzle goes a long way! Put it on your ice cream or popcorn, whip up a pesto or salad dressing, or drink it straight from a spoon (we won’t tell).</p>
                <p><span className='font-bold'>SIZZLE: </span>If you would put it in or on top of an oven, use Sizzle. Chicken cutlets, sheet pan veggies, fried rice, or even chocolate chip cookies! You name it, Sizzle Sizzles it.</p>
              </>) : (
              <>
                <h2 className="text-lg font-bold mb-4">"DRIZZLE" REFILL CAN: 500ml</h2>
                <h2 className="text-lg font-bold mb-4">"SIZZLE" REFILL CAN: 750ml</h2>
                <p className="">Perfectly portioned and 100% recyclable, our “beer can” refills are designed to keep your delicious olive oil super fresh. Just crack open, pour into a squeeze bottle (using a kitchen funnel!) and get cookin'.</p>
              </>)}
          </div>
        </div>
      </div>
    </div>
  )
}
