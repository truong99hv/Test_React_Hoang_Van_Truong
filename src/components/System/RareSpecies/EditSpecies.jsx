import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../pages/header/Header";
import Footer from "../../../pages/footer/Footer";
import "./css/create.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Input } from "antd";
import {
  fetchAllClassify,
  fetchAllConserve,
  updateSpecies,
} from "../../../services/UserService";
import { useEffect } from "react";
import { useState } from "react";
import SelectClassify from "./SelectClassify";
import Selectyear from "./Selectyear";
import SelectConserve from "./SelectConserve";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditSpecies = () => {
  const [classify, setClassify] = useState([]);
  const [selected, setSelected] = useState({
    selectedKingdom: null,
    selectedPhylum: null,
    selectedClass: null,
    selectedOrder: null,
    selectedFamily: null,
  });
  const [listOptions, setListOptions] = useState({
    phylumOptions: [],
    classOptions: [],
    orderOptions: [],
    familyOptions: [],
    genusOptions: [],
  });
  const listClassify = {
    kingdom: [],
    phylum: [],
    class: [],
    order: [],
    family: [],
    genus: [],
  };
  const [ten, setTen] = useState("");
  const [id, setId] = useState("");
  const [tenKhoaHoc, setTenKhoaHoc] = useState("");
  const [kingdomId, setKingdomId] = useState("");
  const [phylumId, setPhylumId] = useState("");
  const [classId, setclassId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [familyId, setFamilyId] = useState("");
  const [genusId, setGenusId] = useState("");
  const [tenTacGia, setTenTacGia] = useState(null);
  const [nguonDuLieu, setNguonDuLieu] = useState(null);
  const [tenDiaPhuong, setTenDiaPhuong] = useState(null);
  const [errorData, setErrorData] = useState([]);
  const [rebBook, setrebBook] = useState([]);
  const [yearRedBook, setYearRedBook] = useState("");
  const [currentRedBook, setCurrentRedBook] = useState("");
  const [iucn, setIucn] = useState([]);
  const [yearIUCN, setYearIUCN] = useState("");
  const [currentIUCN, setCurrentIUCN] = useState("");
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };

  const getClasstify = async () => {
    try {
      let res = await fetchAllClassify();
      setClassify(res);
    } catch (error) {
      console.error("Error fetching species:", error);
    }
  };

  const getConserve = async () => {
    try {
      let res = await fetchAllConserve();
      setrebBook(res[0].childs);
      setIucn(res[1].childs);
    } catch (error) {}
  };

  const handleUpdateSpecies = async (id) => {
    const config = {
      ten: ten,
      ten_khoa_hoc: tenKhoaHoc,
      kingdom_id: kingdomId,
      phylum_id: phylumId,
      class_id: classId,
      order_id: orderId,
      family_id: familyId,
      genus_id: genusId,
      iucns: [{ nam: yearIUCN, id: currentIUCN }],
      sach_dos: [{ nam: yearRedBook, id: currentRedBook }],
      ten_tac_gia: tenTacGia,
      ten_dia_phuong: tenDiaPhuong,
      nguon_du_lieu: nguonDuLieu,
      attachments: [],
      cong_bo: true,
      dac_diem_loai: "",
      dac_diem_sinh_thai: "",
      gia_tri_loai: "",
      isTrusted: true,
      is_loai_dac_huu: null,
      loai_noi_bat: false,
      minh_hoa_attachments: [],
      nghi_dinhs: [],
      qrcode_color: "#fff",
      show_qrcode: true,
      sinh_canh_bi_chia_cat_suy_giam: {
        mo_ta_chi_tiet: "",
        noi_cu_tru_hoac_phan_bo: "Không xác định",
        su_suy_giam_lien_tuc_khu_vuc_phan_bo: "Không xác định",
        thong_tin_khac: "",
      },
      su_suy_giam_quan_the: {
        mo_ta_chi_tiet: "",
        suy_giam_quan_the_theo_quan_sat: "Không xác định",
        suy_giam_quan_the_theo_thoi_diem_danh_gia: "Không xác định",
        thong_tin_khac: "",
      },
      toa_dos: [],
    };

    try {
      await updateSpecies(id, config);
      toast.success("Cập nhật thành công ");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      setErrorData(error.response.data.errors);
    }
  };

  classify.map((item) => {
    switch (item.rank) {
      case "Kingdom":
        listClassify.kingdom.push(item);
        break;
      case "Phylum":
        listClassify.phylum.push(item);
        break;
      case "Class":
        listClassify.class.push(item);
        break;
      case "Order":
        listClassify.order.push(item);
        break;
      case "Family":
        listClassify.family.push(item);
        break;
      case "Genus":
        listClassify.genus.push(item);
        break;
      default:
        break;
    }
  });

  const handleKingdomChange = (value) => {
    setKingdomId(value);
    setSelected({ ...selected, selectedKingdom: value });
    switch (value) {
      case value:
        const newphylum = listClassify.phylum.filter(
          (item) => item.rank === "Phylum" && item.parent_id === value
        );

        setListOptions({ ...listOptions, phylumOptions: newphylum });
        break;

      default:
        setListOptions({
          ...listOptions,
          phylumOptions: listClassify.phylum,
        });
        break;
    }
  };

  const handlePhylumChange = (value) => {
    setPhylumId(value);
    setSelected({ ...selected, selectedPhylum: value });
    const newClass = listClassify.class.filter(
      (item) => item.rank === "Class" && item.parent_id === value
    );

    setListOptions({
      ...listOptions,
      classOptions: newClass,
    });
  };

  const handleClassChange = (value) => {
    setclassId(value);
    setSelected({ ...selected, selectedClass: value });
    const newOrder = listClassify.order.filter(
      (item) => item.rank === "Order" && item.parent_id === value
    );

    setListOptions({
      ...listOptions,
      orderOptions: newOrder,
    });
  };

  const handleOrderChange = (value) => {
    setOrderId(value);
    setSelected({ ...selected, selectedOrder: value });
    const newFamily = listClassify.family.filter(
      (item) => item.rank === "Family" && item.parent_id === value
    );

    setListOptions({
      ...listOptions,
      familyOptions: newFamily,
    });
  };

  const handleFamilyChange = (value) => {
    setFamilyId(value);
    setSelected({ ...selected, selectedFamily: value });
    const newGenus = listClassify.genus.filter(
      (item) => item.rank === "Genus" && item.parent_id === value
    );

    setListOptions({
      ...listOptions,
      genusOptions: newGenus,
    });
  };

  const handleGenusChange = (value) => {
    setGenusId(value);
  };

  const handleYearRedBook = (value) => {
    setYearRedBook(value);
  };

  const handleYearIUCN = (value) => {
    setYearIUCN(value);
  };

  const handleCurrentRedBook = (value) => {
    setCurrentRedBook(value);
  };

  const handleCurrentIUCN = (value) => {
    setCurrentIUCN(value);
  };

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("configSpecies"));
    console.log(local);
    getClasstify();
    getConserve();
    setId(local.id);
    setTen(local.ten);
    setTenKhoaHoc(local.ten_khoa_hoc);
    setKingdomId(local.kingdom_id);
    setPhylumId(local.phylum_id);
    setclassId(local.class_id);
    setOrderId(local.order_id);
    setFamilyId(local.family_id);
    setGenusId(local.genus_id);
    setTenTacGia(local.ten_tac_gia);
    setTenDiaPhuong(local.ten_dia_phuong);
    setNguonDuLieu(local.nguon_du_lieu);
    setYearRedBook(local.sach_dos[0].pivot.nam);
    setCurrentRedBook(local.sach_dos[0].pivot.sach_do_id);
    setYearIUCN(local.iucns[0].pivot.nam);
    setCurrentIUCN(local.iucns[0].pivot.iucn_id);
  }, []);
  return (
    <>
      <Header />(
      <div className="content-create container">
        <div className="title-create">
          <span onClick={handleGoBack}>
            <AiOutlineArrowLeft />
          </span>
          <h3>
            THÔNG TIN VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM CẦN ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </h3>
        </div>
        <div className="form">
          <div className="infor d-flex flex-wrap">
            <h4 className="title-info title col-12">
              I. Thông tin chung về loài
            </h4>
            <div className="name-info input-info col-12">
              <label className="lable-name">
                Tên <span className="obligatory">*</span>
              </label>
              <Input
                placeholder="Tên"
                size="large"
                value={ten}
                onChange={(e) => setTen(e.target.value)}
              />
              {errorData.ten && <span className="error">{errorData.ten}</span>}
            </div>
            <div className="science-name input-info col-6 pe-3">
              <label className="lable-name">
                Tên khoa học <span className="obligatory">*</span>
              </label>
              <Input
                placeholder="Tên khoa học"
                size="large"
                value={tenKhoaHoc}
                onChange={(e) => setTenKhoaHoc(e.target.value)}
              />
              {errorData.ten_khoa_hoc && (
                <span className="error">{errorData.ten_khoa_hoc}</span>
              )}
            </div>
            <div className="writer-name input-info col-6 ps-3">
              <label className="lable-name">Tên Tác Giả</label>
              <Input
                placeholder="Tên Tác Giả"
                size="large"
                value={tenTacGia}
                onChange={(e) => setTenTacGia(e.target.value)}
              />
            </div>
            <div className="nameplate input-info col-12">
              <label className="lable-name">Tên Địa Phương</label>
              <Input
                placeholder="Tên Địa Phương"
                size="large"
                value={tenDiaPhuong}
                onChange={(e) => setTenDiaPhuong(e.target.value)}
              />
            </div>
            <div className="data-sources input-info col-12">
              <label className="lable-name">Nguồn Dữ Liệu</label>
              <Input
                placeholder="Nguồn Dữ Liệu"
                size="large"
                value={nguonDuLieu}
                onChange={(e) => setNguonDuLieu(e.target.value)}
              />
            </div>
          </div>
          <div className="classify d-flex flex-wrap justify-content-between">
            <h4 className="title col-12">II. Phân loại học</h4>
            <div className="select-classify kingdom col-4">
              <div className="col-12 pe-2">
                <SelectClassify
                  nameClassify="Giới"
                  dataClassify={listClassify.kingdom}
                  handleFilterClassify={handleKingdomChange}
                  valueUpdate={kingdomId}
                />
                {errorData.kingdom_id && (
                  <span className="error">{errorData.kingdom_id}</span>
                )}
              </div>
            </div>
            <div className="select-classify phylum col-4">
              <div className="col-12 pe-1 ps-1">
                <SelectClassify
                  nameClassify="Ngành"
                  dataClassify={listOptions.phylumOptions}
                  handleFilterClassify={handlePhylumChange}
                  valueUpdate={phylumId}
                />
                {errorData.phylum_id && (
                  <span className="error">{errorData.phylum_id}</span>
                )}
              </div>
            </div>
            <div className="select-classify class col-4">
              <div className="col-12 ps-2">
                <SelectClassify
                  nameClassify="Lớp"
                  dataClassify={listOptions.classOptions}
                  handleFilterClassify={handleClassChange}
                  valueUpdate={classId}
                />
                {errorData.class_id && (
                  <span className="error">{errorData.class_id}</span>
                )}
              </div>
            </div>
            <div className="select-classify order col-4">
              <div className="col-12 pe-2">
                <SelectClassify
                  nameClassify="Bộ"
                  dataClassify={listOptions.orderOptions}
                  handleFilterClassify={handleOrderChange}
                  valueUpdate={orderId}
                />
                {errorData.order_id && (
                  <span className="error">{errorData.order_id}</span>
                )}
              </div>
            </div>
            <div className="select-classify family col-4">
              <div className="col-12 pe-1 ps-1">
                <SelectClassify
                  nameClassify="Họ"
                  dataClassify={listOptions.familyOptions}
                  handleFilterClassify={handleFamilyChange}
                  valueUpdate={familyId}
                />
                {errorData.family_id && (
                  <span className="error">{errorData.family_id}</span>
                )}
              </div>
            </div>
            <div className="select-classify genus col-4">
              <div className="col-12 ps-2">
                <SelectClassify
                  nameClassify="Chi"
                  dataClassify={listOptions.genusOptions}
                  handleFilterClassify={handleGenusChange}
                  valueUpdate={genusId}
                />
                {errorData.genus_id && (
                  <span className="error">{errorData.genus_id}</span>
                )}
              </div>
            </div>
          </div>

          <div className="conserve d-flex flex-wrap justify-content-between">
            <h4 className="title col-12">III. Tình trạng bảo tồn</h4>

            <div className="red-book col-5 d-flex justify-content-between flex-wrap">
              <div className="col-12">
                <div className="title-conserve col-12">Sách đỏ</div>
              </div>
              <div className="col-5">
                <Selectyear
                  nameLabel={"Năm"}
                  valueYear={handleYearRedBook}
                  valueUpdate={yearRedBook}
                />
              </div>

              <div className="col-5">
                <SelectConserve
                  dataConserve={rebBook}
                  nameConserve={" Hiện trạng "}
                  handleConserve={handleCurrentRedBook}
                  valueUpdate={currentRedBook}
                />
              </div>
            </div>
            <div className="iucn col-5 d-flex justify-content-between flex-wrap">
              <div className="title-conserve col-12">IUCN</div>
              <div className="col-5">
                <Selectyear
                  nameLabel={"Năm"}
                  valueYear={handleYearIUCN}
                  valueUpdate={yearIUCN}
                />
              </div>

              <div className="col-5">
                <SelectConserve
                  dataConserve={iucn}
                  nameConserve={" Hiện trạng "}
                  handleConserve={handleCurrentIUCN}
                  valueUpdate={currentIUCN}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn btn-danger btn-create"
          onClick={() => handleUpdateSpecies(id)}
        >
          Cập nhật
        </button>
      </div>
      )
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default EditSpecies;
