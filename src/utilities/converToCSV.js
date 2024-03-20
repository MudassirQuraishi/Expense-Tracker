export const convertToCSV = (data) => {
    if (!data || data.length === 0) {
        return "";
    }

    const header = Object.keys(data[0]).join(",") + "\n";

    const csvData = data
        .map((item) => {
            return Object.values(item).join(",") + "\n";
        })
        .join("");

    return header + csvData;
};
