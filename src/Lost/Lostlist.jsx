import React, { useState } from "react";
import { Button, Card, CardContent, CardMedia, Typography, Grid, Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Lostlist({ data }) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // 페이지당 항목 수

    // 페이지 번호 변경 처리
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    // 현재 페이지에 해당하는 항목 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handleDetailClick = (item) => {
        navigate(`/detail/${item.id}`, { state: { item } });
    };

    return (
        <Box sx={{ padding: 4, width: "900px", margin: "auto" }}>
            <Grid container spacing={5} justifyContent="center">
                {data.length === 0 ? (
                    <Typography variant="h6" sx={{ width: "100%", textAlign: "center" }}>
                        검색된 항목이 없습니다.
                    </Typography>
                ) : (
                    currentItems.map((item) => (
                        <Grid item key={item.id} xs={12} sm={6} md={4}>
                            <Card
                                onClick={() => handleDetailClick(item)}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    borderRadius: 3,
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                    overflow: "hidden",
                                    backgroundColor: "#ffffff",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={item.image}
                                    alt={item.title}
                                    sx={{
                                        width: "100%",
                                        height: 300,
                                        objectFit: "cover",
                                    }}
                                />
                                <CardContent sx={{ padding: 1, textAlign: "center" }}>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: "1.25rem",
                                            color: "#333",
                                            marginBottom: 1,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#757575",
                                            marginBottom: 0.5,
                                        }}
                                    >
                                        등록일: {item.date}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#FF5722",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.map} {item.state}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
            {/* Pagination 컴포넌트 추가 */}
            <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
            />
        </Box>
    );
}

export default Lostlist;