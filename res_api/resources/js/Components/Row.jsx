export default function Row ({ open, value, isCheck, handleCheckbox, ...props })  {
    return (
        <tr className="hover:bg-gray-300 select-none dark:hover:bg-indigo-800" onClick={open}>
            <td>{value.error}</td>
            <td>{value.tags}</td>
            <td>{value.reason}</td>
            <td>{value.solution}</td>
            <td>{value.description}</td>
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
};