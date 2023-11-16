export const filterById = (array, id) => {
    return array.filter((item) => item.id !== id);
};

export const filterInByProperty = (array, property, value) => {
    return array.filter((item) => item[property] === value);
};

export const filterOutByProperty = (array, property, value) => {
    return array.filter((item) => item[property] !== value);
};

export const sortInDescOrder = (array) => {
    const newArray = [...array];
    const sorted = newArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sorted;
};
