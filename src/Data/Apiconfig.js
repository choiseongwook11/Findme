export const buildApiUrl = () => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const SERVICE_KEY = process.env.REACT_APP_API_SERVICE_KEY;
    const PAGE_NO = process.env.REACT_APP_API_PAGE_NO;
    const NUM_OF_ROWS = process.env.REACT_APP_API_NUM_OF_ROWS;
    const START_YMD = process.env.REACT_APP_API_START_YMD;
    const END_YMD = process.env.REACT_APP_API_END_YMD;

    return `${BASE_URL}?serviceKey=${SERVICE_KEY}&pageNo=${PAGE_NO}&numOfRows=${NUM_OF_ROWS}&START_YMD=${START_YMD}&END_YMD=${END_YMD}`;
};