import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "./Header";
import Styles from "../Style/detail.module.css";
import "../Style/font.css";

function Detail() {
    const { state } = useLocation();
    const { item } = state || {};
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [fdPlace, setFdPlace] = useState("");
    const [fdPlaceFetched, setFdPlaceFetched] = useState(false);

    useEffect(() => {
        if (item?.id) {
            if (item.id.startsWith("V")) {
                // ID가 'V'로 시작하면 두 번째 API 사용
                fetchFdPlaceFromSecondApi(item.id);
                fetchPhoneDataFromSecondApi(item.id);
            } else {
                // ID가 'V'가 아니면 첫 번째 API 사용
                fetchPhoneData(item.id);
                fetchFdPlace(item.id);
            }
        }
    }, [item]);

    const fetchPhoneData = async (id) => {
        try {
            const apiUrl1 = `https://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundDetailInfo?serviceKey=zSAXdQESWaDclJzqvuNXRlLDZxUTNzNDTwieZ0OykcY4%2FtrSgpXbbwjXCy0dUv9hDANnqKYH%2B%2BiUPEXnwLZpwg%3D%3D&ATC_ID=${id}&FD_SN=1`;
            const response1 = await fetch(apiUrl1, {
                headers: {
                    Accept: "application/json",
                },
            });

            if (response1.ok) {
                const result1 = await response1.json();
                const phoneNumber1 = result1?.response?.body?.item?.tel;
                if (phoneNumber1) {
                    setPhone(phoneNumber1);
                } else {
                    fetchPhoneDataFromSecondApi(id);
                }
            } else {
                console.error("첫 번째 API 호출 실패");
                fetchPhoneDataFromSecondApi(id);
            }
        } catch (error) {
            console.error("API 호출 오류:", error);
        }
    };

    const fetchPhoneDataFromSecondApi = async (id) => {
        try {
            const apiUrl2 = `https://apis.data.go.kr/1320000/LosPtfundInfoInqireService/getPtLosfundDetailInfo?serviceKey=zSAXdQESWaDclJzqvuNXRlLDZxUTNzNDTwieZ0OykcY4%2FtrSgpXbbwjXCy0dUv9hDANnqKYH%2B%2BiUPEXnwLZpwg%3D%3D&pageNo=1&numOfRows=10&ATC_ID=${id}&FD_SN=1`;
            const response2 = await fetch(apiUrl2, {
                headers: {
                    Accept: "application/json",
                },
            });

            if (response2.ok) {
                const result2 = await response2.json();
                console.log("두 번째 API 응답:", result2); // 응답 확인
                const phoneNumber2 = result2?.response?.body?.item?.tel;
                if (phoneNumber2) {
                    setPhone(phoneNumber2);
                } else {
                    setPhone("정보 없음");
                }
            } else {
                console.error("두 번째 API 호출 실패");
                setPhone("정보 없음");
            }
        } catch (error) {
            console.error("두 번째 API 호출 오류:", error);
            setPhone("정보 없음");
        }
    };

    const fetchFdPlace = async (id) => {
        try {
            const apiUrl = `https://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundDetailInfo?serviceKey=zSAXdQESWaDclJzqvuNXRlLDZxUTNzNDTwieZ0OykcY4%2FtrSgpXbbwjXCy0dUv9hDANnqKYH%2B%2BiUPEXnwLZpwg%3D%3D&ATC_ID=${id}&FD_SN=1`;
            const response = await fetch(apiUrl, {
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                const result = await response.json();
                const fdPlaceData = result?.response?.body?.item?.fdPlace;
                if (fdPlaceData) {
                    setFdPlace(fdPlaceData);
                } else {
                    setFdPlace("정보 없음");
                }
            } else {
                console.error("습득 장소 API 호출 실패");
                setFdPlace("정보 없음");
            }
        } catch (error) {
            console.error("습득 장소 API 호출 오류:", error);
            setFdPlace("정보 없음");
        }
    };

    const fetchFdPlaceFromSecondApi = async (id) => {
        try {
            const apiUrl = `https://apis.data.go.kr/1320000/LosPtfundInfoInqireService/getPtLosfundDetailInfo?serviceKey=zSAXdQESWaDclJzqvuNXRlLDZxUTNzNDTwieZ0OykcY4%2FtrSgpXbbwjXCy0dUv9hDANnqKYH%2B%2BiUPEXnwLZpwg%3D%3D&pageNo=1&numOfRows=10&ATC_ID=${id}&FD_SN=1`;
            const response = await fetch(apiUrl, {
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                const result = await response.json();
                console.log("두 번째 API 습득 장소 응답:", result); // 응답 확인
                const fdPlaceData = result?.response?.body?.item?.fdPlace;
                if (fdPlaceData && !fdPlaceFetched) {
                    setFdPlace(fdPlaceData);
                    setFdPlaceFetched(true);
                }
            } else {
                console.error("두 번째 API 습득 장소 호출 실패");
                setFdPlace("정보 없음");
            }
        } catch (error) {
            console.error("두 번째 API 습득 장소 호출 오류:", error);
            setFdPlace("정보 없음");
        }
    };

    if (!item) {
        return (
            <div>
                <Header />
                <div className={Styles["error-box"]}>
                    <div>분실물 정보가 없습니다.</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className={Styles["detail-container"]}>
                <img
                    src={item.image}
                    alt={item.title}
                    className={Styles["detail-image"]}
                />
                <div className={Styles["detail-info"]}>
                    <div className={Styles["detail-title"]}>
                        {item.title}
                        <div className={Styles["detail-mini"]}>{item.prdtClNm}</div>
                    </div>
                    <div>
                        <span className={Styles["detail-highlight"]}>등록일:</span>
                        {item.date}
                    </div>
                    <div>
                        <span className={Styles["detail-highlight"]}>습득장소:</span>
                        {fdPlace}
                    </div>
                    <div>
                        <span className={Styles["detail-highlight"]}>접수장소:</span>
                        {item.map}
                        <Button
                            variant="contained"
                            sx={{
                                marginLeft: "10px",
                            }}
                            size="small"
                            onClick={() => {
                                console.log("Navigating to Mappage with location:", item.map);
                                navigate("/Mappage", { state: { location: item.map } });
                            }}
                        >
                            지도
                        </Button>
                    </div>
                    <div>
                        <span className={Styles["detail-highlight"]}>보관장소:</span>
                        {item.map}
                    </div>
                    <div>
                        <span className={Styles["detail-highlight"]}>보관소 전화번호:</span>
                        {phone}
                    </div>
                </div>
                <div className={Styles["detail-description"]}>
                    <div className={Styles["detail-title"]}>
                        내용
                    </div>
                    {item.description || "내용 없음"}
                </div>
                <div className={Styles["detail-description"]}>
                    특이사항 : {item.comment || "정보 없음"}
                </div>
            </div>
        </div>
    );
}

export default Detail;