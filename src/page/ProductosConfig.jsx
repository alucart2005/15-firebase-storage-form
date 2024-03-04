import styled from "styled-components";
import photo from "../assets/sinfoto_.png";
import { BtnOperations } from "../components/BtnOperations";
import { FcPicture } from "react-icons/fc";
import { useRef } from "react";

export function ProductosConfig() {
  const ref = useRef(null);
  function openImages() {
    ref.current.click();
  }
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="header">
          <h1>🙀product registration</h1>
        </div>
        <div className="pictureContainer">
          <img src={photo} alt="" />
          <BtnOperations
            funcion={openImages}
            title="Load Image"
            picture={<FcPicture />}
          />
          <input ref={ref} type="file" accept="image/png" />
        </div>
        <form className="entradas">
          <ContainerInputs>
            <div className="subcontainer">
              <h4>Description:</h4>
              <Inputs placeholder="Input description" />
            </div>
          </ContainerInputs>
          <ContainerInputs>
            <div className="subcontainer">
              <h4>Price:</h4>
              <Inputs placeholder="Input price" />
            </div>
          </ContainerInputs>
          <div className="footercontent">
            <BtnOperations
              funcion={openImages}
              title="Send"
              picture={<FcPicture />}
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .sub-contenedor {
    width: 80%;
    background-color: #e7ebf0;
    border-radius: 10px;
    padding: 10px 20px;
    margin: 0 20px;
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
    }
    .pictureContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      flex-direction: column;
      img {
        width: 100px;
        object-fit: cover;
      }
      input {
        display: none;
      }
    }
    .entradas {
      .footercontent{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin-top: 20px;
        /* gap: 20px; */
      }
    }
  }
`;
const ContainerInputs = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  .subcontainer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;
const Inputs = styled.input`
  border: 2px solid #e8e8e8;
  padding: 15px;
  border-radius: 10px;
  background-color: #212121;
  font-size: small;
  font-weight: bold;
  text-align: center;
  color: white;
  text-align: start;
  width: 70%;
  &:focus {
    outline-color: white;
    background-color: #212121;
    color: #e8e8e8;
    box-shadow: 5px 5px #888888;
  }
`;
