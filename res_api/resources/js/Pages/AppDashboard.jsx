import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5/index";
import { IoIosStats } from "react-icons/io/index";
import { FaUserSecret } from "react-icons/fa/index";
import { BsDatabase, BsSearch } from "react-icons/bs/index";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md/index";
import DataBoard from "./DataBoard";
import Manage from "./Manage";
import Report from "./Report";

export default function AppDashboard(props) {
    console.log(props);
    const [activeTabIndex, setActiveTabIndex] = useState(props.index);
    const [isDark, setIsDark] = useState(false);
    const tabList = [
        <Manage data={props.users} />,
        <Report data={props.report} />,
        <DataBoard data={props.data} />,
    ];

    function handleTheme() {
        setIsDark(!isDark);
        if (!isDark) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }
    return (
        <>
            <Head title="Dashboard" />
            <div className="w-full h-full flex lg:flex-row">
                {/* sidebar */}
                <div className="h-screen bg-indigo-950 lg:w-2/12 flex flex-col p-5 gap-5 before:border-2">
                    <div
                        className={
                            (activeTabIndex == 0
                                ? " bg-white text-indigo-600 translate-x-6"
                                : " bg-indigo-500 text-white hover:bg-white hover:text-indigo-500 hover:translate-x-6") +
                            " transition-transform p-2 flex flex-row justify-between items-center border-violet-500 rounded-lg select-none"
                        }
                        onClick={() => {
                            router.get("home", { index: 0 });
                        }}
                    >
                        <FaUserSecret />
                        Mange users
                    </div>
                    <div
                        className={
                            (activeTabIndex == 1
                                ? " bg-white text-indigo-600 translate-x-6"
                                : " bg-indigo-500 text-white hover:bg-white hover:text-indigo-500 hover:translate-x-6 ") +
                            " transition-transform p-2 flex flex-row justify-between items-center border-violet-500 rounded-lg select-none"
                        }
                        onClick={() => {
                            router.get("status", { index: 1 });
                        }}
                    >
                        <IoIosStats />
                        Statistic
                    </div>
                    <div
                        className={
                            (activeTabIndex == 2
                                ? " bg-white text-indigo-600 translate-x-6"
                                : " bg-indigo-500 text-white hover:bg-white hover:text-indigo-500 hover:translate-x-6") +
                            " transition-transform p-2 flex flex-row justify-between items-center border-violet-500 rounded-lg select-none"
                        }
                        onClick={() => {
                            router.get("server", { index: 2 });
                        }}
                    >
                        <BsDatabase />
                        Data
                    </div>
                </div>
                {/* sidebar */}

                <div className="lg:w-10/12 h-screen flex flex-col dark:bg-slate-900">
                    <div className="border-b-[1px] border-sky-200 h-[60px] flex lg:flex-row p-2 gap-5 justify-end items-center">
                        <div className="border-indigo-500 border-2 rounded-xl flex flex-row items-center px-4 bg-white">
                            <input
                                type="text"
                                className="p-2 rounded-xl border-none focus:ring-transparent text-indigo-500"
                            />
                            <button className="p-2 rounded-full text-indigo-500 hover:bg-indigo-300 hover:text-white">
                                <BsSearch />
                            </button>
                        </div>
                        <div className="flex flex-row justify-between p-2 gap-4 px-4 bg-indigo-950 text-white rounded-lg">
                            <IoNotificationsOutline className="font-bold text-xl hover:nof-animation" />
                            <span>Notification</span>
                        </div>
                        <button
                            className={
                                (!isDark
                                    ? "bg-indigo-950 text-white justify-start"
                                    : "bg-white text-indigo-950 justify-end shadow-lg shadow-indigo-600") +
                                " flex p-1 rounded-2xl border-2 border-indigo-600 w-[60px] h-[30px] duration-150"
                            }
                            onClick={() => handleTheme()}
                        >
                            <span>
                                {isDark ? (
                                    <MdOutlineLightMode />
                                ) : (
                                    <MdOutlineDarkMode />
                                )}
                            </span>
                        </button>
                        <div className="flex flex-row items-center justify-between gap-5 border-2 rounded-full border-indigo-500 bg-indigo-950 text-white">
                            <img
                                className="rounded-full w-[40px] h-[40px]"
                                src="https://i.pinimg.com/236x/7a/82/11/7a8211a2161799550aa868aaab6d5c84.jpg"
                            />
                        </div>
                    </div>
                    {tabList[activeTabIndex]}
                </div>
            </div>
        </>
    );
}
