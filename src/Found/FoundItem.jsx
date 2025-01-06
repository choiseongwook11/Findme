import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Founditem = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [map, setMap] = useState("");
    const [state, setState] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();
    const db = getFirestore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 로그인 여부 확인
        const user = auth.currentUser;
        if (!user) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            await addDoc(collection(db, "lostItems"), {
                title,
                date,
                map,
                state,
                image: image ? URL.createObjectURL(image) : null, // 이미지 저장 (로컬 URL 임시 처리)
                userId: user.uid,
                createdAt: new Date(),
            });
            alert("분실물이 성공적으로 등록되었습니다!");
            navigate("/"); // 등록 후 홈으로 이동
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("분실물 등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: "500px",
                margin: "50px auto",
                padding: 4,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: 3,
                backgroundColor: "#ffffff",
            }}
        >
            <Typography variant="h5" component="h2" sx={{ textAlign: "center", marginBottom: 3 }}>
                분실물 등록
            </Typography>
            <TextField
                label="제목"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="등록일"
                type="date"
                fullWidth
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="위치"
                fullWidth
                required
                value={map}
                onChange={(e) => setMap(e.target.value)}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="상태"
                fullWidth
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                sx={{ marginBottom: 2 }}
            />
            <Button
                variant="contained"
                component="label"
                sx={{ marginBottom: 2, display: "block" }}
            >
                이미지 업로드
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </Button>
            {image && (
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    선택된 파일: {image.name}
                </Typography>
            )}
            <Button type="submit" variant="contained" fullWidth>
                등록하기
            </Button>
        </Box>
    );
};

export default Founditem;