// Sets all properties of an object to FALSE
export const isAllTrue = (obj: Object) => {
    for (const [key, value] of Object.entries(obj)) {
        if (value === false) {
            return false;
        }
    }
    return true;
};

export const toggleSelectAll = (obj: Object, allTrue: Boolean) => {
    for (const [key, value] of Object.entries(obj)) {
        if (allTrue) {
            obj[key] = false
        } else {
            obj[key] = true
        }
    }
};

export const handleSelectAll = (selectedItems: Object) => {
    console.log("handleSelectAll(), selectedItems:");
    console.log(selectedItems);

    const allTrue = isAllTrue(selectedItems);
    const updated = { ...selectedItems };
    toggleSelectAll(updated, allTrue);

    return updated
};

export const isSelectedAny = (selectedItems: Object) => {
    console.log("isSelectedAny(), selectedItems:");
    console.log(selectedItems);

    for (const [key, value] of Object.entries(selectedItems)) {
        if (value === true) {
            console.log("TRUE - selected item found");
            return true
        }
    }

    console.log("FALSE - no selected item found");
    return false;
};

export const isSelectedOne = (selectedItems: Object) => {
    let count = 0;

    for (const [key, value] of Object.entries(selectedItems)) {
        if (value === true) {
            count++;
        }
    }

    return count === 1;
};

export const extractIds = (items: Object) => {
    const imageIds = [];
    for (const [key, value] of Object.entries(items)) {
        if (value === true) {
            imageIds.push(key);
        }
    }
    return imageIds;
};