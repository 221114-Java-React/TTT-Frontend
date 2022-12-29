import { MagnifyingGlassIcon, ArrowDownIcon, ArrowUpIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { useContext, useEffect, useState } from "react";
import { DisplayTableRow } from '../components/DisplayTableRow';
import { AppStateContext } from '../utilities/Contexts';
import { cartItemType } from "../utilities/types";

//Any additional columns added to this will mean additional changes will need to be made to both this page and types.ts
//ADD DATES TO EACH ITEM. CONSIDER OMITTING THE ITEM_ID
const fakeList = [
    {
        itemId: '1',
        orderId: '1',
        name: 'ship1',
        amount: 5,
        purchasePrice: 10
    },
    {
        itemId: '2',
        orderId: '1',
        name: 'ship2',
        amount: 2,
        purchasePrice: 10
    },
    {
        itemId: '3',
        orderId: '2',
        name: 'ship3dsadsadavaffrhbgrgsgrhsifuhbvoiwsjolweefqdshfhdssdahuiouifgauyrgfuiwhrgigvuhiwurhgvirhgiuehgiuvhbebhgiuehviuhreivuheiuhviuehviuerghviuerguieg',
        amount: 2,
        purchasePrice: 20
    },
    {
        itemId: '4',
        orderId: '3',
        name: 'ship4',
        amount: 2,
        purchasePrice: 20
    },
    {
        itemId: '5',
        orderId: '3',
        name: 'ship5',
        amount: 2,
        purchasePrice: 2
    },
    {
        itemId: '6',
        orderId: '1',
        name: 'ship5.4',
        amount: 2,
        purchasePrice: 1
    },
    {
        itemId: '7',
        orderId: '2',
        name: 'ship5.41',
        amount: 2,
        purchasePrice: 5
    },
    {
        itemId: '8',
        orderId: '1',
        name: 'ship5.41',
        amount: 4,
        purchasePrice: 20
    },
]

export default function PurchaseHistoryPage(){
    //Hooks
    const applicationState = useContext(AppStateContext);
    const userData = applicationState.userData;
    const [totalPurchaseHistory, setTotalPurchaseHistory] = useState<cartItemType[]>([]); //NEVER CALL THIS SET AGAIN
    const [filteredPurchaseHistory, setFilteredPurchaseHistory] = useState<cartItemType[]>([]);
    const [orderDirection, setOrderDirection] = useState<'asc' | 'dsc' | null>(null);
    const [priceDirection, setPriceDirection] = useState<'asc' | 'dsc' | null>(null);
    const [totalPriceDirection, setTotalPriceDirection] = useState<'asc' | 'dsc' | null>(null);
    const [filter, setFilter] = useState<string>("");
    
    useEffect(() => {
        setFilteredPurchaseHistory(fakeList); //WILL NEED TO BE UPDATED WHEN READING FROM THE BACKEND
        setTotalPurchaseHistory(fakeList); //WILL NEED TO BE UPDATED WHEN READING FROM THE BACKEND
        // sortOrder();
    }, [totalPurchaseHistory]);

    //Handler
    function filterName(e: React.ChangeEvent<HTMLInputElement>){
        setPriceDirection(null);
        setOrderDirection(null);
        setFilter(e.target.value);
        setFilteredPurchaseHistory(totalPurchaseHistory.filter(word => word.name.includes(e.target.value)));
    }

    //Handler
    //Sorts Purchase History table based on item price
    function sortPrice(){
        setTotalPriceDirection(null);
        setOrderDirection(null);
        if(filter === ""){
            const totalPurchaseHistoryCopy = [...totalPurchaseHistory];
            if(priceDirection === null || priceDirection === "dsc" ){
                setPriceDirection("asc");
                totalPurchaseHistoryCopy.sort((a,b) => a.purchasePrice - b.purchasePrice);
            } else {
                setPriceDirection("dsc");
                totalPurchaseHistoryCopy.sort((a,b) => b.purchasePrice - a.purchasePrice);
            }
            setFilteredPurchaseHistory(totalPurchaseHistoryCopy);
        } else {
            const filteredPurchaseHistoryCopy = [...filteredPurchaseHistory]
            if(priceDirection === null || priceDirection === "dsc" ){
                setPriceDirection("asc");
                filteredPurchaseHistoryCopy.sort((a,b) => a.purchasePrice - b.purchasePrice);
            } else {
                setPriceDirection("dsc");
                filteredPurchaseHistoryCopy.sort((a,b) => b.purchasePrice - a.purchasePrice);
            }
            setFilteredPurchaseHistory(filteredPurchaseHistoryCopy);
        }
    }

      //Handler
    //Sorts Purchase History table based on Total Price
    function sortTotalPrice(){
        setOrderDirection(null);
        setPriceDirection(null);
        if(filter === ""){
            const totalPurchaseHistoryCopy = [...totalPurchaseHistory];
            if(totalPriceDirection === null || totalPriceDirection === "dsc" ){
                setTotalPriceDirection("asc");
                totalPurchaseHistoryCopy.sort((a,b) => (a.purchasePrice*a.amount) - (b.purchasePrice*b.amount));
            } else {
                setTotalPriceDirection("dsc");
                totalPurchaseHistoryCopy.sort((a,b) => (b.purchasePrice*b.amount) - (a.purchasePrice*a.amount));
            }
            setFilteredPurchaseHistory(totalPurchaseHistoryCopy);
        } else {
            const filteredPurchaseHistoryCopy = [...filteredPurchaseHistory];
            if(totalPriceDirection === null || totalPriceDirection === "dsc" ){
                setTotalPriceDirection("asc");
                filteredPurchaseHistoryCopy.sort((a,b) => (a.purchasePrice*a.amount) - (b.purchasePrice*b.amount));
            } else {
                setTotalPriceDirection("dsc");
                filteredPurchaseHistoryCopy.sort((a,b) => (b.purchasePrice*b.amount) - (a.purchasePrice*a.amount));
            }
            setFilteredPurchaseHistory(filteredPurchaseHistoryCopy);
        }
    }

    //Sorts Purchase History table based on orderId
    function sortOrder(){
        setPriceDirection(null);
        setTotalPriceDirection(null);
        if(filter === ""){
            const totalPurchaseHistoryCopy = [...totalPurchaseHistory];
            if(orderDirection === null || orderDirection === "dsc" ){
                setOrderDirection("asc");
                totalPurchaseHistoryCopy.sort((a,b) => {
                    const orderA = a.orderId.toUpperCase();
                    const orderB = b.orderId.toUpperCase();
                    if(orderA < orderB){ return -1; } 
                    else if (orderA > orderB){ return 1; }
                    else { return 0}
                });
            } else {
                setOrderDirection("dsc");
                totalPurchaseHistoryCopy.sort((a,b) => {
                    const orderA = a.orderId.toUpperCase();
                    const orderB = b.orderId.toUpperCase();
                    if(orderA < orderB){ return 1; } 
                    else if (orderA > orderB){ return -1; }
                    else { return 0}
                });
            }
            setFilteredPurchaseHistory(totalPurchaseHistoryCopy);
        } else {
            const filteredPurchaseHistoryCopy = [...filteredPurchaseHistory];
            if(orderDirection === null || orderDirection === "dsc" ){
                setOrderDirection("asc");
                filteredPurchaseHistoryCopy.sort((a,b) => {
                    const orderA = a.orderId.toUpperCase();
                    const orderB = b.orderId.toUpperCase();
                    if(orderA < orderB){ return -1; } 
                    else if (orderA > orderB){ return 1; }
                    else { return 0}
                });
            } else {
                setOrderDirection("dsc");
                filteredPurchaseHistoryCopy.sort((a,b) => {
                    const orderA = a.orderId.toUpperCase();
                    const orderB = b.orderId.toUpperCase();
                    if(orderA < orderB){ return 1; } 
                    else if (orderA > orderB){ return -1; }
                    else { return 0}
                });
            }
            setFilteredPurchaseHistory(filteredPurchaseHistoryCopy);
        }
    }

    return(
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold">{userData?.givenName}'s Past Orders</h1>
            </div>
            <div className="ml-3 mr-3 flex flex-row">
                <div className="flex flex-row">
                    <label>
                        <MagnifyingGlassIcon className='w-5 h-5 mr-1'/>
                    </label>
                    <input className="bg-slate-500 outline-none placeholder:text-sm placeholder-slate-50 placeholder:px-2  text-sm" 
                        placeholder="Filter By Item Name" type="text" id="item_name"
                        value={filter} onChange={(e) => filterName(e)}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center ml-3 mr-3 mt-2">
            <table className="min-w-full" id="filteredPurchaseHistory">
                <thead className="text-left border">
                    <tr className="text-md bg-slate-800">
                        <th scope="col" className="px-2 w-1/4 border-r cursor-default">Item ID</th>
                        <th scope="col" className="px-2 w-1/4 border-r cursor-default">Item Name</th>
                        <th scope="col" className="px-2 w-1/4 border-r cursor-pointer" 
                            onClick={() => sortOrder()}>Order ID 
                            {
                               (orderDirection !== 'asc')
                               ? (orderDirection !== 'dsc') 
                                   ? <ArrowsUpDownIcon className='w-4 h-4 translate-y-1 float-right'/>
                                   : <ArrowDownIcon className='w-4 h-4 translate-y-1 float-right'/>
                               : <ArrowUpIcon className='w-4 h-4 translate-y-1 float-right'/>
                            }                   
                        </th>
                        <th scope="col" className="px-2 w-1/12 border-r">Quantity</th>
                        <th scope="col" className="px-2 w-1/12 border-r cursor-pointer" 
                            onClick={() => sortPrice()} >Price 
                            {
                               (priceDirection !== 'asc')
                               ? (priceDirection !== 'dsc') 
                                   ? <ArrowsUpDownIcon className='w-4 h-4 translate-y-1 float-right'/>
                                   : <ArrowDownIcon className='w-4 h-4 translate-y-1 float-right'/>
                               : <ArrowUpIcon className='w-4 h-4 translate-y-1 float-right'/>
                            }
                        </th>
                        <th scope="col" className="px-2 w-1/12 border-r cursor-pointer"
                            onClick={() => sortTotalPrice()} >Total
                            {
                                (totalPriceDirection !== 'asc')
                                ? (totalPriceDirection !== 'dsc') 
                                    ? <ArrowsUpDownIcon className='w-4 h-4 translate-y-1 float-right'/>
                                    : <ArrowDownIcon className='w-4 h-4 translate-y-1 float-right'/>
                                : <ArrowUpIcon className='w-4 h-4 translate-y-1 float-right'/>
                            }
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPurchaseHistory.map(
                        (details) => {
                            return( <DisplayTableRow key = {details.itemId} details = {details} /> )
                        }
                    )}
                </tbody>
            </table>
        </div>
        </>
    );
}