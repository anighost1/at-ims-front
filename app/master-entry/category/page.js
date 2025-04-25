"use client";

import { useState } from "react";
import Filter from "@/components/filter";
import { useQuery } from '@tanstack/react-query';
import { fetchCategory } from "@/lib/apiCalls/category";
import Cookies from "js-cookie";
import useDebounce from "@/hooks/useDebounce";
import AddCategory from "./addForm";

export default function Category() {

    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const token = Cookies.get('token')
    const debounceSearch = useDebounce(search, 600)

    const { data, isLoading, error } = useQuery({
        queryKey: ['categories', filter, debounceSearch],
        queryFn: fetchCategory,
    });

    // console.log(filter)

    return (
        <>
            {/* <div className="flex justify-end items-center m-4">
                <label htmlFor="my_modal_6" className="btn btn-outline btn-success">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add
                </label>
            </div> */}
            <AddCategory />
            <Filter
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
            />

            <div className="overflow-x-auto h-full">
                {isLoading && (<div className="w-full flex justify-center items-center p-6">
                    <span className="loading loading-spinner text-primary" />
                </div>)}
                {data && (<table className="table table-xs">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.name}</td>
                                <td>{item?.description}</td>
                                <td className={item?.status ? 'text-green-500' : 'text-red-400'}>{item?.status ? 'Active' : 'inactive'}</td>
                                {/* <td >
                                    <details className="dropdown dropdown-left">
                                        <summary className="btn m-1 size-6 btn-ghost btn-circle btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <circle cx="5" cy="12" r="2" />
                                                <circle cx="12" cy="12" r="2" />
                                                <circle cx="19" cy="12" r="2" />
                                            </svg>
                                        </summary>
                                        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                            <li><a>Edit</a></li>
                                            <li><a>Inactive</a></li>
                                        </ul>
                                    </details>
                                </td> */}
                            </tr>
                        ))}
                        {data?.data?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center text-2xl text-gray-500"><p className="p-6">No data found</p></td>
                            </tr>
                        )}
                    </tbody>
                </table>)}
            </div>

        </>
    );
}
