import { useEffect, useState } from "react";

export default function Report({data}) {
    console.log(data)
    return (
        <div className="flex flex-col gap-5 items-center dark:text-indigo-300 p-2">
            <div className="text-3xl font-bold p-5">{data[0]} users</div>
            <div className="text-3xl font-bold p-5">{data[1]} errors</div>
            <div className="text-3xl font-bold p-5">{data[2]} posts</div>
        </div>
    );
}
