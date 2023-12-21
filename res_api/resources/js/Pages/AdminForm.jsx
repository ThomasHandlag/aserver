import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { BsBug } from "react-icons/bs";
import { router } from "@inertiajs/react";

export default function AdminForm({ type, item }) {
    const { data, setData } = useForm(
        item
            ? {
                  id: item.id,
                  error: item.error,
                  solution: item.solution,
                  reason: item.reason,
                  description: item.description,
                  img: "",
                  tag: item.tag,
              }
            : {
                  error: "",
                  solution: "",
                  reason: "",
                  description: "",
                  img: "",
                  tag: "", 
              }
    );
    
    function tempImg() {
        if (data.img) {
            return URL.createObjectURL(data.img);
        }
    }

    const request_url = `${type}_data`;

    const submit = (e) => {
        // e.preventDefault();
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
                <BsBug />
                <TextInput
                    id="error"
                    name="error"
                    className={"border-2 border-indigo-500 grow"}
                    placeholder={"Error name"}
                    required
                    defaultValue={item ? item.error : data.error}
                    onChange={(e) => setData("error", e.target.value)}
                />
            </div>
            <div className="flex flex-row lg:gap-5 gap-2 text-indigo-600 items-center flex-grow col-span-2">
                <BsBug />
                <textarea
                    id="solution"
                    name="solution"
                    defaultValue={item ? item.solution : data.solution}
                    className={
                        "border-2 border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm grow"
                    }
                    placeholder={"Solution"}
                    required
                    onChange={(e) => setData("solution", e.target.value)}
                />
            </div>
            <div className="flex flex-row lg:gap-5 gap-2 text-indigo-600 items-center flex-grow col-span-2">
                <BsBug />
                <textarea
                    id="reason"
                    name="reason"
                    defaultValue={item ? item.reason : data.reason}
                    className={
                        "border-2 border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm grow"
                    }
                    placeholder={"Reason"}
                    required
                    onChange={(e) => setData("reason", e.target.value)}
                />
            </div>
            <div className="flex flex-row lg:gap-5 gap-2 text-indigo-600 items-center flex-grow col-span-2">
                <BsBug />
                <textarea
                    id="description"
                    name="description"
                    defaultValue={item ? item.description : data.description}
                    className={
                        "border-2 border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm grow"
                    }
                    placeholder={"Description"}
                    required
                    onChange={(e) => setData("description", e.target.value)}
                />
            </div>
            <img src={item ? item.img : tempImg()} className="w-[150px] h-[150px] ml-20" />
            <div className="flex flex-row lg:gap-5 gap-2 text-indigo-600 items-center flex-grow col-span-2">
                <BsBug />
                <TextInput
                    id="img"
                    name="img"
                    type="file"
                    className={"border-2 border-indigo-500 grow"}
                    placeholder={"Example image"}
                    defaultValue={data.img}
                    required
                    onChange={(e) => setData("img", e.target.files[0])}
                />
            </div>
            <div className="flex flex-row lg:gap-5 gap-2 text-indigo-600 items-center flow-grow col-span-2">
                <BsBug />
                <TextInput
                    id="tag"
                    name="tag"
                    className={"border-2 border-indigo-500 grow"}
                    placeholder={"Tag"}
                    defaultValue={item ? item.tag : data.tag}
                    required
                    onChange={(e) => setData("tag", e.target.value)}
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
