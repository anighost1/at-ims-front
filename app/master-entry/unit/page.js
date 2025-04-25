"use client";

import { useState } from "react";
import Filter from "@/components/filter";
import { useQuery } from '@tanstack/react-query';
import { fetchUnit } from "@/lib/apiCalls/unit";
import useDebounce from "@/hooks/useDebounce";
import AddForm from "./addForm";

export default function Category() {

    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');
    const debounceSearch = useDebounce(search, 600)

    const { data, isLoading, error } = useQuery({
        queryKey: ['units', filter, debounceSearch],
        queryFn: fetchUnit,
    });

    // console.log(filter)

    return (
        <>
            <AddForm />
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
                            <th>Abbreviation</th>
                            <th>Description</th>
                            <th>Status</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.name}</td>
                                <td>{item?.abbreviation}</td>
                                <td>{item?.description}</td>
                                <td className={item?.status ? 'text-green-500' : 'text-red-400'}>{item?.status ? 'Active' : 'inactive'}</td>
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
