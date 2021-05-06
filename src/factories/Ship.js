const Ship = (ShipSize) => {
    const length = ShipSize;
    const hits = new Array(ShipSize).fill(false);
    console.log(hits);
    let coordinate = {};
    return {
        isSunk: () => {
            return !hits.includes(false);
        },
        getLength: () => length,
        hitAt: (index) => (hits[index] = true),
        getHits: () => hits,
        setCoordinate: (start, direction) => {
            coordinate = { start, direction };
        },
        getCoordinate: () => coordinate,
    };
};
export default Ship;
