import React, { useEffect, useState } from "react";
import "./css/species.css";
import { GiAnimalSkull } from "react-icons/gi";
import { domain } from "../../../Constant/api";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { deleteSpecies, fetchAllSpecies } from "../../../services/UserService";
import { BsPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Popover } from "antd";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "antd/es/input/Input";
import { GoSearch } from "react-icons/go";
const RareSpecies = () => {
  const [listSpecies, setListSpecies] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(5);
  const [search, setSearh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [nameDelete, setNameDelete] = useState("");

  const handleCloseModal = () => setShowModal(false);

  const getSpecies = async () => {
    setLoading(true);
    try {
      let data = await fetchAllSpecies(page, perpage, search);
      const listDataSpecies = data.list;
      const paginationSpecies = data.pagination;
      setListSpecies(listDataSpecies);
      setTotalPage(
        Math.ceil(paginationSpecies.total / paginationSpecies.itemsPerPage)
      );
    } catch (error) {
      console.log(error.message);
      console.error("Error fetching species:", error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      await deleteSpecies(idDelete);
      getSpecies();
      setShowModal(false);
      toast.success(`Đã xóa thành công ${nameDelete}`);
    } catch (error) {
      toast.error("Không xóa thành công");
    }
  };

  const setToLocalStorage = (
    id,
    ten,
    ten_khoa_hoc,
    kingdom_id,
    phylum_id,
    class_id,
    order_id,
    family_id,
    genus_id,
    iucns,
    sach_dos,
    ten_tac_gia,
    ten_dia_phuong,
    nguon_du_lieu
  ) => {
    localStorage.setItem(
      "configSpecies",
      JSON.stringify({
        id,
        ten,
        ten_khoa_hoc,
        kingdom_id,
        phylum_id,
        class_id,
        order_id,
        family_id,
        genus_id,
        iucns,
        sach_dos,
        ten_tac_gia,
        ten_dia_phuong,
        nguon_du_lieu,
      })
    );
  };

  useEffect(() => {
    getSpecies();
  }, [page, perpage, search]);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handlePepage = (event) => {
    const selectedPerpage = parseInt(event.target.value);
    setPerpage(selectedPerpage);
  };

  const getStartIndex = () => {
    return (page - 1) * perpage + 1;
  };

  const getEndIndex = () => {
    const endIndex = page * perpage;
    return Math.min(endIndex, totalPage);
  };

  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/them-moi");
  };

  const handleUpdateClick = (item) => {
    navigate(`/cap-nhat/${item.id}`);
    setToLocalStorage(
      item.id,
      item.ten,
      item.ten_khoa_hoc,
      item.kingdom_id,
      item.phylum_id,
      item.class_id,
      item.order_id,
      item.family_id,
      item.genus_id,
      item.iucns,
      item.sach_dos,
      item.ten_tac_gia,
      item.ten_dia_phuong,
      item.nguon_du_lieu
    );
  };

  return (
    <>
      <div className="species ">
        <h3 className="title-species">
          <span>
            <GiAnimalSkull />
          </span>
          Loài nguy cấp quý hiếm
        </h3>

        <div className="col-12 mb-4 mt-3 d-flex justify-content-between">
          <div className="search col-8">
            <Input
              size="large"
              placeholder="Tìm kiếm theo tên"
              prefix={<GoSearch />}
              allowClear
              onChange={(e) => setSearh(e.target.value)}
            />
          </div>

          <div to="/them-moi" className="col-2 float-end">
            <button
              className="btn btn-danger float-end"
              onClick={handleCreateClick}
            >
              Thêm mới
            </button>
          </div>
        </div>

        {search && listSpecies == "" ? (
          <div className="col-12 align-content-center">Không có dữ liệu </div>
        ) : (
          <div className="table-species">
            <div className="table-container">
              <table className="table table-hover">
                <thead className="title-table">
                  <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Tên khoa học </th>
                    <th scope="col">Giới</th>
                    <th scope="col">Ngành</th>
                    <th scope="col">Lớp</th>
                    <th scope="col">Bộ</th>
                    <th scope="col">Họ</th>
                    <th scope="col">Chi</th>
                    <th scope="col">Hành Động</th>
                  </tr>
                  {loading ? <tr className="loading"></tr> : ""}
                </thead>
                <tbody>
                  {listSpecies.map((item, index) => (
                    <tr key={index}>
                      <td className="name-species">
                        <span>
                          {item.attachments == "" ? (
                            <img
                              src={domain + "static/img/favicon.e4ca0e6e.png"}
                              alt={item.ten}
                            />
                          ) : (
                            <img
                              src={domain + item.attachments[0].path}
                              alt={item.ten}
                            />
                          )}
                        </span>
                        {item.ten}
                      </td>
                      <td className="science-name">{item.ten_khoa_hoc}</td>
                      <td className="kingdom">{item.kingdom.ten}</td>
                      <td className="phylumn">{item.phylumn.ten}</td>
                      <td className="class">
                        {item.class.ten == null || item.class.ten === ""
                          ? item.class.ten_khoa_hoc
                          : item.class.ten}
                      </td>
                      <td className="order">
                        {item.order.ten == null || item.order.ten === ""
                          ? item.order.ten_khoa_hoc
                          : item.order.ten}
                      </td>
                      <td className="family">
                        {item.family.ten == null || item.family.ten === ""
                          ? item.family.ten_khoa_hoc
                          : item.family.ten}
                      </td>
                      <td className="genus">
                        {item.genus.ten == null || item.genus.ten === ""
                          ? item.genus.ten_khoa_hoc
                          : item.genus.ten}
                      </td>
                      <td className="action ">
                        <div className="d-flex justify-content-around">
                          <div className="update icon-action">
                            <Popover placement="bottom" content={"Cập nhật"}>
                              <BsPencilFill
                                onClick={() => {
                                  handleUpdateClick(item);
                                }}
                              />
                            </Popover>
                          </div>

                          <div className="delete icon-action">
                            <Popover placement="bottom" content={"Xóa"}>
                              <MdDelete
                                onClick={() => {
                                  setShowModal(true);
                                  setIdDelete(item.id);
                                  setNameDelete(item.ten);
                                }}
                              />
                            </Popover>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination-species">
              <div className="pagination-info">{`${getStartIndex()}-${getEndIndex()}/${totalPage}`}</div>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPage}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
              />
              <select className="form-select h-25 " onChange={handlePepage}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Bạn có chắc chắn không?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc muốn xóa
          {<span className="name-delete">{nameDelete}</span>} ? Điều này hoàn
          toàn không thế hoàn tác!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Không
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Áp dụng
          </Button>
        </Modal.Footer>
      </Modal>
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

export default RareSpecies;
