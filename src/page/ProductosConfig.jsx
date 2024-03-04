import styled from "styled-components";
import photo from "../assets/sinfoto_.png" 
import { BtnOperations } from "../components/BtnOperations";
import { FcPicture } from "react-icons/fc";

export function ProductosConfig() {
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="header">
          <h1>🙀Registro de productos</h1>

        </div>
        <div className="pictureContainer">
          <img src={photo} alt="" />
          <BtnOperations title="Load Image" picture={<FcPicture/>}/>
        </div>
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
.sub-contenedor{
  .header{
    display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;

  }
  .pictureContainer{
    img{
      width: 100px;
      object-fit: cover;
    }
  }
}
`;