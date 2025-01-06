import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Styles from "../Style/detail.module.css";

function Founddetail() {
    const { state } = useLocation(); // Foundlist에서 전달된 데이터
    const { item } = state || {}; // 선택된 항목
    const [phone, setPhone] = useState(""); // 전화번호 상태
    const [details, setDetails] = useState(null); // 추가 세부 정보를 위한 상태

    const API_KEY = "zSAXdQESWaDclJzqvuNXRlLDZxUTNzNDTwieZ0OykcY4%2FtrSgpXbbwjXCy0dUv9hDANnqKYH%2B%2BiUPEXnwLZpwg%3D%3D";

    // 세부 정보를 로드
    useEffect(() => {
        if (item?.atcId) {
            fetchDetails(item.atcId);
        }
    }, [item]);

    const fetchDetails = async (id) => {
        try {
            const apiUrl = `https://apis.data.go.kr/1320000/LostGoodsInfoInqireService/getLostGoodsDetailInfo?serviceKey=${API_KEY}&ATC_ID=${id}`;
            const response = await fetch(apiUrl, {
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                const result = await response.json();
                const detailItem = result?.response?.body?.item;

                if (detailItem) {
                    setPhone(detailItem.tel || "정보 없음");
                    setDetails(detailItem);
                } else {
                    setPhone("정보 없음");
                    setDetails(null);
                }
            } else {
                console.error("API 호출 실패:", response.status);
                setPhone("정보 없음");
                setDetails(null);
            }
        } catch (error) {
            console.error("API 호출 오류:", error);
            setPhone("정보 없음");
            setDetails(null);
        }
    };

    // 데이터가 없을 경우 처리
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
                {/* 이미지가 존재하면 해당 이미지 표시, 없으면 기본 이미지 표시 */}
                <img
                    src={"https://i.ibb.co/fQvvBhH/image.png"}
                    alt={details?.lstPrdtNm || item.lstPrdtNm}
                    className={Styles["detail-image"]}
                />
                <div className={Styles["detail-info"]}>
                    <div className={Styles["detail-title"]}>
                        {details?.lstPrdtNm || item.lstPrdtNm}
                        <div className={Styles["detail-mini"]}>
                            {details?.prdtClNm || item.prdtClNm}
                        </div>
                    </div>
                    <div>
                        <span className={Styles["detail-highlight"]}>분실일:</span>
                        {details?.lstYmd || item.lstYmd}
                    </div>
                    <div>
                        <span className={Styles["detail-highlight"]}>위치:</span>
                        {details?.lstPlace || item.lstPlace}
                    </div>
                    <div>
                        <span className={Styles["detail-highlight"]}>전화번호:</span>
                        {phone}
                    </div>
                </div>
                <div className={Styles["detail-description"]}>
                    <div className={Styles["detail-title"]}>내용</div>
                    {details?.lstSbjt || item.lstSbjt || "정보 없음"}
                </div>
                <div className={Styles["detail-title"]}>비슷한 습득물</div>
                <div className={Styles["detail-same-lost"]}>
                <div className={Styles["section-container"]}>
                    <div className="PaperlogyMedium">
                        <div className={Styles["found-container"]}>
                            {/* {data.map((item) => ( */}
                                <div className={Styles["found-item"]} key={item.id}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className={Styles["found-item-image"]}
                                    />
                                    <div className={Styles["found-item-content"]}>
                                    <div className={Styles["found-item-title"]}>
                                        {item.title} 제목
                                    </div>
                                    <div className={Styles["found-item-date"]}>
                                        등록일 {item.date}
                                    </div>
                                        <div className={Styles["found-item-eq"]}>
                                            {item.map} {item.state} 잃어버린위치/상태
                                        </div>
                                    </div>
                                </div>
                                {/* ))} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Founddetail;