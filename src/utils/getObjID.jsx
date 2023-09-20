const parseID = (id) => {
    const text = parseInt(id) > 10 ? '0' + id : '00' + id;
    return text;
};
export default parseID;
