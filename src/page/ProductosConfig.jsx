import styled from "styled-components";
import photo from "../assets/sinfoto_.png";
import { BtnOperations } from "../components/BtnOperations";
import { FcPicture } from "react-icons/fc";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Spinner } from "../components/Spinner";
import {
  InsertarProductos,
  EditarUrlImg,
  SubirImgStorage,
  ValidarDatosRepetidos,
} from "../api/Aproductos";

export function ProductosConfig() {
  const [loading, setLoading] = useState(false);
  const [fileurl, setFileurl] = useState(photo);
  const [file, setFile] = useState([]);
  const [estadoImg, setEstadoimg] = useState(false);
  const ref = useRef(null);
  function subirimgStorage(e) {
    // carga local
    let filelocal = e.target.files;
    let fileReaderLocal = new FileReader();
    fileReaderLocal.readAsDataURL(filelocal[0]);
    const tipoimg = e.target.files[0];

    if (tipoimg.type.includes("image/png")) {
      if (fileReaderLocal && filelocal && filelocal.length) {
        fileReaderLocal.onload = function load() {
          setFileurl(fileReaderLocal.result);
        };
        // Preparar img para el storage
        let fileList = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(fileList[0]);
        fileReader.onload = function () {
          let imageData = fileReader.result;
          setFile(imageData);
        };
      }
    }
  }
  function openImages() {
    ref.current.click();
  }
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function insertar(data) {
    const img = file.length;
    if (img != 0) {
      setLoading(true);
      setEstadoimg(false);
      const p = {
        description: data.description,
        price: data.price,
        icono: "-",
      };
      const rptRepetidos = await ValidarDatosRepetidos(p);
      if (rptRepetidos == 0) {
        const id = await InsertarProductos(p);
        const resptUrl = await SubirImgStorage(id, file);
        await EditarUrlImg(id, resptUrl);
        setLoading(false);
        reset({ description: "", price: "" });
        setFileurl(photo);
        swal({
          title: "Good job!",
          text: "Registered product!",
          icon: "success",
        });
      } else {
        setLoading(false);
        swal({
          title: "Repeated data!",
          text: "You already have a record with that description.",
          icon: "warning",
        });
      }
    } else {
      setEstadoimg(true);
    }
  }
  return (
    <Container>
      <div className="sub-contenedor">
        {loading ? <Spinner /> : ""}
        <div className="header">
          <h1>🙀product registration</h1>
        </div>
        <div className="pictureContainer">
          <img src={fileurl} alt="" />
          <BtnOperations
            funcion={openImages}
            title="Load Image"
            picture={<FcPicture />}
          />
          <input
            ref={ref}
            type="file"
            onChange={subirimgStorage}
            accept="image/png"
          />
        </div>
        {estadoImg && (
          <p style={{ textAlign: "center", color: "red" }}>Select a image</p>
        )}
        <form className="entradas" onSubmit={handleSubmit(insertar)}>
          <ContainerInputs>
            <div className="subcontainer">
              <h4>Description:</h4>
              <Inputs
                placeholder="Input description"
                type="text"
                {...register("description", { required: true, maxLength: 20 })}
              />
            </div>
            {errors.description?.type === "required" && (
              <p>Input a description</p>
            )}
            {errors.description?.type === "maxLength" && (
              <p>maximum length 20 characters</p>
            )}
          </ContainerInputs>
          <ContainerInputs>
            <div className="subcontainer">
              <h4>Price:</h4>
              <Inputs
                placeholder="Input price"
                type="number"
                step="0.01"
                {...register("price", { required: true, valueAsNumber: true })}
              />
            </div>
            {errors.price?.type === "required" && <p>Input a number</p>}
            {errors.price?.type === "valueAsNumber" && (
              <p>Input a valid number</p>
            )}
          </ContainerInputs>
          <div className="footercontent">
            <BtnOperations title="Send" picture={<FcPicture />} />
          </div>
        </form>
      </div>
    </Container>
  );
}

//#region STYLED COMPONENTS
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
      .footercontent {
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
    justify-content: space-between;
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

//#endregion
