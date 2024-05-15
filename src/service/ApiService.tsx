import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";

const loginSerCall = (loginCredentials: any) => {
  return axios
    .post(BASE_URL + "auth/login", loginCredentials)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

const saveProjectDetails = (projectDetails: any) => {
  return axios
    .post(BASE_URL + "project/save", projectDetails)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

const fetchAllCountries = () => {
  return axios
    .get(BASE_URL + "util/fetchcountries")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

const fetchAllCities = () => {
  return axios
    .get(BASE_URL + "util/fetchcity")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

const fetchAllRoles = () => {
  return axios
    .get(BASE_URL + "util/fetchrole")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

const fetchAllRoleTypes = () => {
  return axios
    .get(BASE_URL + "util/fetchroletype")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

const fetchAllRoleTiers = () => {
  return axios
    .get(BASE_URL + "util/fetchroletier")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

const getBillingHours = (lookupName) => {
  return axios
    .get(BASE_URL + "util/getbillinghours", {
      params: {
        lookupname: lookupName,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

const saveBudgetDetails = (budgetDetails) => {
  return axios
    .post(BASE_URL + "budget/save", budgetDetails)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export default {
  loginSerCall,
  saveProjectDetails,
  fetchAllCountries,
  fetchAllCities,
  fetchAllRoles,
  fetchAllRoleTypes,
  fetchAllRoleTiers,
  getBillingHours,
  saveBudgetDetails
};
