import Checkbox from "@/Components/Checkbox";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Row from "@/Components/Row";
import AdminForm from "./AdminForm";

export default function DataBoard({ data }) {
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

    const [selectedCount, setSelectedCount] = useState(0);
    const [formType, setFormType] = useState(<AdminForm type={"add"} />);
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
                checked: value == item.item.id ? checked : item.checked,
            };
        });
        setList(updateList);
        list.forEach((item) => {
            if (item.checked) {
                setSelectedCount(selectedCount + 1);
            }
        });
    };

    const [ids, setIds] = useState([]);

    const countSelected = () => {
        let count = 0;

        let listIds = list.map((item) => {
            if (item.checked) {
                count = count + 1;
                return item.item.id;
            }
        });
        setIds(listIds);
        setSelectedCount(count);
    };

    function removeSelected() {
        router.post('delete_data', { ids: ids });
    }

    useEffect(() => {
        countSelected();
    }, [list]);

    function showUpdate(item) {
        setFormType(<AdminForm type={"update"} item={item} />);
    }
    return (
        <>
            <Head title="Data Board" />
            <div
                className={`p-5 text-black dark:text-white dark:bg-gray-950 flex lg:flex-row`}
            >
                <div className="flex flex-col w-2/3 flex-grow items-center">
                    <div className="flex flex-row gap-5 justify-center items-center">
                        <button
                            title="Add new data"
                            className={`p-2 px-4 border-indigo-500 border-2 rounded-lg ${
                                formType == "add"
                                    ? "bg-indigo-500 text-white"
                                    : "bg-indigo-200 dark:bg-indigo-900"
                            }`}
                            onClick={() =>
                                setFormType(<AdminForm type={"add"} />)
                            }
                        >
                            Add
                        </button>
                        <button className="p-2 px-4 border-indigo-500 border-2 rounded-lg flex flex-row gap-2 items-center" onClick={removeSelected}>
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
                            <tr className="items-center">
                                <th>Error</th>
                                <th>Tag</th>
                                <th>Solution</th>
                                <th>Reason</th>
                                <th>Description</th>
                                <th className="flex flex-row gap-2 justify-center items-center">
                                    <Checkbox
                                        onChange={checkAllItem}
                                        tooltip={"Check all"}
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item) => (
                                <Row
                                    key={item.item.id}
                                    isCheck={item.checked}
                                    value={item.item}
                                    handleCheckbox={handleCheckbox}
                                    open={() => showUpdate(item.item)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                {formType}
            </div>
        </>
    );
}
