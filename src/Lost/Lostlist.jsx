import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../Style/section.module.css";
import "../Style/font.css";

function Lostlist({ data }) {
    const navigate = useNavigate();

    const handleDetailClick = (item) => {
        navigate(`/detail/${item.id}`, { state: { item } });
    };

    return (
        <div className={styles["section-container"]}>
            <div className="PaperlogyMedium">
                <div className={styles["lost-container"]}>
                    {data.map((item) => (
                        <div className={styles["lost-item"]} key={item.id}>
                            <img
                                src={item.image}
                                alt={item.title}
                                className={styles["lost-item-image"]}
                            />
                            <div className={styles["lost-item-content"]}>
                                <div className={styles["lost-item-title"]}>
                                    {item.title}
                                </div>
                                <div className={styles["lost-item-date"]}>
                                    등록일 {item.date}
                                </div>
                                <div className={styles["lost-item-eq"]}>
                                    {item.map} {item.state}
                                </div>
                            </div>
                            <Button
                                variant="contained"
                                className={styles["detail-button"]}
                                onClick={() => handleDetailClick(item)}
                            >
                                상세정보 보기
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Lostlist;