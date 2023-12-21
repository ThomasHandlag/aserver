import { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";
import { BsPerson } from "react-icons/bs";
import { router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { FaBan, FaRegStopCircle } from "react-icons/fa";

export default function Manage({data}) {
    const [isLoading, setIsLoading] = useState(false);
    let temp = data;
    const [list, setList] = useState(
        temp
            ? temp.map((item) => {
                  return {
                      item: item,
                      checked: false,
                  };
              })
            : []
    );

    useEffect(() => {
        if (list) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [list]);

    const [formType, setFormType] = useState(<UserForm type="remove" />);

    const checkAllItem = (e) => {
        if (e.target.checked) {
            let updateCheckedList = list.map((item) => {
                return { item: item.item, checked: true };
            });
            setList(updateCheckedList);
        } else {
            let updateCheckedList = list.map((item) => {
                return { item: item.item, checked: false };
            });
            setList(updateCheckedList);
        }
    };

    const handleCheckbox = (e) => {
        let value = e.target.value;
        let checked = e.target.checked;
        let updateList = list.map((item) => {
            return {
                item: item.item,
                checked: value == item.item ? checked : item.checked,
            };
        });
        setList(updateList);
        list.forEach((item) => {
            if (item.checked) {
                setSelectedCountt(selectedCount + 1);
            }
        });
    };

    const [selectedCount, setSelectedCountt] = useState(0);

    const countSelected = () => {
        let count = 0;
        list.forEach((item) => {
            if (item.checked) {
                count = count + 1;
            }
        });
        setSelectedCountt(count);
    };

    useEffect(() => {
        countSelected();
    }, [list]);


    return (
        <>
            <Head title="Data Board" />
            <div
                className={`p-5 text-black dark:text-white dark:bg-gray-950 flex lg:flex-row ${
                    isLoading ? "animate-pulse" : ""
                } `}
            >
                <div className="flex flex-col w-2/3 flex-grow items-center">
                    <div className="flex flex-row gap-5 justify-center items-center">
                        <button
                            title="Update data, Choose one"
                            className={`p-2 px-4 border-indigo-500 border-2 rounded-lg ${
                                formType == "update"
                                    ? "bg-indigo-500 text-white"
                                    : "bg-indigo-200 dark:bg-indigo-900"
                            }`}
                            onClick={() => setFormType(<UserForm type="update" />)}
                        >
                            update
                        </button>
                        <button
                            className="p-2 px-4 border-indigo-500 border-2 rounded-lg flex flex-row gap-2 items-center"
                        >
                            remove
                            <span className="rounded-full border-x-2 p-2 dark:border-indigo-500">
                                {selectedCount}
                            </span>
                        </button>
                    </div>
                    <table
                        cellSpacing={10}
                        className={`lg:px-2 inline-block h-[540px] overflow-auto grow`}
                        cellPadding={10}
                    >
                        <thead className="border-b-2 p-4 sticky z-5 top-0 bg-white dark:bg-gray-950 gap-10">
                            <tr className="items-center capitalize">
                                <th>name</th>
                                <th>phone</th>
                                <th>Email</th>
                                <th>Image</th>
                                <th>Create at</th>
                                <th className="flex flex-row gap-2 justify-center items-center">
                                    <Checkbox
                                        onChange={checkAllItem}
                                        tooltip={"Check all"}
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && isLoading == false
                                ? list.map((item) => (
                                      <UserRow
                                          value={item.item}
                                          key={item.item.id}
                                          isCheck={item.checked}
                                          handleCheckbox={handleCheckbox}
                                          open={() => {
                                            setFormType(<UserForm type="update" value={item.item} />);
                                          }}
                                      />
                                  ))
                                : ""}
                        </tbody>
                    </table>
                </div>
                {formType}
            </div>
        </>
    );
}

export function UserRow({ open, value, isCheck, handleCheckbox, ...props }) {
    return (
        <tr
            className="hover:bg-gray-300 select-none dark:hover:bg-indigo-800"
            onClick={open}
        >
            <td>{value.name}</td>
            <td>{value.email}</td>
            <td>{value.phone ? props.value.phone : "-"}</td>
            <td>{value.img_link}</td>
            <td>{value.create_at}</td>
            <td>
                <input
                    type="checkbox"
                    name="checkbox"
                    checked={isCheck}
                    onChange={handleCheckbox}
                    title={"Check item"}
                    value={value.id}
                    className={
                        "rounded border-indigo-400 text-indigo-600 shadow-sm focus:ring-indigo-500 border-2 "
                    }
                />
            </td>
        </tr>
    );
}

export function UserForm({ type, ...props }) {
    const { data, setData, post } = useForm({
        name: "",
        phone: "",
        email: "",
        create_at: "",
        img: "",
        ban: "",
    });

    const request_url = `${type}_data`;

    const submit = (e) => {
        // e.preventDefault();]
        console.log(data);
        router.post(request_url, data);
    };
    return (
        <form
            onSubmit={submit}
            className="lg:p-5 p-2 grid grid-cols-2 lg:gap-5 gap-2 w-1/3 h-[600px] overflow-auto place-items-stretch"
        >
            <h4 className="text-indigo-600 dark:text-indigo-300 capitalize text-center font-bold">
                {type}
            </h4>
            <div className="flex flex-row lg:gap-5 gap-2 text-indigo-600 items-center flex-grow col-span-2">
                <BsPerson />
                <TextInput
                    id="name"
                    name="name"
                    className={"border-2 border-indigo-500 grow"}
                    placeholder={"User name"}
                    required
                    defaultValue={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
            </div>
            <div className="flex flex-row lg:gap-5 gap-2 text-indigo-600 items-center flex-grow col-span-2">
                <BsPerson />
                <textarea
                    id="phone"
                    name="phone"
                    defaultValue={data.phone}
                    className={
                        "border-2 border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm grow"
                    }
                    placeholder={"Phone number"}
                    required
                    onChange={(e) => setData("phone", e.target.value)}
                />
            </div>
            <div className="flex flex-row lg:gap-5 gap-2 text-indigo-600 items-center flex-grow col-span-2">
                <BsPerson />
                <textarea
                    id="email"
                    name="email"
                    defaultValue={data.email}
                    className={
                        "border-2 border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm grow"
                    }
                    placeholder={"Email"}
                    required
                    onChange={(e) => setData("email", e.target.value)}
                />
            </div>
            <div className="flex flex-row lg:gap-5 gap-2 text-indigo-600 items-center flex-grow col-span-2">
                <BsPerson />
                <textarea
                    id="create_at"
                    name="create_at"
                    defaultValue={data.create_at}
                    className={
                        "border-2 border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm grow"
                    }
                    placeholder={"Create at"}
                    required
                    onChange={(e) => setData("create_at", e.target.value)}
                />
            </div>
            <div className="flex flex-row lg:gap-5 gap-2 text-indigo-600 items-center flex-grow col-span-2">
                <BsPerson />
                <TextInput
                    id="img"
                    name="img"
                    type="file"
                    className={"border-2 border-indigo-500 grow"}
                    placeholder={"User image"}
                    defaultValue={data.img}
                    required
                    onChange={(e) => setData("img", e.target.files[0])}
                />
            </div>
            <div className="flex flex-row lg:gap-5 gap-2 text-indigo-600 items-center">
                <FaBan />
                <label className="text-indigo-600 dark:text-indigo-500">Banned</label>
                <Checkbox
                    id="ban"
                    name="ban"
                    className={"border-2 border-indigo-500"}
                    defaultValue={data.tag}
                    required
                    onChange={(e) => setData("ban", e.target.checked)}
                />
            </div>
            <input
                type="submit"
                value={"Submit"}
                className="p-2 px-4 border-indigo-500 border-2 rounded-md bg-indigo-600 text-white col-span-1 justify-self-center"
            />
        </form>
    );
}
