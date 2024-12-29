import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "./Header";
import Styles from "../Style/detail.module.css";
import "../Style/font.css";

function Detail() {
    const { state } = useLocation();
    const { item } = state || {};

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
                    </div>
                    <div>
                        <span className={Styles["detail-highlight"]}>등록일:</span>
                        {item.date}
                    </div>
                    <div>
                        <span className={Styles["detail-highlight"]}>습득장소:</span>
                        {item.map} 
                    </div>
                    <div>
                        <span className={Styles["detail-highlight"]}>접수장소:</span>
                        {item.map} <Button variant="contained" size="small">지도</Button>
                    </div>
                    <div>
                        <span className={Styles["detail-highlight"]}>보관장소:</span>
                        {item.map} <span className={Styles["detail-state"]}>{item.state}</span>
                    </div>
                    <div>
                        <span className={Styles["detail-highlight"]}>
                            보관소 전화번호:
                        </span>
                        {item.phone || "정보 없음"}
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