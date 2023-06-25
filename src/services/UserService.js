// import axios from "axios";
import axios from "../services/customiz-axios";
const fetchAllSpecies = (page, perpage, search) => {
  return axios.get(
    `species?paginate=true&page=${page}&perpage=${perpage}&with=roles,createdBy&search=${search}&inactive=-1`
  );
};

const fetchAllClassify = () => {
  return axios.get(
    "phanloaihoc?ranks[]=Kingdom&ranks[]=Phylum&ranks[]=Class&ranks[]=Order&ranks[]=Family&ranks[]=Genus"
  );
};

const fetchAllConserve = () => {
  return axios.get("danhmuccha?ma_danh_mucs[]=REDBOOK&ma_danh_mucs[]=IUCN");
};

const createClassify = (config) => {
  return axios.post("species", config);
};

const deleteSpecies = (id) => {
  return axios.delete(`species/${id}`);
};

export {
  fetchAllSpecies,
  fetchAllClassify,
  createClassify,
  fetchAllConserve,
  deleteSpecies,
};
