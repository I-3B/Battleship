const Ship = (ShipSize) => {
    const length = ShipSize;
    let hits = 0;
    return {
        isSunk: () => {
            return hits === length;
        },
        getLength: () => length,
        hit: () => hits++,
        getHits: () => hits,
    };
};
export default Ship;
