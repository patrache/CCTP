import { UseModalState } from "@/lib/store/useEc2Store";
import { useState } from "react";
import styled from "styled-components";

const imageList = ["htcondor-slave", "htcondor-master"];

const ModalContainer = styled.div<{ modalState: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.modalState ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  background-color: #48484890;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background-color: white;
  border-radius: 10px;
  height: 400px;
  width: 440px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #484848;
  padding-bottom: 60px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding-top: 40px;
`;

const Button = styled.div`
  color: #484848;
  border-radius: 6px;
  width: 140px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CloseButton = styled(Button)`
  border: 1px solid #70707060;
  background-color: white;
`;

const SubmitButton = styled(Button)`
  background-color: #beadfac0;
`;

const InputLabel = styled.label`
  color: #484848;
  font-size: 18px;
  padding-bottom: 30px;
`;

const InstanceNameInput = styled.input`
  font-size: 18px;
  border-radius: 6px;
  border: 1px solid #707070;
  margin: 4px;
  padding: 4px 10px 4px 10px;
  width: 250px;
  outline: none;
  color: #484848;
  &:focus {
    border: 2px solid #beadfa;
    margin: 3px;
  }
`;

const ImageNameSelect = styled.select`
  font-size: 18px;
  border-radius: 6px;
  border: 1px solid #707070;
  margin: 4px;
  padding: 3.5px 4px 3.5px 4px;
  width: 272px;
  outline: none;
  color: #484848;
  &:focus {
    border: 2px solid #beadfa;
    margin: 3px 4px 3px 4px;
  }
`;

const ImageNameOption = styled.option`
  color: #484848;
  
`;

export default function InstanceCreateModal() {
  const modalState = UseModalState((state) => state.modalState);
  const closeModal = UseModalState((state) => state.setModalState);
  const [instanceName, setInstanceName] = useState("");
  const [imageName, setImageName] = useState("");

  // TODO: Title -> 입력 (이미지 선택 -> 이름 선택) -> 버튼
  return (
    <>
      <ModalContainer modalState={modalState} onClick={() => closeModal(false)}>
        <ModalBox onClick={(e) => e.stopPropagation()}>
          <Title>인스턴스 생성</Title>
          <InputLabel>
            인스턴스 이름 :{" "}
            <InstanceNameInput
              onChange={(e) => setInstanceName(e.target.value)}
              placeholder="please enter instance name"
            />
          </InputLabel>
          <InputLabel>
            이미지&nbsp;&nbsp;&nbsp; 선택 :{" "}
            <ImageNameSelect>
              {imageList.map((image) => (
                <ImageNameOption key={image} value={image}>
                  {image}
                </ImageNameOption>
              ))}
            </ImageNameSelect>
          </InputLabel>
          <ButtonWrapper>
            <CloseButton onClick={() => closeModal(false)}>닫기</CloseButton>
            <SubmitButton>생성</SubmitButton>
          </ButtonWrapper>
        </ModalBox>
      </ModalContainer>
    </>
  );
}
