import { getImageList } from "@/lib/api/common.api";
import { ImageModel } from "@/lib/model/common";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ImageListWrapper = styled.div`
  height: 338px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 16px;
`;

const Title = styled.div`
  font-size: larger;
  font-weight: 500;
  color: #484848;
`;

const ImageWrapper = styled.div`
  margin: 4px 0px 8px 0px;
  padding: 6px;
  border-radius: 12px;
  background-color: #83a2ff40;
  color: #484848;
`;

const ImageHeader = styled.div`
  display: flex;
  font-weight: 700;
  justify-content: center;
  margin-bottom: 4px;
`;

const ImageItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImageItem = styled.div`
  margin: 2px;
  font-size: 15px;
`;

export default function ImageList() {
  const [imageList, setImageList] = useState<ImageModel[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getImageList();
      setImageList(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <ImageListWrapper>
        <Title>• Image List</Title>
        {imageList.map((image) => {
          return (
            <ImageWrapper key={image.id}>
              <ImageHeader>{image.name}</ImageHeader>
              <ImageItemWrapper>
                <ImageItem>ID :</ImageItem>
                <ImageItem>{image.id}</ImageItem>
              </ImageItemWrapper>
              <ImageItemWrapper>
                <ImageItem>아키텍쳐 :</ImageItem>
                <ImageItem>{image.architecture}</ImageItem>
              </ImageItemWrapper>
              <ImageItemWrapper>
                <ImageItem>하이퍼바이저 :</ImageItem>
                <ImageItem>{image.hypervisor}</ImageItem>
              </ImageItemWrapper>
              <ImageItemWrapper>
                <ImageItem>가상화타입 :</ImageItem>
                <ImageItem>{image.virtualizationType}</ImageItem>
              </ImageItemWrapper>
            </ImageWrapper>
          );
        })}
      </ImageListWrapper>
    </>
  );
}
